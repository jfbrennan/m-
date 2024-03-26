export default function InputGroup({ html, state }) {
  const { attrs } = state
  const fieldClass = attrs?.['field-class'] || ''
  return html`
<style scope=global>
 e-input-group { 
  display: block;

  & + & {
    margin-top: var(--e-space-xs);
  }

  & + :is(&, e-button, button[ord], a[role=button]) { margin-top: var(--e-space-md) }

  fieldset {
    margin: 0;
    padding: 0;
    border: none;
    position: relative;

    & + :is(&, button[ord], a[role=button]) { margin-top: var(--e-space-md) }

    & input:not([type=radio]):not([type=checkbox]),
    & :is(label, select) {
      display: block;
    }

    & input + label { display: inline }

    & :is(label, legend) { font-weight: 500 }

    & :is(input[type=radio], input[type=checkbox]) + label {
      font-weight: normal;
    }

    & :is(input, textarea) { box-sizing: border-box }

    & input:not([type=radio], [type=checkbox], [type=range]),
    & :is(select, textarea) {
      width: 100%;
      min-height: var(--e-input-min-height);
      font-size: 16px;
      padding: 6px;
      border-radius: 0px;
      background-color: white;
      color: var(--e-color-gray-8);
    }

    & :is(input:not([is=switch]), select, textarea) {
      border: 1px solid var(--e-color-gray-3);
    }

    & select:not([multiple]) {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' height='10px' width='22px'%3E%3Ctext x='0' y='10' fill='gray'%3E%E2%96%BE%3C/text%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right center;
      padding-right: var(--e-space-lg);
    }

    & textarea {
      resize: vertical;
      font-family: inherit;
    }

    & input[type=range] {
      appearance: none;
      outline: 0;
      width: 100%;
      margin: var(--e-space-sm) 0;
      height: var(--e-space-xs);
      background-color: var(--e-color-gray-3);
      border-radius: var(--e-border-radius-full);

      &::-webkit-slider-thumb {
         appearance: none;
         width: var(--e-space-md);
         height: var(--e-space-md);
         border: 1px solid var(--e-color-gray-4);
         background-color: white;
         border-radius: var(--e-border-radius-full);

        &:focus-visible {
           outline: 2px solid var(--e-color-focus);
        }
      }

      /*&[orient=vertical] {*/
      /*  transform: rotate(-90deg);*/
      /*  position: absolute;*/
      /*  top: 48%;*/
      /*  left: -78%;*/
      /*  margin: 0;*/
      /*}*/
    }

    & :is(label, input, select, textarea, small) {
      & + & {
        margin-top: var(--e-space-xs);
      }
    }

    & input:not([type=range]):not([is=switch]),
    & :is(select, textarea) {
      &:focus {
        outline: 2px solid var(--e-color-focus);
        outline-offset: 0;
        border: 1px solid var(--e-color-primary-action);
      }
    }

    & :is(input, select, textarea) {
      &:invalid,
      &[invalid] {
        border-color: var(--e-color-red-3);

        & ~ small {
          color: var(--e-color-red-3);
        }
      }

      & ~ small {
        color: var(--e-color-gray-6);
      }
    }

  }
}

</style>
<fieldset ${fieldClass ? `class="${fieldClass}" ` : ''}>
  <slot></slot>
</fieldset>
`
}
