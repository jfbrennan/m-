export default function Container({ html, state }) {
  return html`
<style>
/* Base container styles */
:host {
  display: block;
  max-width: var(--m-max-content-width);
  margin: auto;
  padding: var(--m-space-md) var(--m-space-lg);
}

/* Sizes */
:host[maxwidth=md] { max-width: 924px } /* Plus its margin = 960 which is a very comfortable and common size */
:host[maxwidth=sm] { max-width: 375px }
:host[maxwidth=none] { max-width: none }

@media only screen and (max-width: 600px) {
  :host { padding: var(--m-space-sm) }
}
</style>
<slot></slot>
`
}

