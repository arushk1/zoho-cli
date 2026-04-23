import { describe, it, expect } from 'vitest'
import List from '../../../../src/commands/bookings/resources/list.js'
import Get from '../../../../src/commands/bookings/resources/get.js'
import Create from '../../../../src/commands/bookings/resources/create.js'
import Update from '../../../../src/commands/bookings/resources/update.js'
import Delete from '../../../../src/commands/bookings/resources/delete.js'

describe('bookings resources — metadata', () => {
  it('list id', () => expect(List.id).toBe('bookings resources list'))
  it('get id', () => {
    expect(Get.id).toBe('bookings resources get')
    expect(Get.args.id.required).toBe(true)
  })
  it('create experimental', () => {
    expect(Create.id).toBe('bookings resources create')
    expect(Create.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
    expect(Create.flags.data.required).toBe(true)
  })
  it('update experimental', () => {
    expect(Update.id).toBe('bookings resources update')
    expect(Update.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
  })
  it('delete experimental', () => {
    expect(Delete.id).toBe('bookings resources delete')
    expect(Delete.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
  })
})
