export function get(req) {
  const { component } = req.params
  const uiExamples = [
    { name: "Accordion" },
    { name: "Alert" },
    { name: "Autocomplete" },
    { name: "Badge" },
    { name: "Box" },
    { name: "Breadcrumb" },
    { name: "Button" },
    { name: "Checkbox" },
    { name: "Container" },
    { name: "Details" },
    { name: "Dialog" },
    { name: "Dot" },
    { name: "Form" },
    { name: "Grid" },
    { name: "Icons" },
    { name: "Input" },
    { name: "Keyboard" },
    { name: "Link" },
    { name: "Loader" },
    { name: "Menu" },
    { name: "Radio" },
    { name: "Range" },
    { name: "Select" },
    {
      name: "Separator", path: "seperator", exampleUsage: `<e-rule></e-rule>
<e-box>Text<e-rule vertical></e-rule>Text</e-box>` },
    { name: "Switch" },
    { name: "Table" },
    { name: "Tabs" },
    { name: "Tag" },
    { name: "Textarea" },
    {
      name: "Code", path: "code", exampleUsage: `<e-code>Text</e-code>
<e-code format=inline>Inline</e-code>` },
    { name: "Headings" },
    { name: "Lists" },
    { name: "Text" },
  ]

  const match = uiExamples.find(i => i.path === component)

  if (match) return { json: { exampleCode: match.exampleUsage } }
}
