export default function Container({ html, state }) {
  return html`
<style scope=global>
/* Base container styles */
e-container {
  display: block;
  max-width: var(--e-max-content-width);
  margin: auto;
  padding: var(--e-space-md) var(--e-space-lg);

  /* Sizes */
  &[maxwidth=md] { max-width: 924px } /* Plus its margin = 960 which is a very comfortable and common size */
  &[maxwidth=sm] { max-width: 375px }
  &[maxwidth=none] { max-width: none }
}

@media only screen and (max-width: 600px) {
  e-container { padding: var(--e-space-sm) }
}
</style>
<slot></slot>
`
}
