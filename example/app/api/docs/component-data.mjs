const components = [
  {
    name: "Accordion",
    path: "accordion",
    exampleUsage: `<e-accordion>
  <e-details>
    <details>
        <summary>Summary</summary>
        <p>Details about this thing</p>
    </details>
  </e-details>
  <e-details>
    <details>
      <summary>Summary</summary>
      <p>Details about this thing</p>
    </details>
  </e-details>
</e-accordion>


` },
  {
    name: "Alert",
    path: "alert",
    exampleUsage: `
<e-alert>Neutral message</e-alert>
<e-alert type="info">Informational message</e-alert>
<e-alert type="success">Positive message</e-alert>
<e-alert type="warn">Cautionary message</e-alert>
<e-alert type="error" icon="error" dismissible="false">Error message with icon and no dismiss button</e-alert>`},
  {
    name: "Autocomplete",
    path: "autocomplete",
    exampleUsage: `
<e-autocomplete>
  <label>Search</label>
  <e-autocomplete source="fruit" placeholder="Slowly type 'apl' to see the behavior"></e-autocomplete>
  <datalist id="fruit">
    <option value="apple"></option>
    <option value="banana"></option>
    <option value="cherry"></option>
    <option value="peach"></option>
  </datalist>
</e-autocomplete>`},
  {
    name: "Badge",
    path: "badge",
    exampleUsage: `
<e-badge count="1"></e-badge>
<e-badge>New</e-badge>`},
  {
    name: "Box",
    path: "box",
    exampleUsage: `
<e-box>Primary content</e-box>
<e-box ord="secondary">Secondary content</e-box>
<p>Content outside a Box is considered neutral</p>`},
  {
    name: "Breadcrumb", path: "breadcrumb", exampleUsage: `
<e-breadcrumb>
    <nav>
        <e-link><a href="#">Home</a></e-link>
        <e-link><a href="#">Shoes</a></e-link>
        <span aria-current="page">Women</span>
    </nav>
</e-breadcrumb>
<e-seperator></e-seperator>
<e-breadcrumb>
    <nav>
        <e-link><a href="#home">
            <e-icon name="home"></e-icon>
        </a></e-link>
        <e-link><a href="#shoes">Shoes</a></e-link>
        <e-crumb>
            <e-menu>
                <span role="link" slot="trigger">Womens<e-icon name="arrow_downward" class="txt-xs"></e-icon></span>
                <div slot="items">
                    <e-link><a href="#womens-casual">👞 Casual</a></e-link>
                    <e-link><a href="#womens-sporty">👟 Sporty</a></e-link>
                    <e-link><a href="#womens-formal">👠 Formal</a></e-link>
                </div>
            </e-menu>
        </e-crumb>
        <span>Sport</span>
    </nav>
</e-breadcrumb>
` },
  {
    name: "Button", path: "button", exampleUsage: `
<p>Ordinal name</p>
<e-button><button ord="primary">Primary</button></e-button>
<e-button><button ord="secondary">Secondary</button></e-button>
<e-button><button ord="tertiary">Tertiary</button></e-button>
<p>Disabled state</p>
<e-button><button ord="primary" disabled>Disabled</button></e-button>
<p>Link as button</p>
<e-button><e-link><a role="button" ord="primary" href="/button">Link</a></e-link></e-button>
<p>Remove type</p>
<e-button><button type="remove"></button></e-button>
<p>Button group</p>
<div role="group">
    <e-button><button ord="secondary" aria-pressed="true">One</button></e-button>
    <e-button><button ord="secondary">Two</button></e-button>
    <e-button><button ord="secondary">Three</button></e-button>
</div>
`},
  {
    name: "Checkbox", path: "checkbox", exampleUsage: `
<e-input-group>
    <legend>Languages</legend>
    <input id="html" type="checkbox" name="speed" value="html" checked>
    <label for="html">HTML</label>
    <input id="css" type="checkbox" name="speed" value="css">
    <label for="css">CSS</label>
    <input id="js" type="checkbox" name="speed" value="js">
    <label for="js">JavaScript</label>
</e-input-group>
`},
  {
    name: "Container", path: "container", exampleUsage: `
<e-container>Container is centered in its parent, has responsive padding, and its content will be contained according to <code>maxwidth</code>.</e-container>
`},
  {
    name: "Details", path: 'details', exampleUsage: `
<e-details>
  <details>
    <summary>Click to see details</summary>
    <p>The deets.</p>
  </details>
</e-details>
`},
  {
    name: "Dialog", path: 'dialog', exampleUsage: `
<e-dialog>
  <dialog>
    <h2>Title</h2>
    <p>Put anything you want in here.</p>
    <p>(press <kbd>Esc</kbd> to close)</p>
  </dialog>
</e-dialog>
<e-button><button onclick="document.querySelector('dialog').showModal()" ord="primary">Open Dialog</button></e-button>
`},
  {
    name: "Dot",
    path: "dot",
    exampleUsage: `<e-dot type="info">Information</e-dot>
<e-dot type="success">Success</e-dot>
<e-dot type="warn">Warning</e-dot>
<e-dot type="error">Error</e-dot>
<e-dot>Unknown</e-dot>`},
  {
    name: "Form", path: 'form', exampleUsage: `
<form>
    <e-input-group>
        <label>Email</label>
        <input type="email">
    </e-input-group>
    <e-input-group>
        <label>Password</label>
        <input type="password">
        <small>Must be at least 8 characters</small>
    </e-input-group>
    <e-input-group>
        <label>Address</label>
        <input placeholder="Street">
        <input placeholder="Zip" autocomplete="postal-code">
    </e-input-group>
    <e-button><button type="submit" ord="primary">Save</button></e-button>
</form>
`},
  {
    name: "Grid", path: 'grid', exampleUsage: `
<e-row>
    <e-col>
      <e-box>This row's columns...</e-box>
    </e-col>
    <e-col>
      <e-box>...will auto-span.</e-box>
    </e-col>
</e-row>
<e-row>
    <e-col span="4">
      <e-box>These two columns...</e-box>
    </e-col>
    <e-col span="8">
      <e-box>...span an explicit number of columns (4 and 8).</e-box>
    </e-col>
</e-row>
<e-row center >
  <e-col span="4">
    <e-box>Centered Row</e-box>
  </e-col>
</e-row>
`},
  {
    name: "Icons", path: 'icons', exampleUsage: `
<e-icon name="person"></e-icon>
<e-icon name="person" fill></e-icon>
<e-icon name="flag"></e-icon>
<e-icon name="menu"></e-icon>
<e-icon name="error"></e-icon>
<e-icon name="arrow_downward"></e-icon>
`},
  {
    name: "Input", path: 'input', exampleUsage: `
<e-input-group>
    <label>Label</label>
    <input type="text" placeholder="Placeholder">
</e-input-group>
`},
  {
    name: "Keyboard", path: 'keyboard', exampleUsage: `
<p>Press <e-keyboard>⇧⌘T</e-keyboard> to close window</p>
<e-keyboard>
    <e-keyboard>Ctrl</e-keyboard> + <e-keyboard>N</e-keyboard>
</e-keyboard>
`},
  {
    name: "Link", path: 'link', exampleUsage: `
<e-link><a href="#">Real link</a></e-link>,
<e-link><span role="link">Fake link</span></e-link>
`},
  {
    name: "Loader", path: 'loader', exampleUsage: `
<e-loader loading></e-loader>
<e-loader loading>Searching...</e-loader>
`},
  {
    name: "Menu", path: 'menu', exampleUsage: `
<e-menu>
    <e-button slot="trigger"><button  ord="primary">Basic Links</button></e-button>
    <div slot="items">
        <e-link><a>Products</a></e-link>
        <e-link><a>Services</a></e-link>
        <e-link><a>Customer support</a></e-link>
    </div>
</e-menu>
<e-menu>
    <e-button slot="trigger"><button ord="primary">Custom Content and Width</button></e-button>
    <div slot="items" class="pad-sm" style="min-width: 200px">
        <div class="inline-flex align-items-center">
            <img src="https://picsum.photos/50" height="51" class="brd-radius-full">
            <div>
                <div class="txt-nowrap">Homer J. Simpson</div>
                <div class="txt-gray-6">Safety Inspector</div>
            </div>
        </div>
        <hr class="mar-t-sm mar-b-sm">
        <div class="flex flx-col gap-xs">
            <a>Profile</a>
            <a>Sign out</a>
        </div>
    </div>
</e-menu>
`},
  {
    name: "Radio", path: 'radio', exampleUsage: `
<e-input-group>
    <legend>Speed</legend>
    <input type="radio" name="speed" value="slow" id="speed_slow" checked>
    <label for="speed_slow">Slow</label>
    <input type="radio" name="speed" value="med" id="speed_med">
    <label for="speed_med">Medium</label>
    <input type="radio" name="speed" value="fast" id="speed_fast">
    <label for="speed_fast">Fast</label>
</e-input-group>
`},
  {
    name: "Range", path: 'range', exampleUsage: `
<e-input-group>
    <label>Price</label>
    <input type="range">
</e-input-group>
`},
  {
    name: "Select", path: 'select', exampleUsage: `
<e-input-group>
    <label>Select one</label>
    <select>
      <option value="water">Water</option>
      <option value="coke">Coke</option>
      <option value="lemonade">Lemonade</option>
    </select>
</e-input-group>
<e-input-group>
    <label>Select many</label>
    <select name="pets" multiple size="8">
      <optgroup label="Appetizers">
        <option value="chips">Chips & salsa</option>
        <option value="cheese">Cheese platter</option>
      </optgroup>
      <optgroup label="Main course">
        <option value="duck">Duck confit</option>
        <option value="ribeye">8oz aged ribeye</option>
      </optgroup>
      <optgroup label="Dessert">
        <option value="cake">Cake</option>
        <option value="ice-cream">Ice-cream</option>
      </optgroup>
    </select>
</e-input-group>
`},
  {
    name: "Separator", path: "seperator", exampleUsage: `
<p>Content</p>
<e-seperator></e-seperator>
<p>Content</p>
<div class="flex gap-xs">
    <div>Content</div>
    <e-seperator vertical></e-seperator>
    <div>Content</div>
    <e-seperator vertical></e-seperator>
    <div>Content</div>
</div>
` },
  {
    name: "Switch", path: 'switch', exampleUsage: `
<e-switch></e-switch>
<e-switch><input type="checkbox" is="switch" checked></e-switch>
`},
  {
    name: "Table", path: 'table', exampleUsage: `
<e-table>
<table striped>
    <thead>
        <tr>
            <th>Product</th>
            <th aria-sort="ascending">
                <button aria-pressed="true">Price</button>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Socks</td>
            <td>$9.99</td>
        </tr>
        <tr>
            <td>Shorts</td>
            <td>$19.99</td>
        </tr>
        <tr>
            <td>Sweater</td>
            <td>$29.99</td>
        </tr>
        <tr>
            <td>Shoes</td>
            <td>$49.99</td>
        </tr>
    </tbody>
</table>
</e-table>
`},
  {
    name: "Tabs", path: 'tabs', exampleUsage: `
<e-tabs role="tablist" scrollable>
  <e-button><button role="tab" aria-selected="true">Selected</button></e-button>
  <e-button><button role="tab">Not Selected</button></e-button>
  <e-button><button role="tab" disabled>Disabled</button></e-button>
  <e-link><a href="/" role="tab">Link</a></e-link>
</e-tabs>
<p class="txt-xs txt-gray-5">See <e-link><a href="#select-tab">selecting tabs</a></e-link> to learn how to select a tab</p>
`},
  {
    name: "Tag", path: 'tag', exampleUsage: `
<e-tag>non-smoking</e-tag>
<e-tag>WiFi</e-tag>
<e-tag>pool</e-tag>
<e-tag>
    <e-icon name="local_cafe"></e-icon>
    free breakfast
    <e-button><button type="remove"></button></e-button>
</e-tag>
`},
  {
    name: "Textarea", path: 'textarea', exampleUsage: `
<e-input-group>
  <label>Leave a comment</label>
  <textarea> </textarea> 
</e-input-group>
`},
  {
    name: "Code", path: "code", exampleUsage: `
<e-code><pre>Text</pre></e-code>
<e-code><code>Inline<code></e-code>` },
  {
    name: "Headings", path: 'headings', exampleUsage: `
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
`},
  {
    name: "Lists", path: 'lists', exampleUsage: `
<e-list>
  <ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ul>
</e-list>
<e-list>
  <ol>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ol>
</e-list>
<e-list type="none">
  <ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ul>
</e-list>
<e-list>
  <ul>
    <li class="pad-sm">Foo</li>
    <li class="pad-sm">Bar</li>
    <li class="pad-sm">Baz</li>
  </ul>
</e-list>
`},
  {
    name: "Text", path: 'text', exampleUsage: `
<p>This is a paragraph with some <span class="fnt-bold">bold text</span> and some <span class="fnt-italic">italic text</span>. More text variations can be done using the <e-link><a href="/utility-classes">utility classes</a></e-link>.</p>
<e-blockquote>
  <p>This is something somebody said.</p>
</e-blockquote>
<small>This is for small print, side-comments, disclaimers, etc.</small>
`},
]

export default components
