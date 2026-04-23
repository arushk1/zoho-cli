import { describe, it, expect } from 'vitest'
import Slots from '../../../../src/commands/bookings/availability/slots.js'

describe('bookings availability slots — metadata', () => {
  it('id + required flags', () => {
    expect(Slots.id).toBe('bookings availability slots')
    expect(Slots.flags.service.required).toBe(true)
    expect(Slots.flags['selected-date'].required).toBe(true)
  })
})
