
# css-emulator

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Emulate CSS UI state change events (hover, active, focus)

## Installation

    $ npm install vdux-css-emulator

## Usage

This is a low level library intended to simulate the hover/active/focus CSS selectors using local component state and DOM events. Here's how you use it:

```javascript
function render ({local}) {
  return <CSSEmulator tag='button' onHoverChange={local(highlightButton)}>Hover me</CSSEmulator>
}
```

## API - props

  * `tag` - The HTML tag or component that you want to render (e.g. `button`)
  * `onHoverChange` - Receives a boolean for hover state
  * `onActiveChange` - Receives a bool for active state
  * `onFocusChange` - Receives a bool for focus state

## Why can't I just use `onMouseEnter/onMouseLeave`?

Unfortunately this is not robust. Under certain circumstances if the mouse is moving quickly or if you do weird things like switch tabs while the mouse is hovering, you may not get a `mouseleave` event, and your hovered thing will stay open forever (or until you mouse back over and off again). This addresses this issue and similar issues with the 'active' state.

## License

MIT
