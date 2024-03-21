export default function Switch({ html, state }) {
  const { attrs } = state
  const topLevelAttrs = ['is', 'checkbox'] //added to input by default
  const innerAttrs = Object.entries(attrs).filter(([key, value]) => !topLevelAttrs.includes(key))
  const innerAttrsString = innerAttrs.map(([key, value]) => `${key}="${value}"`).join(" ") || ''
  return html`
  <style>
    /* Base switch styles */
    input[is=switch] {
      position: relative;
      width: 40px;
      height: 22px;
      appearance: none;
      margin: 0;
      border-radius: var(--m-border-radius-full);
      cursor: pointer;
      background-color: var(--m-color-gray-3);
      transition: background-color ease-in 0.12s;
    }

      input[is=switch]::before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 3px;
        left: 3px;
        border-radius: var(--m-border-radius-full);
        background-color: white;
        transition: all ease-in 0.12s;
      }

      input[is=switch]:focus-visible {
        outline: 2px solid var(--m-color-focus);
        outline-offset: 0;
      }

      /* Checked state */
      input[is=switch]:checked { background-color: var(--m-color-primary-action) }
      input[is=switch]:checked:before { left: 20px }

      /* Disabled state */
      input[is=switch]:disabled {
        cursor: not-allowed;
        background-color: var(--m-color-disabled-bg);
      }
    </style>
  <input is=switch type=checkbox ${innerAttrsString}>

  `
}