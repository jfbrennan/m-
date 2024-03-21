export default function Link({ html, state }) {
  const { attrs } = state
  const isAnchor = attrs.hasOwnProperty('href')
  const topLevelAttrs = ['class']
  const innerAttrs = Object.entries(attrs).filter(([key, value]) => !topLevelAttrs.includes(key))
  const innerAttrsString = innerAttrs.map(([key, value]) => `${key}="${value}"`).join(" ") || ''
  return html`
    <style>
      /* Base link styles */
      a, span[role=link] {
        text-decoration: none;
        color: var(--m-color-primary-action);
        cursor: pointer;
        }

        /*:is(a, span[role=link]):visited { color: var(--m-color-primary-action) }*/
      a:hover, span[role=link]:hover, a:focus-visible, span[role=link]:focus-visible {
          text-decoration: underline;
          outline: 0;
        }

        /* Disabled state */
      a[disabled], span[role=link][disabled] {
          color: var(--m-color-disabled-fg);
          pointer-events: none;
        }
    </style>
    ${isAnchor ? `<a ${innerAttrsString} ><slot></slot></a>` : `<span role=link ${innerAttrsString}><slot></slot></span>`}

`
}
