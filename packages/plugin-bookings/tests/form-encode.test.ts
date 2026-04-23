import { describe, it, expect } from 'vitest'
import { serializeBookingsForm } from '../src/form-encode.js'

describe('serializeBookingsForm', () => {
  it('serializes primitives as strings', () => {
    const body = serializeBookingsForm({ name: 'Alice', age: 30, active: true }).toString()
    expect(body).toBe('name=Alice&age=30&active=true')
  })

  it('JSON-stringifies plain objects', () => {
    const body = serializeBookingsForm({ customer_details: { name: 'A', email: 'a@x' } }).toString()
    expect(body).toBe('customer_details=' + encodeURIComponent('{"name":"A","email":"a@x"}'))
  })

  it('JSON-stringifies arrays', () => {
    const body = serializeBookingsForm({ staffMap: [{ name: 'A' }, { name: 'B' }] }).toString()
    expect(body).toBe('staffMap=' + encodeURIComponent('[{"name":"A"},{"name":"B"}]'))
  })

  it('skips null and undefined values', () => {
    const body = serializeBookingsForm({ name: 'A', notes: null, phone: undefined }).toString()
    expect(body).toBe('name=A')
  })

  it('url-encodes special characters', () => {
    const body = serializeBookingsForm({ email: 'a b+c@x.com' }).toString()
    expect(body).toBe('email=a+b%2Bc%40x.com')
  })

  it('handles empty input', () => {
    expect(serializeBookingsForm({}).toString()).toBe('')
  })
})
