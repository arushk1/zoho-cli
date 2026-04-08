import { describe, it, expect } from 'vitest'
import CreditNotesList from '../../../src/commands/books/credit-notes/list.js'
import CreditNotesGet from '../../../src/commands/books/credit-notes/get.js'
import CreditNotesCreate from '../../../src/commands/books/credit-notes/create.js'
import CreditNotesUpdate from '../../../src/commands/books/credit-notes/update.js'
import CreditNotesDelete from '../../../src/commands/books/credit-notes/delete.js'
import CreditNotesVoid from '../../../src/commands/books/credit-notes/void.js'
import CreditNotesDraft from '../../../src/commands/books/credit-notes/draft.js'
import CreditNotesOpen from '../../../src/commands/books/credit-notes/open.js'
import CreditNotesApprove from '../../../src/commands/books/credit-notes/approve.js'

describe('books credit-notes list', () => {
  it('has correct command id', () => { expect(CreditNotesList.id).toBe('books credit-notes list') })
  it('supports --page flag', () => { expect(CreditNotesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(CreditNotesList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(CreditNotesList.flags.status).toBeDefined() })
  it('supports --customer-id filter', () => { expect(CreditNotesList.flags['customer-id']).toBeDefined() })
})

describe('books credit-notes get', () => {
  it('has correct command id', () => { expect(CreditNotesGet.id).toBe('books credit-notes get') })
  it('requires id arg', () => { expect(CreditNotesGet.args.id.required).toBe(true) })
})

describe('books credit-notes create', () => {
  it('has correct command id', () => { expect(CreditNotesCreate.id).toBe('books credit-notes create') })
  it('requires --data flag', () => { expect(CreditNotesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesCreate.flags['dry-run']).toBeDefined() })
})

describe('books credit-notes update', () => {
  it('has correct command id', () => { expect(CreditNotesUpdate.id).toBe('books credit-notes update') })
  it('requires id arg', () => { expect(CreditNotesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(CreditNotesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books credit-notes delete', () => {
  it('has correct command id', () => { expect(CreditNotesDelete.id).toBe('books credit-notes delete') })
  it('requires id arg', () => { expect(CreditNotesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesDelete.flags['dry-run']).toBeDefined() })
})

describe('books credit-notes void', () => {
  it('has correct command id', () => { expect(CreditNotesVoid.id).toBe('books credit-notes void') })
  it('requires id arg', () => { expect(CreditNotesVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesVoid.flags['dry-run']).toBeDefined() })
})

describe('books credit-notes draft', () => {
  it('has correct command id', () => { expect(CreditNotesDraft.id).toBe('books credit-notes draft') })
  it('requires id arg', () => { expect(CreditNotesDraft.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesDraft.flags['dry-run']).toBeDefined() })
})

describe('books credit-notes open', () => {
  it('has correct command id', () => { expect(CreditNotesOpen.id).toBe('books credit-notes open') })
  it('requires id arg', () => { expect(CreditNotesOpen.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesOpen.flags['dry-run']).toBeDefined() })
})

describe('books credit-notes approve', () => {
  it('has correct command id', () => { expect(CreditNotesApprove.id).toBe('books credit-notes approve') })
  it('requires id arg', () => { expect(CreditNotesApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CreditNotesApprove.flags['dry-run']).toBeDefined() })
})
