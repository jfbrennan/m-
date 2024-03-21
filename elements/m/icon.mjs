export default function Icon({ html }) {
  return html`

<style scope=global>
/* Icon font */
@font-face {
  font-family: 'm-icons';
  font-style: normal;
  font-weight: 400;
  /*
    This Google Fonts API request:
    https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1
    Returned this font URL:
    https://fonts.gstatic.com/s/materialsymbolsoutlined/v134/kJF4BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzBwG-RpA6RzaxHMPdY40KH8nGzv3fzfVJU22ZZLsYEpzC_1ver5Y0J1Llf.woff2
    That font file was downloaded and added to Mdash as src/m-icons.woff2, which gets published to npm/unpkg.
  */
  src: url(_public/m-.woff2) format('woff2');
}
</style>

<style>
/* Icon base styles */
:host {
  display: inline-flex;
}

:host::before {
  font-family: 'm-icons';
  content: attr(name);
  -webkit-font-smoothing: antialiased;
}

  /* Filled option */
:host[fill]::before { font-variation-settings: 'FILL' 1 }


/* Weights TBD */
/*m-icon[weight="100"] { font-variation-settings: 'wght' 100 }*/

/* Grades TBD */
/*m-icon[grade="-25"] { font-variation-settings: 'GRAD' -25 }*/

/* Optical sizes TBD */
/*m-icon[opsz="48"] { font-variation-settings: 'opsz' 48 }*/
</style>
` }
