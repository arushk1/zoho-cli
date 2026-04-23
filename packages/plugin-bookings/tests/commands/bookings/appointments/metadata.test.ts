import { describe, it, expect } from 'vitest'
import List from '../../../../src/commands/bookings/appointments/list.js'
import Get from '../../../../src/commands/bookings/appointments/get.js'
import Book from '../../../../src/commands/bookings/appointments/book.js'
import Reschedule from '../../../../src/commands/bookings/appointments/reschedule.js'
import Complete from '../../../../src/commands/bookings/appointments/complete.js'
import Cancel from '../../../../src/commands/bookings/appointments/cancel.js'
import Noshow from '../../../../src/commands/bookings/appointments/noshow.js'

describe('bookings appointments — metadata', () => {
  it('list id + pagination flags', () => {
    expect(List.id).toBe('bookings appointments list')
    expect(List.flags.page).toBeDefined()
    expect(List.flags['per-page']).toBeDefined()
  })
  it('get id + required arg', () => {
    expect(Get.id).toBe('bookings appointments get')
    expect(Get.args.id.required).toBe(true)
  })
  it('book id + required service + from-time', () => {
    expect(Book.id).toBe('bookings appointments book')
    expect(Book.flags.service.required).toBe(true)
    expect(Book.flags['from-time'].required).toBe(true)
  })
  it('reschedule id + required arg', () => {
    expect(Reschedule.id).toBe('bookings appointments reschedule')
    expect(Reschedule.args.id.required).toBe(true)
  })
  it('complete / cancel / noshow ids', () => {
    expect(Complete.id).toBe('bookings appointments complete')
    expect(Cancel.id).toBe('bookings appointments cancel')
    expect(Noshow.id).toBe('bookings appointments noshow')
    expect(Complete.args.id.required).toBe(true)
    expect(Cancel.args.id.required).toBe(true)
    expect(Noshow.args.id.required).toBe(true)
  })
})
