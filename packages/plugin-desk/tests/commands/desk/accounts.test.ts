import { describe, it, expect } from 'vitest'
import DeskAccountsList from '../../../src/commands/desk/accounts/list.js'
import DeskAccountsGet from '../../../src/commands/desk/accounts/get.js'
import DeskAccountsCreate from '../../../src/commands/desk/accounts/create.js'
import DeskAccountsUpdate from '../../../src/commands/desk/accounts/update.js'
import DeskAccountsDelete from '../../../src/commands/desk/accounts/delete.js'
import DeskAccountsSearch from '../../../src/commands/desk/accounts/search.js'
import DeskAccountsCount from '../../../src/commands/desk/accounts/count.js'
import DeskAccountsTickets from '../../../src/commands/desk/accounts/tickets.js'

describe('desk accounts list', () => {
  it('has correct command id', () => { expect(DeskAccountsList.id).toBe('desk accounts list') })
  it('has summary', () => { expect(DeskAccountsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskAccountsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskAccountsList.flags['per-page']).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskAccountsList.flags['sort-by']).toBeDefined() })
  it('supports --sort-order flag', () => { expect(DeskAccountsList.flags['sort-order']).toBeDefined() })
})

describe('desk accounts get', () => {
  it('has correct command id', () => { expect(DeskAccountsGet.id).toBe('desk accounts get') })
  it('has summary', () => { expect(DeskAccountsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAccountsGet.args.id.required).toBe(true) })
  it('supports --include flag', () => { expect(DeskAccountsGet.flags.include).toBeDefined() })
})

describe('desk accounts create', () => {
  it('has correct command id', () => { expect(DeskAccountsCreate.id).toBe('desk accounts create') })
  it('has summary', () => { expect(DeskAccountsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskAccountsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskAccountsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk accounts update', () => {
  it('has correct command id', () => { expect(DeskAccountsUpdate.id).toBe('desk accounts update') })
  it('has summary', () => { expect(DeskAccountsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAccountsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskAccountsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskAccountsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk accounts delete', () => {
  it('has correct command id', () => { expect(DeskAccountsDelete.id).toBe('desk accounts delete') })
  it('has summary', () => { expect(DeskAccountsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAccountsDelete.args.id.required).toBe(true) })
})

describe('desk accounts search', () => {
  it('has correct command id', () => { expect(DeskAccountsSearch.id).toBe('desk accounts search') })
  it('has summary', () => { expect(DeskAccountsSearch.summary).toBeDefined() })
  it('requires --query flag', () => { expect(DeskAccountsSearch.flags.query.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskAccountsSearch.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskAccountsSearch.flags['per-page']).toBeDefined() })
})

describe('desk accounts count', () => {
  it('has correct command id', () => { expect(DeskAccountsCount.id).toBe('desk accounts count') })
  it('has summary', () => { expect(DeskAccountsCount.summary).toBeDefined() })
})

describe('desk accounts tickets', () => {
  it('has correct command id', () => { expect(DeskAccountsTickets.id).toBe('desk accounts tickets') })
  it('has summary', () => { expect(DeskAccountsTickets.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAccountsTickets.args.id.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskAccountsTickets.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskAccountsTickets.flags['per-page']).toBeDefined() })
})
