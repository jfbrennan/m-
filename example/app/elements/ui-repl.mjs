export default function demo({ html, state }) {
  const { demo, current = "accordion" } = state.store
  return html`

<style scope=global>
  ui-repl {
    display:block;

    e-input-group, e-box {
      height:50vh;
    }

    textarea {
      height:50vh;
    }
    
    iframe {
      display: block; 
      width: 100%; 
      height: 100%; 
      border: none;
    }

    e-box {
    }
    .editor {
      height: 50vh;
      padding:0px;
    }
  }
</style>
<e-row >
  <e-col span="6" >
    <e-box class="editor">
      <form action="/docs/_components/${current}" target="previewIframe" method="get">
        <e-input-group >
          <textarea name=markup class="codeInput" placeholder="Enter HTML here...">${demo ? demo : ''}</textarea>
          <div hidden class=editor></div>
        </e-input-group>
        <e-button><button type=submit>Update</button></e-button>
      </form>
    </e-box>
  </e-col>
  <e-col span="6">
    <e-box class="preview">
      <iframe
        name="previewIframe"
        title="Preview"
        src="/docs/_components/${current}">
      </iframe>
    </e-box>
  </e-col>
</e-row>

<script type=module>
  import { EditorView, basicSetup, html, EditorState } from '/_public/browser/editor.mjs'
  class UiRepl extends HTMLElement{
    constructor(){
      super()
    }
    connectedCallback(){
      this.codeInput = this.querySelector('.codeInput')
      this.form = this.querySelector('form')
      this.editor = this.querySelector('.editor')


      this.codeInput.addEventListener('input', () => {
          clearTimeout(this.timeoutId);
          this.timeoutId = setTimeout(() => {
             console.log("should submit")
            this.form.submit()
          }, 500);
      });

      try {

      let codeMirror= new EditorView({
        state: EditorState.create({
            doc: this.codeInput.value || '',
            extensions: [basicSetup, html()]
        }),
        parent: this.editor
      })
      
        const debounce = (func, wait) => {
            let timeout;
            return function(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
      let editor = new EditorView({
        });

        const updateTextarea = () => {
            this.codeInput.value = codeMirror.state.doc.toString();
            this.form.submit()
        }

        const debouncedUpdate = debounce(updateTextarea, 500);


        codeMirror.dispatch = ((originalDispatch) => {
            return (transaction) => {
                originalDispatch(transaction);
                if (transaction.docChanged) {
                    debouncedUpdate();
                }
            };
        })(codeMirror.dispatch);

      this.form.style.display = "none"

      } catch(error){
        console.error("Editor failed to load")
      }



    }
    disconnectedCallback(){
      this.codeInput.removeEventListener('input')
    }
  }
  if (!customElements.get('ui-repl')) { customElements.define('ui-repl', UiRepl )}
</script>

`}
