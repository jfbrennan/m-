export default function DemoComponent({ html, state }) {
  const components = state.store.components || []
  const current = state.store.current
  return html`
<style scope=global>
  demo-components {
    display:block;
  }
</style>
<e-container >
  <e-seperator></e-seperator>
  <e-row >
    <e-col span="2">
      <e-list type=none>
        ${components.map(item => item.path !== current ? `<li><e-link><a href="/docs/${item.path || ""}" >${item.name || ""}</a></e-link></li>` : `<li>${item.name || ""}</li>`).join('\n')}
      </e-list>
    </e-col>
    <e-col span="10" class="editor">
      <ui-repl></ui-repl>
    </e-col>
  </e-row>
</e-container>
 `
}
