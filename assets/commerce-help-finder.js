if (!customElements.get('commerce-help-finder')) {
  customElements.define('commerce-help-finder', class extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const options = { signal: this.controller.signal };
      this.input = this.querySelector('[data-help-input]');
      if (!this.input) return;
      this.originalStates = new Map();
      this.input.addEventListener('input', () => this.filter(), options);
      this.querySelector('[data-help-reset]').addEventListener('click', () => {
        this.input.value = '';
        this.filter();
        this.input.focus();
      }, options);
      this.input.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        this.input.value = '';
        this.filter();
      }, options);
      document.addEventListener('shopify:section:load', () => this.filter(), options);
      document.addEventListener('shopify:section:unload', () => this.filter(), options);
      this.hidden = false;
      this.filter();
    }

    filter() {
      const main = this.closest('main');
      if (!main) return;
      const terms = this.input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      let total = 0;
      let shown = 0;
      for (const group of main.querySelectorAll('[data-help-group]')) {
        let groupCount = 0;
        for (const question of group.querySelectorAll('[data-help-question]')) {
          total++;
          const text = question.textContent.toLocaleLowerCase();
          const matches = terms.every((term) => text.includes(term));
          if (terms.length && !this.originalStates.has(question)) this.originalStates.set(question, question.open);
          question.hidden = !matches;
          if (terms.length) question.open = matches;
          else if (this.originalStates.has(question)) {
            question.open = this.originalStates.get(question);
            this.originalStates.delete(question);
          }
          if (matches) { shown++; groupCount++; }
        }
        group.hidden = groupCount === 0;
      }
      const status = this.querySelector('[data-help-status]');
      status.textContent = status.dataset.label.replace('[count]', shown).replace('[total]', total);
      this.querySelector('[data-help-empty]').hidden = shown > 0;
    }

    disconnectedCallback() {
      this.controller?.abort();
      const main = document.querySelector('main');
      if (!main) return;
      for (const element of main.querySelectorAll('[data-help-group], [data-help-question]')) element.hidden = false;
      for (const [question, open] of this.originalStates || []) question.open = open;
    }
  });
}
