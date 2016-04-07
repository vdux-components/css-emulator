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

  t.plan(2)
  node = render(<CSSEmulator onHoverChange={hover => t.ok(hover)} />)
  trigger(node, 'mouseenter')
  render(<CSSEmulator onHoverChange={hover => t.ok(hover)} />)

  node = render(<CSSEmulator onHoverChange={hover => t.notOk(hover)} />)
  trigger(node, 'mouseleave')
  node = render(<CSSEmulator onHoverChange={hover => t.notOk(hover)} />)

  off()
  t.end()
})

test('active should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  t.plan(2)
  node = render(<CSSEmulator onActiveChange={active => t.ok(active)} />)
  trigger(node, 'mousedown')
  node = render(<CSSEmulator onActiveChange={active => t.ok(active)} />)

  node = render(<CSSEmulator onActiveChange={active => t.notOk(active)} />)
  trigger(node, 'mouseup', {bubbles: true})
  node = render(<CSSEmulator onActiveChange={active => t.notOk(active)} />)

  off()
  t.end()
})

test('focus should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  t.plan(2)
  node = render(<CSSEmulator onFocusChange={focus => t.ok(focus)} />)
  trigger(node, 'focus')
  node = render(<CSSEmulator onFocusChange={focus => t.ok(focus)} />)

  node = render(<CSSEmulator onFocusChange={focus => t.notOk(focus)} />)
  trigger(node, 'blur')
  node = render(<CSSEmulator onFocusChange={focus => t.notOk(focus)} />)

  off()
  t.end()
})

test('linger should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  t.plan(2)
  node = render(<CSSEmulator onLingerChange={linger => t.notOk(linger)} />)
  trigger(node, 'mouseenter')
  node = render(<CSSEmulator onLingerChange={linger => t.notOk(linger)} />)

  setTimeout(() => {
    node = render(<CSSEmulator onLingerChange={linger => t.ok(linger)} />)
    trigger(node, 'mouseleave')
    node = render(<CSSEmulator onLingerChange={linger => t.notOk(linger)} />)

    off()
    t.end()
  }, 500)
})


test('should still allow normal event handlers to work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  t.plan(2)
  node = render(<CSSEmulator onFocus={() => t.pass()} onFocusChange={focus => t.ok(focus)} />)
  trigger(node, 'focus')
  node = render(<CSSEmulator onFocus={() => t.pass()} onFocusChange={focus => t.ok(focus)} />)

  off()
  t.end()

})
