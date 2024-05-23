export default function Seperator({ html, state }) {
  const verticalAttr = state.attrs.vertical;
  const isVertical = verticalAttr === '' || (verticalAttr && verticalAttr !== 'false')
  return html`
    <style scope=global>

      e-seperator { 
        display: block; 

        &[vertical] {
          display:flex;
          height:  auto;
        }

        hr {
          background-color: var(--e-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;
        }

        hr[aria-orientation=vertical] {
            width: 1px;
            height: auto;
        }
      }
    </style>
    <hr ${isVertical ? 'aria-orientation="vertical"' : ''} />
  `
}
