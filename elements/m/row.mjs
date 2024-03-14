export default function Row({ html }) {
  return html`
<style>
/* Inspired by Flexbox Grid https://github.com/kristoferjoseph/flexboxgrid */
:host {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--m-space-md);
}

:host + :host {
  margin-top: var(--m-space-md);
}

  /* Centers columns inside the row */
:host[center] {
  justify-content: center;
}

:host[center] m-col:not([span]) {
  flex-grow: inherit;
  flex-basis: inherit;
}

</style>
<slot></slot>

`
}
