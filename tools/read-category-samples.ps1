Add-Type -AssemblyName System.IO.Compression.FileSystem
$sourcePath = Join-Path (Get-Location) 'product-list\category_samples.xlsx'
$archive = [System.IO.Compression.ZipFile]::OpenRead($sourcePath)
function Read-ZipText([string]$entryPath) {
  $entry = $archive.GetEntry($entryPath)
  if ($null -eq $entry) { return '' }
  $reader = New-Object System.IO.StreamReader($entry.Open())
  try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}
try {
  [xml]$sharedXml = Read-ZipText 'xl/sharedStrings.xml'
  $shared = @($sharedXml.SelectNodes('//*[local-name()="si"]') | ForEach-Object {
    (@($_.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.InnerText })) -join ''
  })
  [xml]$workbook = Read-ZipText 'xl/workbook.xml'
  [xml]$rels = Read-ZipText 'xl/_rels/workbook.xml.rels'
  $sheets = @()
  foreach ($sheet in $workbook.SelectNodes('//*[local-name()="sheet"]')) {
    $relId = $sheet.GetAttribute('id','http://schemas.openxmlformats.org/officeDocument/2006/relationships')
    $rel = $rels.SelectNodes('//*[local-name()="Relationship"]') | Where-Object { $_.Id -eq $relId } | Select-Object -First 1
    $target = $rel.Target
    if ($target.StartsWith('/')) { $target = $target.TrimStart('/') } else { $target = 'xl/' + $target }
    [xml]$sheetXml = Read-ZipText $target
    $rows = @()
    foreach ($row in $sheetXml.SelectNodes('//*[local-name()="sheetData"]/*[local-name()="row"]')) {
      $values = @{}
      foreach ($cell in $row.SelectNodes('./*[local-name()="c"]')) {
        $col = $cell.r -replace '\d',''
        $v = $cell.SelectSingleNode('./*[local-name()="v"]')
        if ($cell.t -eq 's' -and $null -ne $v) { $value = $shared[[int]$v.InnerText] }
        elseif ($cell.t -eq 'inlineStr') { $value = (@($cell.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.InnerText })) -join '' }
        elseif ($null -ne $v) { $value = $v.InnerText }
        else { $value = '' }
        $values[$col] = $value
      }
      $rows += @{ row = [int]$row.r; cells = $values }
    }
    $sheets += @{ name = $sheet.name; rows = $rows }
  }
  $json = ConvertTo-Json -InputObject $sheets -Depth 12
  [System.IO.File]::WriteAllText((Join-Path (Get-Location) 'tools\category-samples-raw.json'),$json,(New-Object System.Text.UTF8Encoding($false)))
  $sheets | ForEach-Object { Write-Output ($_.name + ': ' + $_.rows.Count + ' rows'); $_.rows | Select-Object -First 2 | ConvertTo-Json -Depth 8 }
} finally { $archive.Dispose() }
