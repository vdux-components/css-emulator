
# css-emulator

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Emulate CSS UI states (hover, active, focus)

## Installation

    $ npm install vdux-css-emulator

## Usage

This is a low level library intended to simulate the hover/active/focus CSS selectors using local component state and DOM events. Here's how you use it:

```javascript
function render () {
  return <CSSEmulator tag='button' hoverStyle={{border: '1px solid blue'}}>Hover me</CSSEmulator>
}
```

Since it's annoying and not very self-documenting to use `<CSSEmulator/>` everywhere, you'll probably want to use this as a low-level component and build other things on top of it. Like [vdux-ui](https://github.com/vdux-components/ui).

## API - props

  * `tag` - The HTML tag or component that you want to render (e.g. `button`)
  * `hoverStyle` - Styles to be applied on hover
  * `hoverClass` - Class to be applied on hover
  * `activeStyle` - Styles to be applied when the component is 'active' (e.g. when a button is pressed)
  * `activeClass` - Class to be applied when the component is 'active'
  * `focusStyle` - Styles to be applied when the component is focused
  * `focusClass` - Class to be applied when the component is focused

## License

MIT
