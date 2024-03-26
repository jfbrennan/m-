export default function Table({ html }) {
  return html`
    <style scope=global>
      e-table {

        /* Base table styles */
        table {
          width: 100%;
          border-collapse: collapse;

          /* Table header */
          & thead {
            text-align: left;

            & > tr { border-top: 2px solid var(--e-color-gray-3) }

            & th {
              padding: var(--e-space-xs) var(--e-space-md);

              /* Sortable columns */
              &[aria-sort] button {
                all: unset;
                display: inline-flex;
                cursor: pointer;

                &::after { font-size: 0.8em; padding-left: var(--e-space-xs) }
              }

              &[aria-sort=ascending] button:after { content: '↑' }
              &[aria-sort=descending] button:after { content: '↓' }
            }
          }

          & th, & td { padding: var(--e-space-xs) }

          & td { vertical-align: top; padding: var(--e-space-sm) var(--e-space-md) }

          & tbody > tr {
            border-bottom: 1px solid var(--e-color-gray-3);

            &:first-of-type { border-top: 1px solid var(--e-color-gray-3) }
          }

          /* Table layout */
          &[layout=fixed] { table-layout: fixed }

          /* Striped rows */
          &[striped] > tbody tr:nth-of-type(odd) { background-color: var(--e-color-gray-2) }
        }
      }
    </style>
    <slot></slot>
  `
}
