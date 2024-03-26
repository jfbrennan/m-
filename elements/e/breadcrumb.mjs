export default function({ html }) {
  return html`
<style scope=global>
e-breadcrumb, e-breadcrumb > nav {
  display: flex;
}

e-breadcrumb > nav > :is(a, e-crumb, span):not(:first-child)::before {
  content: '/';
  display: inline-block; /* Needed to prevent this element from getting underlined */
  margin: 0 var(--e-space-sm);
  color: var(--e-color-gray-4);
}
</style>
`
}
