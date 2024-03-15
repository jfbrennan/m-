export default function Input({ html, state }) {
  const { attrs } = state
  const attrsWithDefaults = { 'm-type': 'text', ...attrs }
  const mAttrs = Object.entries(attrsWithDefaults).filter(([key, value]) => key.startsWith("m-"))
  const mAttrsString = mAttrs.map(([key, value]) => `${key.replace(/^m-/, '')}="${value}"`).join(" ") || ''
  return html`
<style>
:host {
  display:block;
}
fieldset {
  margin: 0;
  padding: 0;
  border: none;
  position: relative;
}

fieldset + :is(m-input, fieldset, button[ord], a[role=button]) { margin-top: var(--m-space-md) }

fieldset input:not([type=radio]):not([type=checkbox]),
fieldset :is(label, select) {
  display: block;
}

fieldset input + label { display: inline }

fieldset :is(label, legend) { font-weight: 500 }

fieldset :is(input[type=radio], input[type=checkbox]) + label {
  font-weight: normal;
}

fieldset :is(input, textarea) { box-sizing: border-box }

fieldset input:not([type=radio], [type=checkbox], [type=range]),
fieldset :is(select, textarea) {
  width: 100%;
  min-height: var(--m-input-min-height);
  font-size: 16px;
  padding: 6px;
  border-radius: 0px;
  background-color: white;
  color: var(--m-color-gray-8);
}

fieldset :is(input:not([is=switch]), select, textarea) {
  border: 1px solid var(--m-color-gray-3);
}

fieldset select:not([multiple]) {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' height='10px' width='22px'%3E%3Ctext x='0' y='10' fill='gray'%3E%E2%96%BE%3C/text%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right center;
  padding-right: var(--m-space-lg);
}

fieldset textarea {
  resize: vertical;
  font-family: inherit;
}

fieldset input[type=range] {
  appearance: none;
  outline: 0;
  width: 100%;
  margin: var(--m-space-sm) 0;
  height: var(--m-space-xs);
  background-color: var(--m-color-gray-3);
  border-radius: var(--m-border-radius-full);
}

fieldset input[type=range]::-webkit-slider-thumb {
  appearance: none;
  width: var(--m-space-md);
  height: var(--m-space-md);
  border: 1px solid var(--m-color-gray-4);
  background-color: white;
  border-radius: var(--m-border-radius-full);
}

fieldset input[type=range]::-webkit-slider-thumb:focus-visible {
  outline: 2px solid var(--m-color-focus);
}

  /*&[orient=vertical] {*/
  /*  transform: rotate(-90deg);*/
  /*  position: absolute;*/
  /*  top: 48%;*/
  /*  left: -78%;*/
  /*  margin: 0;*/
  /*}*/

:host + :is(m-input, fieldset, label, input, select, textarea, small) {
  margin-top: var(--m-space-xs);
}

fieldset input:not([type=range]):not([is=switch]):focus,
fieldset :is(select, textarea):focus {
  outline: 2px solid var(--m-color-focus);
  outline-offset: 0;
  border: 1px solid var(--m-color-primary-action);
}

fieldset :is(input, select, textarea):invalid,
fieldset :is(input, select, textarea)[invalid] {
    border-color: var(--m-color-red-3);
}

fieldset :is(input, select, textarea):invalid ~ small,
fieldset :is(input, select, textarea)[invalid] ~ small{
  color: var(--m-color-red-3);
}

fieldset :is(input, select, textarea) ~ small{
  color: var(--m-color-gray-6);
}
</style>
<fieldset>
    <label><slot name=label>Label<slot></label>
    <input ${mAttrsString} >
    <small><slot name=info></slot><small>
</fieldset>
`
}
