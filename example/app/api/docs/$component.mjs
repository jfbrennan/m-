import demoComponents from './component-data.mjs'
export function get(req) {
  const { component } = req.params

  const match = demoComponents.find(i => i.path === component)

  if (match) return { json: { current: component, components: demoComponents, demo: match.exampleUsage } }
}
