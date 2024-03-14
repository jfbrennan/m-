export default function Tabs({ html }) {
  return html`
<style>
/* Base tabs styles */
:host {
  display: flex;
  align-items: flex-start;
}

  /* Scrolling tabs */
:host[scrollable] {
  overflow-x: scroll;
  scrollbar-width: none;
}

:host[scrollable]::-webkit-scrollbar { display: none }

  /* Base tab styles */
:host > :is(a, button) {
  all: unset;
  display: inline-flex;
  color: var(--m-color-gray-7);
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  padding: var(--m-space-xs) var(--m-space-lg);
  cursor: pointer;
}

:host > :is(a, button):focus-visible { outline: 2px solid var(--m-color-focus) }

/* Hover state */
:host > :is(a, button):not([disabled]):not([aria-selected=true]):hover {
  border-bottom: 2px solid var(--m-color-gray-3);
  text-decoration: none;
}

/* Selected state */
:host > :is(a, button)[aria-selected=true] { border-bottom: 2px solid var(--m-color-primary-action) }

/* Disabled state */
:host > :is(a, button)[disabled] {
  color: var(--m-color-disabled-fg);
  cursor: default;
}
</style>
<slot></slot>
`
}
