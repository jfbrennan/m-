export default function({ html }) {
  return html`
<style>
  :host, :host > nav {
  display: flex;
}

:host > nav > :is(a, m-crumb, span):not(:first-child)::before {
  content: '/';
  display: inline-block; /* Needed to prevent this element from getting underlined */
  margin: 0 var(--m-space-sm);
  color: var(--m-color-gray-4);
}
</style>
`
}
