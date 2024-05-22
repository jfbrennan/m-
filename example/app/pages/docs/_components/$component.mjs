export default function Components({ html, state }) {
  const { demo } = state.store
  return html`${demo}`
}
