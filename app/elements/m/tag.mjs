export default function Tag({ html }) {
  return html`
<style>

/* Base tag styles */
:host {
  display: inline-flex;
  align-items: center;
  color: var(--color, currentColor);
  border: 1px solid var(--color, currentColor);
  background-color: var(--color, lightgrey);
  padding: 3px var(--m-space-xs);
  font-size: var(--m-font-size-min);
}

:host + :host { margin-left: 3px }

/* Removable tag */
:host button[type=remove] {
  padding-left: var(--m-space-xs);
  font-size: var(--m-font-size-default);
  width: auto;
}
</style>
<slot></slot>
  ` }
