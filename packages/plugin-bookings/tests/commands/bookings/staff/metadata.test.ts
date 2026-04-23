import { describe, it, expect } from 'vitest'
import List from '../../../../src/commands/bookings/staff/list.js'
import Get from '../../../../src/commands/bookings/staff/get.js'
import Search from '../../../../src/commands/bookings/staff/search.js'
import Add from '../../../../src/commands/bookings/staff/add.js'
import Update from '../../../../src/commands/bookings/staff/update.js'
import Delete from '../../../../src/commands/bookings/staff/delete.js'

describe('bookings staff — metadata', () => {
  it('list id', () => expect(List.id).toBe('bookings staff list'))
  it('get id', () => {
    expect(Get.id).toBe('bookings staff get')
    expect(Get.args.id.required).toBe(true)
  })
  it('search id', () => {
    expect(Search.id).toBe('bookings staff search')
    expect(Search.args.email.required).toBe(true)
  })
  it('add id + dry-run + file flag', () => {
    expect(Add.id).toBe('bookings staff add')
    expect(Add.flags.file).toBeDefined()
    expect(Add.flags['dry-run']).toBeDefined()
  })
  it('update is experimental', () => {
    expect(Update.id).toBe('bookings staff update')
    expect(Update.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
  })
  it('delete is experimental', () => {
    expect(Delete.id).toBe('bookings staff delete')
    expect(Delete.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
  })
})
