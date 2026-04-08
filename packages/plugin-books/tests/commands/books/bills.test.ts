import { describe, it, expect } from 'vitest'
import BillsList from '../../../src/commands/books/bills/list.js'
import BillsGet from '../../../src/commands/books/bills/get.js'
import BillsCreate from '../../../src/commands/books/bills/create.js'
import BillsUpdate from '../../../src/commands/books/bills/update.js'
import BillsDelete from '../../../src/commands/books/bills/delete.js'
import BillsVoid from '../../../src/commands/books/bills/void.js'
import BillsOpen from '../../../src/commands/books/bills/open.js'
import BillsApprove from '../../../src/commands/books/bills/approve.js'

describe('books bills list', () => {
  it('has correct command id', () => { expect(BillsList.id).toBe('books bills list') })
  it('supports --page flag', () => { expect(BillsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillsList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(BillsList.flags.status).toBeDefined() })
  it('supports --vendor-id filter', () => { expect(BillsList.flags['vendor-id']).toBeDefined() })
})

describe('books bills get', () => {
  it('has correct command id', () => { expect(BillsGet.id).toBe('books bills get') })
  it('requires id arg', () => { expect(BillsGet.args.id.required).toBe(true) })
})

describe('books bills create', () => {
  it('has correct command id', () => { expect(BillsCreate.id).toBe('books bills create') })
  it('requires --data flag', () => { expect(BillsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillsCreate.flags['dry-run']).toBeDefined() })
})

describe('books bills update', () => {
  it('has correct command id', () => { expect(BillsUpdate.id).toBe('books bills update') })
  it('requires id arg', () => { expect(BillsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books bills delete', () => {
  it('has correct command id', () => { expect(BillsDelete.id).toBe('books bills delete') })
  it('requires id arg', () => { expect(BillsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillsDelete.flags['dry-run']).toBeDefined() })
})

describe('books bills void', () => {
  it('has correct command id', () => { expect(BillsVoid.id).toBe('books bills void') })
  it('requires id arg', () => { expect(BillsVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillsVoid.flags['dry-run']).toBeDefined() })
})

describe('books bills open', () => {
  it('has correct command id', () => { expect(BillsOpen.id).toBe('books bills open') })
  it('requires id arg', () => { expect(BillsOpen.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillsOpen.flags['dry-run']).toBeDefined() })
})

describe('books bills approve', () => {
  it('has correct command id', () => { expect(BillsApprove.id).toBe('books bills approve') })
  it('requires id arg', () => { expect(BillsApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillsApprove.flags['dry-run']).toBeDefined() })
})
