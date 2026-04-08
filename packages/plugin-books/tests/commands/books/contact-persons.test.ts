import { describe, it, expect } from 'vitest'
import ContactPersonsList from '../../../src/commands/books/contact-persons/list.js'
import ContactPersonsGet from '../../../src/commands/books/contact-persons/get.js'
import ContactPersonsCreate from '../../../src/commands/books/contact-persons/create.js'
import ContactPersonsUpdate from '../../../src/commands/books/contact-persons/update.js'
import ContactPersonsDelete from '../../../src/commands/books/contact-persons/delete.js'

describe('books contact-persons list', () => {
  it('has correct command id', () => { expect(ContactPersonsList.id).toBe('books contact-persons list') })
  it('requires contact-id arg', () => { expect(ContactPersonsList.args['contact-id'].required).toBe(true) })
  it('supports --page flag', () => { expect(ContactPersonsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ContactPersonsList.flags['per-page']).toBeDefined() })
})

describe('books contact-persons get', () => {
  it('has correct command id', () => { expect(ContactPersonsGet.id).toBe('books contact-persons get') })
  it('requires contact-id arg', () => { expect(ContactPersonsGet.args['contact-id'].required).toBe(true) })
  it('requires id arg', () => { expect(ContactPersonsGet.args.id.required).toBe(true) })
})

describe('books contact-persons create', () => {
  it('has correct command id', () => { expect(ContactPersonsCreate.id).toBe('books contact-persons create') })
  it('requires contact-id arg', () => { expect(ContactPersonsCreate.args['contact-id'].required).toBe(true) })
  it('requires --data flag', () => { expect(ContactPersonsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactPersonsCreate.flags['dry-run']).toBeDefined() })
})

describe('books contact-persons update', () => {
  it('has correct command id', () => { expect(ContactPersonsUpdate.id).toBe('books contact-persons update') })
  it('requires id arg', () => { expect(ContactPersonsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ContactPersonsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactPersonsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books contact-persons delete', () => {
  it('has correct command id', () => { expect(ContactPersonsDelete.id).toBe('books contact-persons delete') })
  it('requires id arg', () => { expect(ContactPersonsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ContactPersonsDelete.flags['dry-run']).toBeDefined() })
})
