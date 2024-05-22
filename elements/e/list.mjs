export default function Lists({ html, state }) {
  const type = state.attrs.type || 'unordered'
  const isUl = type === 'unordered'
  const isOl = type === 'ordered'
  const isNone = type === 'none'
  const isDl = type === 'description-list'
  return html`

<style scope=global>
  
e-list{
  /* Ordered and unordered base styles */
  ul, ol, dl { margin: 0 }
  ul, ol { padding-left: var(--m-space-md) }

  /* None type (no bullets) */
  &[type=none] ul{
    list-style: none;
    padding-left: 0;
  }

  /* Definition list base styles */
  dd { margin-inline-start: 0 }
  dl {
    & > dt {
      margin-top: var(--m-space-sm);
      text-transform: uppercase;
      font-size: var(--m-font-size-min);
      font-weight: bold;

      &:first-of-type { margin-top: 0 }
    }
  }

  /* Content list base styles */
  &[type=content] :is(ul, ol){
    list-style: none;
    padding-left: 0;

    & > li:not(:last-of-type) {
      border-bottom: 1px solid var(--m-color-border)
    }
  }
}
</style>
${isUl && '<ul><slot></slot></ul>'}
${isNone && '<ul><slot></slot></ul>'}
${isOl && '<ol><slot></slot></ol>'}
${isDl && '<ul><slot></slot></ul>'}
` }
