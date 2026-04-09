import { describe, it, expect } from 'vitest'
import DeskTimeEntriesList from '../../../src/commands/desk/time-entries/list.js'
import DeskTimeEntriesGet from '../../../src/commands/desk/time-entries/get.js'
import DeskTimeEntriesCreate from '../../../src/commands/desk/time-entries/create.js'
import DeskTimeEntriesUpdate from '../../../src/commands/desk/time-entries/update.js'
import DeskTimeEntriesDelete from '../../../src/commands/desk/time-entries/delete.js'

describe('desk time-entries list', () => {
  it('has correct command id', () => { expect(DeskTimeEntriesList.id).toBe('desk time-entries list') })
  it('has summary', () => { expect(DeskTimeEntriesList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskTimeEntriesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTimeEntriesList.flags['per-page']).toBeDefined() })
})

describe('desk time-entries get', () => {
  it('has correct command id', () => { expect(DeskTimeEntriesGet.id).toBe('desk time-entries get') })
  it('has summary', () => { expect(DeskTimeEntriesGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTimeEntriesGet.args.id.required).toBe(true) })
})

describe('desk time-entries create', () => {
  it('has correct command id', () => { expect(DeskTimeEntriesCreate.id).toBe('desk time-entries create') })
  it('has summary', () => { expect(DeskTimeEntriesCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskTimeEntriesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTimeEntriesCreate.flags['dry-run']).toBeDefined() })
})

describe('desk time-entries update', () => {
  it('has correct command id', () => { expect(DeskTimeEntriesUpdate.id).toBe('desk time-entries update') })
  it('has summary', () => { expect(DeskTimeEntriesUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTimeEntriesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTimeEntriesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTimeEntriesUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk time-entries delete', () => {
  it('has correct command id', () => { expect(DeskTimeEntriesDelete.id).toBe('desk time-entries delete') })
  it('has summary', () => { expect(DeskTimeEntriesDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTimeEntriesDelete.args.id.required).toBe(true) })
})
