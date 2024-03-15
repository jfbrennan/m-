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

<m-include-styles-global></m-include-styles-global>

${(components.includes('m-button') || includeAll) ?
      '<m-include-styles-button></m-include-styles-button>' : ''}
${(components.includes('m-table') || includeAll) ?
      '<m-include-styles-table></m-include-styles-table>' : ''}
${(components.includes('m-link') || includeAll) ?
      '<m-include-styles-link></m-include-styles-link>' : ''}
${(components.includes('m-details') || includeAll) ?
      '<m-include-styles-details></m-include-styles-details>' : ''}
${(components.includes('m-rule') || includeAll) ?
      '<m-include-styles-rule></m-include-styles-rule>' : ''}
`}
