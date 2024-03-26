export default function Blockquote({ html, state }) {
  return html`
<style>
  blockquote {
    color: var(--e-color-gray-6);
    font-style: italic;
  }
</style>
<blockquote><slot></slot></blockquote>
`
}
