/**
 * Imports
 */

import trigger from '@f/trigger-event'
import element from 'vdux/element'
import CSSEmulator from '../src'
import vdux from 'vdux/dom'
import test from 'tape'

/**
 * Tests
 */

test('hover should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSEmulator hoverStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '')

  trigger(node, 'mouseenter')
  node = render(<CSSEmulator hoverStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '1px solid')

  trigger(node, 'mouseleave')
  node = render(<CSSEmulator hoverStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '')

  off()
  t.end()
})

test('active should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSEmulator activeStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '')

  trigger(node, 'mousedown')
  node = render(<CSSEmulator activeStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '1px solid')

  trigger(node, 'mouseup', {bubbles: true})
  node = render(<CSSEmulator activeStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '')

  off()
  t.end()
})

test('focus should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSEmulator focusStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '')

  trigger(node, 'focus')
  node = render(<CSSEmulator focusStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '1px solid')

  trigger(node, 'blur')
  node = render(<CSSEmulator focusStyle={{border: '1px solid'}} />)
  t.equal(node.style.border, '')

  off()
  t.end()
})

test('should still allow normal event handlers to work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSEmulator onFocus={() => t.pass()} focusStyle={{border: '1px solid'}} />)
  t.plan(1)
  trigger(node, 'focus')

  off()
  t.end()

})
