$ErrorActionPreference = 'Stop'
$worklogText = Get-Content -Raw -LiteralPath (Join-Path $PSScriptRoot '../WORKLOG.md')
if ($worklogText -notmatch 'WORK_THEME_ID: (\d+)') { throw 'WORK_THEME_ID missing from WORKLOG.md' }
$workThemeId = $Matches[1]
if ($workThemeId -ne '189582049393' -or $workThemeId -eq '189489545329') { throw 'Unexpected or live theme ID' }
$themeListText = shopify theme list --store 3djevx-mu.myshopify.com --json --no-input | Out-String
if ($LASTEXITCODE -ne 0) { throw 'Cannot verify current theme roles' }
$themeList = $themeListText | ConvertFrom-Json
$themeRows = if ($themeList.themes) { $themeList.themes } else { $themeList }
$targetTheme = $themeRows | Where-Object { [string]$_.id -eq $workThemeId }
if (-not $targetTheme -or $targetTheme.role -ne 'unpublished') { throw 'Working theme is not verified unpublished' }
Write-Output "Verified WORK_THEME_ID $workThemeId is unpublished; live ID 189489545329 is excluded."
shopify theme push --store 3djevx-mu.myshopify.com --theme $workThemeId --nodelete --json --no-input
if ($LASTEXITCODE -ne 0) { throw 'Theme push failed' }
