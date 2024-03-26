export default function Tag({ html }) {
  return html`
<style scope=global>
  /* Base tag styles */
  e-tag {
    display: inline-flex;
    align-items: center;
    color: var(--color, currentColor);
    border: 1px solid var(--color, currentColor);
    background-color: var(--color, lightgrey);
    padding: 3px var(--e-space-xs);
    font-size: var(--e-font-size-min);

    & + & { margin-left: 3px }

    /* Removable tag */
    & button[type=remove] {
      padding-left: var(--e-space-xs);
      font-size: var(--e-font-size-default);
      width: auto;
    }
  }
</style>
<slot></slot>
  ` }
