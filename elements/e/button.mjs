export default function Button({ html, state }) {
  const { attrs } = state
  const topLevelAttrs = ['class']
  const innerAttrs = Object.entries(attrs).filter(([key, value]) => !topLevelAttrs.includes(key))
  const innerAttrsString = innerAttrs.map(([key, value]) => `${key}="${value}"`).join(" ") || ''
  return html`
    <style scope=global>
    e-button {
      display: inline-block;
      &+& {
        margin-left: var(--e-space-sm);
        margin-top: var(--e-space-sm);
      }

      :is(button, a[role=button]) {
        /*
          Ordinal attribute
          The ord attr is short for "ordinal number word".
          Ordinal number words are the 10+ words used for describing the
          precedence or importance of an item in a group, e.g. Save and Cancel buttons.
        */
        &[ord] {
          display: inline-flex;
          place-content: center;
          border-radius: var(--e-border-radius-md);
          cursor: pointer;
          background: none;
          font-size: var(--e-font-size-default);
          height: var(--e-input-min-height);
          padding: var(--e-space-xs) var(--e-space-md);

          /* Sibling buttons */
          + & { margin-left: var(--e-space-sm) }

          /* Disabled */
          &[disabled] {
            cursor: not-allowed;
            border: 2px solid var(--e-color-disabled-bg);
            color: var(--e-color-disabled-fg);
            background-color: var(--e-color-disabled-bg);
          }
        }

        /* Primary ordinal */
        &[ord=primary] {
          border: 2px solid var(--e-color-primary-action);
          background-color: var(--e-color-primary-action);
          color: white;
        }

        /* Secondary ordinal */
        &[ord=secondary] {
          border: 2px solid var(--e-color-primary-action);
          color: var(--e-color-primary-action);

          &[aria-pressed="true"], &[aria-pressed="mixed"] {
            background-color: var(--e-color-blue-1);
          }
        }

        /* Tertiary ordinal */
        &[ord=tertiary] {
          border: 2px solid var(--e-color-gray-7);
          color: var(--e-color-gray-7);
        }
      }

      /* Focus for all buttons */
      :is(button, a[role=button])[ord]:focus-visible, button[type=remove]:focus-visible {
        outline: 2px solid var(--e-color-focus);
        outline-offset: 0;
      }

      /* Link button overrides */
      a[role=button][ord] {
        box-sizing: border-box;

        &:hover { text-decoration: none }
      }

      /* Remove button (for close, dismiss, delete use cases) */
      button[type=remove] {
        all: unset;
        display: inline-flex;
        place-content: center;
        cursor: pointer;
        width: var(--e-input-min-height);
        font-size: 24px;

        &:active { color: initial }
        &::before { content: '×' }

        /* Disabled */
        &[disabled] {
          color: var(--e-color-disabled-fg);
          cursor: not-allowed;
        }
      }

      /* Button Group */
      [role=group]:has(:is(button, a[role=button])) {
        display: inline-flex;

        & button, & a[role=button] {
          border-radius: 0;
          border-right-width: 1px;
          border-left-width: 1px;

          &:first-of-type {
            border-radius: var(--e-border-radius-md) 0 0 var(--e-border-radius-md);
            border-left-width: 2px;
          }

          &:last-of-type {
            border-radius: 0 var(--e-border-radius-md) var(--e-border-radius-md) 0;
            border-right-width: 2px;
          }

          & + & {
            margin: 0;
          }
        }
      }

      /* Scale */
      /*:is(button, a[role=button])[scale=sm] {*/
      /*  min-height: var(--e-target-min-size);*/
      /*  font-size: var(--e-font-size-min);*/
      /*}*/

      /*:is(button, a[role=button])[scale=lg] {*/
      /*  min-height: 44px;*/
      /*  font-size: var(--e-font-size-md);*/
      /*}*/

      /*button[type=remove][scale=sm] {*/
      /*  width: var(--e-target-min-size);*/
      /*  height: var(--e-target-min-size);*/
      /*  font-size: 14px;*/
      /*}*/

      /*button[type=remove][scale=lg] {*/
      /*  width: 44px;*/
      /*  height: 44px;*/
      /*  font-size: 36px;*/
      /*}*/


    }
    </style>
    <button ${innerAttrsString}>
      <slot></slot>
    </button>
  `
}
