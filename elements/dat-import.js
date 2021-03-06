'use strict'

const microcomponent = require('microcomponent')
const html = require('choo/html')
const assert = require('assert')
const css = require('sheetify')
const icon = require('./icon')

module.exports = DatImportElement

const prefix = css`
  :host {
    --icon-height: 1.2rem;
    color: var(--color-neutral-30);
    .icon-link {
      padding-top: .42rem;
      padding-left: .5rem;
      pointer-events: none;
      width: var(--icon-height);
      height: var(--icon-height);
    }
    input {
      height: 2rem;
      width: 7.5rem;
      padding-right: .5rem;
      padding-left: 2rem;
      border-radius:2px;
      border: 1px solid transparent;
      background-color: transparent;
      color: var(--color-neutral-30);
      opacity: 1;
      text-transform: uppercase;
      letter-spacing: .025em;
      transition-property: width;
      transition-duration: .15s;
      transition-timing-function: ease-in;
      &::-webkit-input-placeholder {
        color: var(--color-neutral-30);
        opacity: 1;
      }
      &:hover,
      &:hover::-webkit-input-placeholder,
      &:hover + svg {
        color: var(--color-white);
      }
      &:focus,
      &:active {
        width: 14rem;
        outline: none;
        background-color: var(--color-white);
        color: var(--color-neutral);
      }
      &:focus::-webkit-input-placeholder,
      &:active::-webkit-input-placeholder,
      &:focus + svg,
      &:active + svg {
        color: var(--color-neutral-50);
      }
    }
  }
`

function DatImportElement () {
  var component = microcomponent({ name: 'dat-import' })
  component.on('render', render)
  component.on('update', update)
  return component

  function render () {
    const onsubmit = this.props.onsubmit

    assert.equal(typeof onsubmit, 'function', 'dat-import: onsubmit should be type function')

    return html`
      <label for="dat-import" class="relative dib pa0 b--none ${prefix}">
        <input name="dat-import"
          type="text"
          placeholder="Download"
          onkeydown=${onKeyDown}
          class="input-reset f7 f6-l">
        ${icon('link', { class: 'absolute top-0 bottom-0 left-0' })}
      </label>
    `

    function onKeyDown (e) {
      const value = e.target.value
      if (e.key !== 'Enter' || !value) return
      e.target.value = ''
      onsubmit(value)
    }
  }

  function update () {
    return false
  }
}
