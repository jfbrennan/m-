customElements.define('m-tabs', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get <m-tab> children and select one
    this.tabs = Array.from(this.querySelectorAll('m-tab'));
    const tab = this.tabs.find(tab => tab.hasAttribute('selected'));
    const index = tab ? this.tabs.indexOf(tab) : 0;
    this.select(index);

    // When <m-tabs> is clicked the correct <m-tab> will be found and selected
    this.addEventListener('click', e => {
      if (e.target.href) e.preventDefault(); // App is responsible to redirect/route with `href` in event detail
      const tab = e.composedPath().find(el => el.tagName === 'M-TAB');
      this.select(this.tabs.indexOf(tab), e.target.href);
    });

    // a11y
    this.setAttribute('role', 'tablist');
    this.tabs.forEach(tab => tab.setAttribute('role', 'tab'));
  }

  select(index, href) {
    const tab = this.tabs[index];
    if (!tab.hasAttribute('disabled')) {
      // Unselect current tab
      this.tabs.forEach(tab => {
        tab.removeAttribute('selected');
        tab.setAttribute('aria-selected', 'false');
      });

      // Select new tab and fire event
      tab.setAttribute('selected', 'selected');
      tab.setAttribute('aria-selected', 'true');
      this.dispatchEvent(new CustomEvent('select', {detail: {index, id: tab.id, href}}));
    }
  }

});