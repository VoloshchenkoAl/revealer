# Revealer

Create circular reveal animation on demand with revealer

<img src="https://raw.githubusercontent.com/VoloshchenkoAl/revealer/master/design/reveal.gif" alt="reveal animation" />

## Installation

Install with npm:

```js
npm install --save circular-revealer
```

## Example of use

```js
import revealer from 'circular-revealer';

const revealerNav = revealer({
  revealElementSelector: '.nav-js',
  options: {
    anchorSelector: '.nav-btn-js',
  },
});

revealerNav.reveal();
```

This example will attach circular reveal animation to element with class `nav-js` and will use element with class `nav-btn-js` as initial position on animation

More examples: [codepen collection](https://codepen.io/collection/Xvbajo)
