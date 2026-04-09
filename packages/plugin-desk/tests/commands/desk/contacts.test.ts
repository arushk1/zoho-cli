import { describe, it, expect } from 'vitest'
import DeskContactsList from '../../../src/commands/desk/contacts/list.js'
import DeskContactsGet from '../../../src/commands/desk/contacts/get.js'
import DeskContactsCreate from '../../../src/commands/desk/contacts/create.js'
import DeskContactsUpdate from '../../../src/commands/desk/contacts/update.js'
import DeskContactsDelete from '../../../src/commands/desk/contacts/delete.js'
import DeskContactsSearch from '../../../src/commands/desk/contacts/search.js'
import DeskContactsCount from '../../../src/commands/desk/contacts/count.js'
import DeskContactsTickets from '../../../src/commands/desk/contacts/tickets.js'

describe('desk contacts list', () => {
  it('has correct command id', () => { expect(DeskContactsList.id).toBe('desk contacts list') })
  it('has summary', () => { expect(DeskContactsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskContactsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskContactsList.flags['per-page']).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskContactsList.flags['sort-by']).toBeDefined() })
  it('supports --sort-order flag', () => { expect(DeskContactsList.flags['sort-order']).toBeDefined() })
})

describe('desk contacts get', () => {
  it('has correct command id', () => { expect(DeskContactsGet.id).toBe('desk contacts get') })
  it('has summary', () => { expect(DeskContactsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskContactsGet.args.id.required).toBe(true) })
  it('supports --include flag', () => { expect(DeskContactsGet.flags.include).toBeDefined() })
})

describe('desk contacts create', () => {
  it('has correct command id', () => { expect(DeskContactsCreate.id).toBe('desk contacts create') })
  it('has summary', () => { expect(DeskContactsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskContactsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskContactsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk contacts update', () => {
  it('has correct command id', () => { expect(DeskContactsUpdate.id).toBe('desk contacts update') })
  it('has summary', () => { expect(DeskContactsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskContactsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskContactsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskContactsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk contacts delete', () => {
  it('has correct command id', () => { expect(DeskContactsDelete.id).toBe('desk contacts delete') })
  it('has summary', () => { expect(DeskContactsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskContactsDelete.args.id.required).toBe(true) })
})

describe('desk contacts search', () => {
  it('has correct command id', () => { expect(DeskContactsSearch.id).toBe('desk contacts search') })
  it('has summary', () => { expect(DeskContactsSearch.summary).toBeDefined() })
  it('requires --query flag', () => { expect(DeskContactsSearch.flags.query.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskContactsSearch.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskContactsSearch.flags['per-page']).toBeDefined() })
})

describe('desk contacts count', () => {
  it('has correct command id', () => { expect(DeskContactsCount.id).toBe('desk contacts count') })
  it('has summary', () => { expect(DeskContactsCount.summary).toBeDefined() })
})

describe('desk contacts tickets', () => {
  it('has correct command id', () => { expect(DeskContactsTickets.id).toBe('desk contacts tickets') })
  it('has summary', () => { expect(DeskContactsTickets.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskContactsTickets.args.id.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskContactsTickets.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskContactsTickets.flags['per-page']).toBeDefined() })
})
