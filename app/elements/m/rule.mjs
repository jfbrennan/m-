export default function Rule({ html, state }) {
  const { attrs } = state
  const orientation = attrs?.orientation
  const isVertical = orientation === 'vertical'
  return html`
    <style>
        :host { display: block }

        /* Horizontal rule */
        hr {
          background-color: var(--m-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;
        }

          /* Vertical bar/separator, requires explicit height parent, flex or grid parent */
          hr[aria-orientation=vertical] {
            width: 1px;
            height: auto;
          }
    </style>
    <hr ${isVertical ? 'aria-orientation="vertical"' : ''} />
  `
}
