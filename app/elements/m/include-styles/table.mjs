export default function Table({ html, state }) {
  return html`
<style scope=global>

/* Base table styles */
[m-table] {

  table& {
    width: 100%;
    border-collapse: collapse;

    /* Table header */
    & thead {
      text-align: left;

      & > tr { border-top: 2px solid var(--m-color-gray-3) }

      & th {
        padding: var(--m-space-xs) var(--m-space-md);

        /* Sortable columns */
        &[aria-sort] button {
          all: unset;
          display: inline-flex;
          cursor: pointer;

          &::after { font-size: 0.8em; padding-left: var(--m-space-xs) }
        }

        &[aria-sort=ascending] button:after { content: '↑' }
        &[aria-sort=descending] button:after { content: '↓' }
      }
    }

    & th, & td { padding: var(--m-space-xs) }

    & td { vertical-align: top; padding: var(--m-space-sm) var(--m-space-md) }

    & tbody > tr {
      border-bottom: 1px solid var(--m-color-gray-3);

      &:first-of-type { border-top: 1px solid var(--m-color-gray-3) }
    }

    /* Table layout */
    &[layout=fixed] { table-layout: fixed }

    /* Striped rows */
    &[striped] > tbody tr:nth-of-type(odd) { background-color: var(--m-color-gray-2) }
  }

}
</style>


`}
