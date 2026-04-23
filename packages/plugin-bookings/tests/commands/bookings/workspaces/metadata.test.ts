import { describe, it, expect } from 'vitest'
import List from '../../../../src/commands/bookings/workspaces/list.js'
import Get from '../../../../src/commands/bookings/workspaces/get.js'
import Create from '../../../../src/commands/bookings/workspaces/create.js'
import Update from '../../../../src/commands/bookings/workspaces/update.js'
import Delete from '../../../../src/commands/bookings/workspaces/delete.js'

describe('bookings workspaces commands — metadata', () => {
  it('list has correct id and summary', () => {
    expect(List.id).toBe('bookings workspaces list')
    expect(typeof List.summary).toBe('string')
    expect(List.summary.length).toBeGreaterThan(0)
  })
  it('get has correct id and requires id arg', () => {
    expect(Get.id).toBe('bookings workspaces get')
    expect(Get.args.id.required).toBe(true)
  })
  it('create has correct id and requires --name', () => {
    expect(Create.id).toBe('bookings workspaces create')
    expect(Create.flags.name.required).toBe(true)
    expect(Create.flags['dry-run']).toBeDefined()
  })
  it('update has correct id, requires id + --data', () => {
    expect(Update.id).toBe('bookings workspaces update')
    expect(Update.args.id.required).toBe(true)
    expect(Update.flags.data.required).toBe(true)
  })
  it('delete has correct id and requires id arg', () => {
    expect(Delete.id).toBe('bookings workspaces delete')
    expect(Delete.args.id.required).toBe(true)
    expect(Delete.flags['ignore-past-appointments']).toBeDefined()
  })
})
