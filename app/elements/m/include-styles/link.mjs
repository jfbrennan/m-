export default function IsDashM({ html, state }) {
  return html`
    <style scope=global>
      [m-link] {
        /* Base link styles */
        a&, span[role=link]& {
          text-decoration: none;
          color: var(--m-color-primary-action);
          cursor: pointer;

          /*:is(a, span[role=link]):visited { color: var(--m-color-primary-action) }*/
          &:hover,
          &:focus-visible {
            text-decoration: underline;
            outline: 0;
          }

          /* Disabled state */
          &[disabled] {
            color: var(--m-color-disabled-fg);
            pointer-events: none;
          }
        }
      }
    </style>
  `
}
