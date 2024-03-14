export default function Col({ html }) {
  return html`
<style>

:host,
:host[indent] {
  box-sizing: border-box;
  flex: 0 0 auto;
}

:host {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
}

/* span sets the width of the column */
:host[span~="1"] {
  max-width: 8.33333333%;
}

:host[span~="2"] {
  max-width: 16.66666667%;
}

:host[span~="3"] {
  max-width: 25%;
}

:host[span~="4"] {
  max-width: 33.33333333%;
}

:host[span~="5"] {
  max-width: 41.66666667%;
}

:host[span~="6"] {
  max-width: 50%;
}

:host[span~="7"] {
  max-width: 58.33333333%;
}

:host[span~="8"] {
  max-width: 66.66666667%;
}

:host[span~="9"] {
  max-width: 75%;
}

:host[span~="10"] {
  max-width: 83.33333333%;
}

:host[span~="11"] {
  max-width: 91.66666667%;
}

:host[span~="12"] {
  max-width: 100%;
}

/* indent is used to push columns inward */
:host[indent="1"] {
  margin-left: 8.33333333%;
}

:host[indent="2"] {
  margin-left: 16.66666667%;
}

:host[indent="3"] {
  margin-left: 25%;
}

:host[indent="4"] {
  margin-left: 33.33333333%;
}

:host[indent="5"] {
  margin-left: 41.66666667%;
}

:host[indent="6"] {
  margin-left: 50%;
}

:host[indent="7"] {
  margin-left: 58.33333333%;
}

:host[indent="8"] {
  margin-left: 66.66666667%;
}

:host[indent="9"] {
  margin-left: 75%;
}

:host[indent="10"] {
  margin-left: 83.33333333%;
}

:host[indent="11"] {
  margin-left: 91.66666667%;
}

:host[indent="12"] {
  margin-left: 100%;
}

/* Order is used to reorder columns at specific breakpoints */
@media only screen and (max-width: 768px) {
  :host[span~=md-1] {
    max-width: 8.33333333%;
  }

  :host[span~=md-2] {
    max-width: 16.66666667%;
  }

  :host[span~=md-3] {
    max-width: 25%;
  }

  :host[span~=md-4] {
    max-width: 33.33333333%;
  }

  :host[span~=md-5] {
    max-width: 41.66666667%;
  }

  :host[span~=md-6] {
    max-width: 50%;
  }

  :host[span~=md-7] {
    max-width: 58.33333333%;
  }

  :host[span~=md-8] {
    max-width: 66.66666667%;
  }

  :host[span~=md-9] {
    max-width: 75%;
  }

  :host[span~=md-10] {
    max-width: 83.33333333%;
  }

  :host[span~=md-11] {
    max-width: 91.66666667%;
  }

  :host[span~=md-12] {
    max-width: 100%;
  }
}

/* Must come after medium because cascading is used here */
@media only screen and (max-width: 576px) {
  :host[span~=sm-1] {
    max-width: 8.33333333%;
  }

  :host[span~=sm-2] {
    max-width: 16.66666667%;
  }

  :host[span~=sm-3] {
    max-width: 25%;
  }

  :host[span~=sm-4] {
    max-width: 33.33333333%;
  }

  :host[span~=sm-5] {
    max-width: 41.66666667%;
  }

  :host[span~=sm-6] {
    max-width: 50%;
  }

  :host[span~=sm-7] {
    max-width: 58.33333333%;
  }

  :host[span~=sm-8] {
    max-width: 66.66666667%;
  }

  :host[span~=sm-9] {
    max-width: 75%;
  }

  :host[span~=sm-10] {
    max-width: 83.33333333%;
  }

  :host[span~=sm-11] {
    max-width: 91.66666667%;
  }

  :host[span~=sm-12] {
    max-width: 100%;
  }
}

</style>
<slot></slot>
`
}
