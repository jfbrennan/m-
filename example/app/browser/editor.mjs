import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
// import { javascript } from "@codemirror/lang-javascript"
// import {htmlLanguage, html} from "@codemirror/lang-html"
import { html } from "@codemirror/lang-html"

// let editor = new EditorView({
//   extensions: [basicSetup, javascript()],
//   parent: document.body
// })
export { EditorView, basicSetup, html, EditorState }
