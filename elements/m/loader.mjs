export default function Loader({ html }) {
  return html`
<style>
  :host {
    display: inline-flex;
  }

  :host::before {
    font-family: 'm-icons';
    content: 'autorenew';
    -webkit-font-smoothing: antialiased;
  }

  :host[loading]:before { animation: 1.2s linear infinite m-loader }

  @keyframes :host {
    0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
  }
</style>
`}
