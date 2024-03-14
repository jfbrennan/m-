export default function Keyboard({ html }) {
  return html`
<style>
:host {
  font-family: system-ui;
}

:host:not(:has(kbd)), :host kbd {
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 var(--m-color-gray-5);
  padding: 0 4px;
  background: white;
}
</style>
` }
