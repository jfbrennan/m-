customElements.define('m-tabs', class extends HTMLElement {
  constructor() {
    super();
    // Get the <m-tab> children and select one
    this.tabs = Array.from(this.querySelectorAll('m-tab'));
    const tab = this.tabs.find(tab => tab.hasAttribute('selected'));
    const index = tab ? this.tabs.indexOf(tab) : 0;
    this.select(index);

    // When <m-tabs> is clicked the correct <m-tab> will be found and selected
    this.addEventListener('click', e => {
      if (e.target.href) e.preventDefault(); // App is supposed to redirect/route with the href in the event detail
      const tab = e.path.find(el => el.tagName === 'M-TAB');
      this.select(this.tabs.indexOf(tab), e.target.href);
    });

    // a11y
    this.setAttribute('role', 'tablist');
    this.tabs.forEach(tab => tab.setAttribute('role', 'tab'));
  }

  select(index, href) {
    // Unselect current tab
    this.tabs.forEach(tab => {
      tab.removeAttribute('selected');
      tab.removeAttribute('aria-selected');
    });
    // Select new tab
    const tab = this.tabs[index];
    tab.setAttribute('selected', 'selected');
    tab.setAttribute('aria-selected', 'true');
    this.dispatchEvent(new CustomEvent('m-select', {detail: {index, id: tab.id, href}}));
  }
});