export default function Loader({ html }) {
  return html`
<style scope=global>
  e-loader {
    display: inline-flex;

    &::before {
      font-family: 'e-icons';
      content: 'autorenew';
      -webkit-font-smoothing: antialiased;
    }

    &[loading]:before { animation: 1.2s linear infinite e-loader }
  }

  @keyframes e-loader {
      0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
</style>
<slot></slot>
`}

