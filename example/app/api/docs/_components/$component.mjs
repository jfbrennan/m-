import demoComponents from './../component-data.mjs'
export function get(req) {
  const { markup } = req.query
  const { component } = req.params
  console.log({ component, markup })

  const match = demoComponents.find(i => i.path === component)

  if (match) return { json: { current: component, demo: markup || match.exampleUsage } }
}

