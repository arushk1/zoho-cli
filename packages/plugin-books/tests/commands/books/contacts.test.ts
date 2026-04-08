import { describe, it, expect } from 'vitest'
import ContactsList from '../../../src/commands/books/contacts/list.js'
import ContactsGet from '../../../src/commands/books/contacts/get.js'
import ContactsCreate from '../../../src/commands/books/contacts/create.js'
import ContactsUpdate from '../../../src/commands/books/contacts/update.js'
import ContactsDelete from '../../../src/commands/books/contacts/delete.js'
import ContactsActivate from '../../../src/commands/books/contacts/activate.js'
import ContactsDeactivate from '../../../src/commands/books/contacts/deactivate.js'

describe('books contacts list', () => {
  it('has correct command id', () => { expect(ContactsList.id).toBe('books contacts list') })
  it('supports --page flag', () => { expect(ContactsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ContactsList.flags['per-page']).toBeDefined() })
  it('supports --contact-type filter', () => { expect(ContactsList.flags['contact-type']).toBeDefined() })
})

describe('books contacts get', () => {
  it('has correct command id', () => { expect(ContactsGet.id).toBe('books contacts get') })
  it('requires id arg', () => { expect(ContactsGet.args.id.required).toBe(true) })
})

describe('books contacts create', () => {
  it('has correct command id', () => { expect(ContactsCreate.id).toBe('books contacts create') })
  it('requires --data flag', () => { expect(ContactsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactsCreate.flags['dry-run']).toBeDefined() })
})

describe('books contacts update', () => {
  it('has correct command id', () => { expect(ContactsUpdate.id).toBe('books contacts update') })
  it('requires id arg', () => { expect(ContactsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ContactsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books contacts delete', () => {
  it('has correct command id', () => { expect(ContactsDelete.id).toBe('books contacts delete') })
  it('requires id arg', () => { expect(ContactsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactsDelete.flags['dry-run']).toBeDefined() })
})

describe('books contacts activate', () => {
  it('has correct command id', () => { expect(ContactsActivate.id).toBe('books contacts activate') })
  it('requires id arg', () => { expect(ContactsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactsActivate.flags['dry-run']).toBeDefined() })
})

describe('books contacts deactivate', () => {
  it('has correct command id', () => { expect(ContactsDeactivate.id).toBe('books contacts deactivate') })
  it('requires id arg', () => { expect(ContactsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactsDeactivate.flags['dry-run']).toBeDefined() })
})
