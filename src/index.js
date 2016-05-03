/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import contains from '@f/contains-element'
import Document from 'vdux/document'
import element from 'vdux/element'
import Delay from 'vdux-delay'
import omit from '@f/omit'

/**
 * initialState
 */

function initialState () {
  return {
    hover: false,
    linger: false,
    active: false,
    focus: false
  }
}

/**
 * Constants
 */

const filterProps = omit(['onHoverChange', 'onFocusChange', 'onActiveChange', 'onLingerChange', 'tag'])

/**
 * Css Emulator
 */

function render ({props, children, state, local}) {
  const {onHoverChange, onFocusChange, onLingerChange, onActiveChange, lingerDelay = 500, tag: Tag = 'div'} = props
  const elemProps = {}

  if (onHoverChange || onLingerChange) {
    elemProps.onMouseEnter = handler(props.onMouseEnter, local(mouseEnter))
    elemProps.onMouseLeave = handler(local(mouseLeave))
  }

  if (onActiveChange) {
    elemProps.onMouseDown = handler(props.onMouseDown, local(mouseDown))
  }

  if (onFocusChange) {
    elemProps.onFocus = handler(props.onFocus, local(focus))
    elemProps.onBlur = handler(props.onBlur, local(blur))
  }

  let node
  return (
    <Tag ref={_node => node = _node} {...filterProps(props)} {...elemProps}>
      {children}
      {state.hover && <Document onMouseMove={e => checkHover(local, node, e.target)} />}
      {(state.hover && onLingerChange) && <Delay time={lingerDelay} onEnd={local(linger)} />}
      {state.active && <Document onMouseUp={local(mouseUp)} />}
    </Tag>
  )
}

function onUpdate (prev, next) {
  // Don't do this stuff if our internal state hasn't changed
  if (prev.state !== next.state) {
    const result = []

    if (prev.state.active !== next.state.active && next.props.onActiveChange) {
      result.push(next.props.onActiveChange(next.state.active))
    }

    if (prev.state.linger !== next.state.linger && next.props.onLingerChange) {
      result.push(next.props.onLingerChange(next.state.linger))
    }

    if (prev.state.hover !== next.state.hover && next.props.onHoverChange) {
      result.push(next.props.onHoverChange(next.state.hover))
    }

    if (prev.state.focus !== next.state.focus && next.props.onFocusChange) {
      result.push(next.props.onFocusChange(next.state.focus))
    }

    return result
  }
}

/**
 * Actions
 */

const metaCreator = () => ({logLevel: 'debug'})
const mouseEnter = createAction('<CSSEmulator/>: mouseEnter', null, metaCreator)
const mouseLeave = createAction('<CSSEmulator/>: mouseLeave', null, metaCreator)
const mouseDown = createAction('<CSSEmulator/>: mouseDown', null, metaCreator)
const mouseUp = createAction('<CSSEmulator/>: mouseUp', null, metaCreator)
const focus = createAction('<CSSEmulator/>: focus', null, metaCreator)
const blur = createAction('<CSSEmulator/>: blur', null, metaCreator)
const linger = createAction('<CSSEmulator/>: linger', null, metaCreator)

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
  [mouseLeave]: state => ({...state, hover: false, linger: false}),
  [mouseDown]: state => ({...state, active: true}),
  [mouseUp]: state => ({...state, active: false}),
  [focus]: state => ({...state, focus: true}),
  [blur]: state => ({...state, focus: false}),
  [linger]: state => ({...state, linger: true})
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
  initialState,
  render,
  onUpdate,
  reducer
}
