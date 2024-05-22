export default function Code({ html, state }) {
  const { attrs } = state;
  const isInline = attrs.format === "inline";
  return html`
    <style scope="global">
      /* Base code styles */
      e-code {
        code,
        pre {
          border-radius: var(--e-border-radius-md);
          background-color: var(--e-color-gray-1);
          color: var(--e-color-red-3);
        }

        /* Inline code */
        code {
          padding: 1px 3px;
        }

        /* Multi-line code */
        pre {
          margin: 0;
          padding: var(--e-space-xs) var(--e-space-sm);
        }
      }
    </style>
    ${isInline && "<code><slot></slot></code>"}
    ${!isInline && "<pre><slot></slot></pre>"}

  `;
}
