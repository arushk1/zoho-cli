import { describe, it, expect } from 'vitest'
import List from '../../../../src/commands/bookings/services/list.js'
import Get from '../../../../src/commands/bookings/services/get.js'
import Create from '../../../../src/commands/bookings/services/create.js'
import Update from '../../../../src/commands/bookings/services/update.js'
import Delete from '../../../../src/commands/bookings/services/delete.js'

describe('bookings services — metadata', () => {
  it('list id', () => expect(List.id).toBe('bookings services list'))
  it('get id + required arg', () => {
    expect(Get.id).toBe('bookings services get')
    expect(Get.args.id.required).toBe(true)
  })
  it('create id + required name', () => {
    expect(Create.id).toBe('bookings services create')
    expect(Create.flags.name.required).toBe(true)
    expect(Create.flags['dry-run']).toBeDefined()
  })
  it('update is experimental', () => {
    expect(Update.id).toBe('bookings services update')
    expect(Update.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
    expect(Update.args.id.required).toBe(true)
    expect(Update.flags.data.required).toBe(true)
  })
  it('delete is experimental', () => {
    expect(Delete.id).toBe('bookings services delete')
    expect(Delete.summary.startsWith('[EXPERIMENTAL]')).toBe(true)
    expect(Delete.args.id.required).toBe(true)
  })
})
