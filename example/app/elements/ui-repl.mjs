export default function demo({ html, state }) {
  const { exampleCode } = state.store
  return html`

<style scope=global>
  ui-repl {
    display:block;
  }
</style>
  <e-row >
    <e-col span="6" class="editor">
      <e-input-group >
        <textarea style="height:50vh" class="codeInput" placeholder="Enter HTML here...">${exampleCode ? exampleCode : ''}</textarea>
      </e-input-group>
    </e-col>
    <e-col span="6">
      <e-box style="height:50vh" class="preview">${exampleCode ? exampleCode : ''}</e-box>
    </e-col>
  </e-row>


<script type=module>
  class UiRepl extends HTMLElement{
    constructor(){
      super()
    }
    connectedCallback(){
      this.codeInput = this.querySelector('.codeInput')
      this.preview = this.querySelector('.preview')
      this.preview.innerHTML = this.codeInput.value;
      this.codeInput.addEventListener('input', () => {
          clearTimeout(this.timeoutId);
          this.timeoutId = setTimeout(() => {
              this.preview.innerHTML = this.codeInput.value;
          }, 300);
      });
    }
    disconnectedCallback(){
      this.codeInput.removeEventListener('input')
    }
  }
  if (!customElements.get('ui-repl')) { customElements.define('ui-repl', UiRepl )}
</script>

`}
