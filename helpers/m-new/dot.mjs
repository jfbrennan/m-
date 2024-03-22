export default function Dot({ html, state }) {
  return html`
<style>
/* Base styles */
:host {
  display: inline-flex;
  align-items: center;
}

:host::before {
    content: '';
    width: 8px;
    height: 8px;
    margin: var(--m-space-xs);
    border-radius: var(--m-border-radius-full);
    background-color: var(--m-color-gray-4);
}

  /* Alert type */
:host[type=info]::before    { background-color: var(--m-color-blue-2) }
:host[type=success]::before { background-color: var(--m-color-green-2) }
:host[type=warn]::before    { background-color: var(--m-color-orange-2) }
:host[type=error]::before   { background-color: var(--m-color-red-2) }
}
</style>
<slot></slot>
`
}

