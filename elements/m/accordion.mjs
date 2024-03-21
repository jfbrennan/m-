export default function Accordion({ html, state }) {
  return html`
<style>
:host {
  display: block;
}

:host > details {
  border-top: 3px solid var(--m-color-gray-2);
}

:host > details:last-child { border-bottom: 3px solid var(--m-color-gray-2) }

:host > details[open] > summary:after {
  transform: rotate(180deg);
  transition: transform 250ms;
}

:host > details > summary {
  padding: var(--m-space-sm) var(--m-space-xl) var(--m-space-sm) 0;
  position: relative;
}
:host > details > summary:focus-visible { outline: 2px solid var(--m-color-focus) }

:host > details > summary:after {
  font-family: 'm-icons';
  content: 'expand_more';
  position: absolute;
  top: var(--m-space-sm);
  right: var(--m-space-sm);
  transform: rotate(0deg);
  transition: transform 250ms;
}
</style>
<slot></slot>
`}
