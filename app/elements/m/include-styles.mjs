export default function Styles({ html, state }) {
  const { attrs } = state;
  let components = attrs?.['include']?.split(/\s*,\s*/)?.map(comp => comp.trim())
  let includeAll = components?.includes('all')

  return html`
<style>
  :host {
    display: none ;
  }
</style>

${(components.includes('m-button') || includeAll) ?
      '<m-include-styles-button></m-include-styles-button>' : ''}
${(components.includes('m-table') || includeAll) ?
      '<m-include-styles-table></m-include-styles-table>' : ''}
`}
