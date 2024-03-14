export default function Badge({ html }) {
  return html`

<style>
/* Base styles */
:host {
  display: none;
  min-width: 1.25rem;
  height: 1.25rem;
  place-content: center;
  color: white;
  background-color: var(--m-color-primary-action);
  border-radius: 0.625rem;
  font-weight: 600;
  line-height: 1.25rem;
}

/* Padding for text only */
:host:not([count]) { padding: 0 var(--m-space-xs) }

/* Count */
:host[count]:before {
  content: attr(count);
  padding: 0 var(--m-space-xs);
}

  /* Show the badge only when it has a non-zero count or is not empty */
:host:not(:empty),
:host[count]:not([count=""]):not([count="0"]) {
  display: inline-flex;
}
</style>
<slot></slot>
  ` }
