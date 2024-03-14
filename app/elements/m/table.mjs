export default function Table({ html }) {
  const { attrs } = state
  const mAttrs = Object.entries(attrs).filter(([key, value]) => key.startsWith("m-"))
  const mAttrsSting = mAttrs.map(([key, value]) => `${key.replace(/^m-/, '')}="${value}"`).join(" ") || ''
  return html`
<style>
/* Base table styles */
table {
  width: 100%;
  border-collapse: collapse;
}

/* Table header */
table thead { text-align: left; }

table thead > tr { border-top: 2px solid var(--m-color-gray-3) }

table thead th {
  padding: var(--m-space-xs) var(--m-space-md);
}

/* Sortable columns */
table thead th[aria-sort] button {
  all: unset;
  display: inline-flex;
  cursor: pointer;
}

table thead th[aria-sort] button::after { font-size: 0.8em; padding-left: var(--m-space-xs) }

table thead th[aria-sort=ascending] button:after { content: '↑' }
table thead th[aria-sort=descending] button:after { content: '↓' }

table th, table td { padding: var(--m-space-xs) }

table td { vertical-align: top; padding: var(--m-space-sm) var(--m-space-md) }

table tbody > tr {
  border-bottom: 1px solid var(--m-color-gray-3);
}

table tbody > tr:first-of-type { border-top: 1px solid var(--m-color-gray-3) }

  /* Table layout */
table[layout=fixed] { table-layout: fixed }

  /* Striped rows */
table[striped] > tbody tr:nth-of-type(odd) { background-color: var(--m-color-gray-2) }


</style>
<table ${mAttrsString} ><slot></slot></table>
`}

