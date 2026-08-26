import { describe, it, expect } from 'vitest'
import RawGet, { parseParams, stripEnvelope } from '../../../src/commands/books/raw/get.js'

describe('books raw get', () => {
  it('has correct command id', () => { expect(RawGet.id).toBe('books raw get') })
  it('requires path arg', () => { expect(RawGet.args.path.required).toBe(true) })
  it('param flag is repeatable', () => { expect(RawGet.flags.param.multiple).toBe(true) })
})

describe('parseParams', () => {
  it('returns an empty object for no params', () => { expect(parseParams(undefined)).toEqual({}) })
  it('splits on the first = only', () => {
    expect(parseParams(['a=1', 'filter_by=Status.All', 'q=x=y'])).toEqual({ a: '1', filter_by: 'Status.All', q: 'x=y' })
  })
  it('rejects a param without = or with an empty key', () => {
    expect(() => parseParams(['novalue'])).toThrow(/key=value/)
    expect(() => parseParams(['=v'])).toThrow(/key=value/)
  })
})

describe('stripEnvelope', () => {
  it('drops code and message, keeps the payload', () => {
    expect(stripEnvelope({ code: 0, message: 'success', profit_and_loss: [1] })).toEqual({ profit_and_loss: [1] })
  })
  it('passes non-objects through', () => { expect(stripEnvelope([1])).toEqual([1]) })
})
