/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import contains from '@f/contains-element'
import element from 'vdux/element'
import Body from 'vdux/body'
import omit from '@f/omit'

/**
 * Constants
 */

const filterProps = omit(['hoverStyle', 'hoverClass', 'activeStyle', 'activeClass', 'focusStyle', 'focusClass', 'style', 'class'])

/**
 * Css Emulator
 */

function render ({props, children, state, local}) {
  const {hoverStyle, hoverClass, activeStyle, activeClass, focusStyle, focusClass, tag: Tag = 'div', style} = props
  const elemProps = {style, class: props.class}

  if (hoverStyle || hoverClass) {
    elemProps.onMouseEnter = handler(props.onMouseEnter, local(mouseEnter))
    elemProps.onMouseLeave = handler(local(mouseLeave))
  }

  if (activeStyle || activeClass) {
    elemProps.onMouseDown = handler(props.onMouseDown, local(mouseDown))
  }

  if (focusStyle || focusClass) {
    elemProps.onFocus = handler(props.onFocus, local(focus))
    elemProps.onBlur = handler(props.onBlur, local(blur))
  }

  if (state.active) {
    if (activeStyle) elemProps.style = {...elemProps.style, ...activeStyle}
    if (activeClass) elemProps.class = [elemProps.class, activeClass]
  }

  if (state.hover) {
    if (hoverStyle) elemProps.style = {...elemProps.style, ...hoverStyle}
    if (hoverClass) elemProps.class = [elemProps.class, hoverClass]
  }

  if (state.focus) {
    if (focusStyle) elemProps.style = {...elemProps.style, ...focusStyle}
    if (focusClass) elemProps.class = [elemProps.class, focusClass]
  }

  let node
  return (
    <Tag ref={_node => node = _node} {...filterProps(props)} {...elemProps}>
      {children}
      {state.hover && <Body onMouseMove={e => checkHover(local, node, e.target)} />}
      {state.active && <Body onMouseUp={local(mouseUp)} />}
    </Tag>
  )
}

/**
 * Actions
 */

const mouseEnter = createAction('<CSSEmulator/>: mouseEnter')
const mouseLeave = createAction('<CSSEmulator/>: mouseLeave')
const mouseDown = createAction('<CSSEmulator/>: mouseDown')
const mouseUp = createAction('<CSSEmulator/>: mouseUp')
const focus = createAction('<CSSEmulator/>: focus')
const blur = createAction('<CSSEmulator/>: blur')

function checkHover (local, regionElement, child) {
  if (!contains(regionElement, child)) {
    return local(mouseLeave)()
  }
}

/**
 * Reducer
 */

const reducer = handleActions({
  [mouseEnter]: state => ({...state, hover: true}),
  [mouseLeave]: state => ({...state, hover: false}),
  [mouseDown]: state => ({...state, active: true}),
  [mouseUp]: state => ({...state, active: false}),
  [focus]: state => ({...state, focus: true}),
  [blur]: state => ({...state, focus: false})
})

/**
 * Helpers
 */

function handler (a, b) {
  if (a && !b) return a
  if (b && !a) return b
  return [a, b]
}

/**
 * Exports
 */

export default {
  render,
  reducer
}
