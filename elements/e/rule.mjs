export default function Rule({ html, state }) {
  const verticalAttr = state.attrs.vertical;
  const isVertical = verticalAttr === '' || (verticalAttr && verticalAttr !== 'false')
  return html`
    <style scope=global>
      e-rule { 
        display: block 

        hr {
          background-color: var(--e-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;

          &[aria-orientation=vertical] {
            width: 1px;
            height: auto;
          }
        }
      }
    </style>
    <hr ${isVertical ? 'aria-orientation="vertical"' : ''} />






    <script type=module>
      // allows clientside render
      import CustomElement from 'https://unpkg.com/@enhance/custom-element@1.2.3/dist/index.js?module=true'
      class Rule extends CustomElement {
        
        static get observedAttributes() {
         return [ 'vertical' ]
        }

        verticalChanged(value) {
          this.hr = this.querySelector('hr')
          console.log('value: ', value)
          if (value === '' || (value && value !== 'false')) {
            this.hr.setAttribute('aria-orientation', 'vertical')
          } else {
            this.hr.removeAttribute('aria-orientation')
          }
        }

        render({ html, state }) {
          const verticalAttr = state.attrs.vertical;
          const isVertical = verticalAttr === '' || (verticalAttr && verticalAttr !== 'false')
          return html\`
            <style scope=global>
              e-rule { 
                display: block 

                hr {
                  background-color: var(--e-color-gray-3);
                  border: none;
                  margin: 0;
                  height: 1px;

                  &[aria-orientation=vertical] {
                    width: 1px;
                    height: auto;
                  }
                }
              }
            </style>
            <hr ${isVertical ? 'aria-orientation="vertical"' : ''} />
          \`
        }
      }
      if (!customElements.get('e-rule')) { customElements.define('e-rule', Rule) }
    </script>
  `
}
