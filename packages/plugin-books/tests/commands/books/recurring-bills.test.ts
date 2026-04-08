import { describe, it, expect } from 'vitest'
import RecurringBillsList from '../../../src/commands/books/recurring-bills/list.js'
import RecurringBillsGet from '../../../src/commands/books/recurring-bills/get.js'
import RecurringBillsCreate from '../../../src/commands/books/recurring-bills/create.js'
import RecurringBillsUpdate from '../../../src/commands/books/recurring-bills/update.js'
import RecurringBillsDelete from '../../../src/commands/books/recurring-bills/delete.js'
import RecurringBillsStop from '../../../src/commands/books/recurring-bills/stop.js'
import RecurringBillsResume from '../../../src/commands/books/recurring-bills/resume.js'

describe('books recurring-bills list', () => {
  it('has correct command id', () => { expect(RecurringBillsList.id).toBe('books recurring-bills list') })
  it('supports --page flag', () => { expect(RecurringBillsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(RecurringBillsList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(RecurringBillsList.flags.status).toBeDefined() })
  it('supports --vendor-id filter', () => { expect(RecurringBillsList.flags['vendor-id']).toBeDefined() })
})

describe('books recurring-bills get', () => {
  it('has correct command id', () => { expect(RecurringBillsGet.id).toBe('books recurring-bills get') })
  it('requires id arg', () => { expect(RecurringBillsGet.args.id.required).toBe(true) })
})

describe('books recurring-bills create', () => {
  it('has correct command id', () => { expect(RecurringBillsCreate.id).toBe('books recurring-bills create') })
  it('requires --data flag', () => { expect(RecurringBillsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringBillsCreate.flags['dry-run']).toBeDefined() })
})

describe('books recurring-bills update', () => {
  it('has correct command id', () => { expect(RecurringBillsUpdate.id).toBe('books recurring-bills update') })
  it('requires id arg', () => { expect(RecurringBillsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(RecurringBillsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringBillsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books recurring-bills delete', () => {
  it('has correct command id', () => { expect(RecurringBillsDelete.id).toBe('books recurring-bills delete') })
  it('requires id arg', () => { expect(RecurringBillsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringBillsDelete.flags['dry-run']).toBeDefined() })
})

describe('books recurring-bills stop', () => {
  it('has correct command id', () => { expect(RecurringBillsStop.id).toBe('books recurring-bills stop') })
  it('requires id arg', () => { expect(RecurringBillsStop.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringBillsStop.flags['dry-run']).toBeDefined() })
})

describe('books recurring-bills resume', () => {
  it('has correct command id', () => { expect(RecurringBillsResume.id).toBe('books recurring-bills resume') })
  it('requires id arg', () => { expect(RecurringBillsResume.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringBillsResume.flags['dry-run']).toBeDefined() })
})
