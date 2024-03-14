export default function Box({ html, state }) {
  return html`
<style>
:host {
  display: block;
  border-radius: var(--m-border-radius-md);
  padding: var(--m-space-md);
  background-color: white;
  border: 1px solid var(--m-color-border);
}


/*
  The ord attr is short for "ordinal" as in "ordinal number word".
  Ordinal number words are the 10+ words used for describing the
  precedence or importance of an item in an ordered list.
*/
:host[ord=secondary] {
  border: none;
  background-color: var(--m-color-gray-1);
  box-shadow: 0px 1px 2px var(--m-color-gray-3) inset;
}

:host > header {
  border-top-left-radius: var(--m-border-radius-md);
  border-top-right-radius: var(--m-border-radius-md);
}

:host + :host {margin-top: var(--m-space-md) }

@media only screen and (max-width: 600px) {
  :host { padding: var(--m-space-sm) }
}
</style>
<slot></slot>
`
}

