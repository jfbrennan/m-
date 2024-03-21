export default function InputGroup({ html, state }) {
  const { attrs } = state
  const fieldClass = attrs?.['field-class'] || ''
  return html`
<style scope=global>
 m-input-group { 
  display: block;

  & + & {
    margin-top: var(--m-space-xs);
  }

  & + :is(&, m-button, button[ord], a[role=button]) { margin-top: var(--m-space-md) }

  fieldset {
    margin: 0;
    padding: 0;
    border: none;
    position: relative;

    & + :is(&, button[ord], a[role=button]) { margin-top: var(--m-space-md) }

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
      min-height: var(--m-input-min-height);
      font-size: 16px;
      padding: 6px;
      border-radius: 0px;
      background-color: white;
      color: var(--m-color-gray-8);
    }

    & :is(input:not([is=switch]), select, textarea) {
      border: 1px solid var(--m-color-gray-3);
    }

    & select:not([multiple]) {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' height='10px' width='22px'%3E%3Ctext x='0' y='10' fill='gray'%3E%E2%96%BE%3C/text%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right center;
      padding-right: var(--m-space-lg);
    }

    & textarea {
      resize: vertical;
      font-family: inherit;
    }

    & input[type=range] {
      appearance: none;
      outline: 0;
      width: 100%;
      margin: var(--m-space-sm) 0;
      height: var(--m-space-xs);
      background-color: var(--m-color-gray-3);
      border-radius: var(--m-border-radius-full);

      &::-webkit-slider-thumb {
         appearance: none;
         width: var(--m-space-md);
         height: var(--m-space-md);
         border: 1px solid var(--m-color-gray-4);
         background-color: white;
         border-radius: var(--m-border-radius-full);

        &:focus-visible {
           outline: 2px solid var(--m-color-focus);
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
        margin-top: var(--m-space-xs);
      }
    }

    & input:not([type=range]):not([is=switch]),
    & :is(select, textarea) {
      &:focus {
        outline: 2px solid var(--m-color-focus);
        outline-offset: 0;
        border: 1px solid var(--m-color-primary-action);
      }
    }

    & :is(input, select, textarea) {
      &:invalid,
      &[invalid] {
        border-color: var(--m-color-red-3);

        & ~ small {
          color: var(--m-color-red-3);
        }
      }

      & ~ small {
        color: var(--m-color-gray-6);
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
