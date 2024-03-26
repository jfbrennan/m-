export default function Dialog({ html }) {
  return html`
<style scope=global>
  e-dialog {
    /* Base dialog styles */
    & dialog {
      border: none;
      padding: var(--e-space-lg);
      background-color: #F5F3F7;
      box-shadow: 0 16px 18px -3px #858585;

        /* Close button */
      & button[slot=close][type=remove] {
          position: absolute;
          top: 0;
          right: 0;
      }
    }
  }
</style>
<dialog><slot></slot></dialog>
`
}
