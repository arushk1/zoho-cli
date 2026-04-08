import { describe, it, expect } from 'vitest'
import ChartOfAccountsList from '../../../src/commands/books/chart-of-accounts/list.js'
import ChartOfAccountsGet from '../../../src/commands/books/chart-of-accounts/get.js'
import ChartOfAccountsCreate from '../../../src/commands/books/chart-of-accounts/create.js'
import ChartOfAccountsUpdate from '../../../src/commands/books/chart-of-accounts/update.js'
import ChartOfAccountsDelete from '../../../src/commands/books/chart-of-accounts/delete.js'
import ChartOfAccountsActivate from '../../../src/commands/books/chart-of-accounts/activate.js'
import ChartOfAccountsDeactivate from '../../../src/commands/books/chart-of-accounts/deactivate.js'

describe('books chart-of-accounts list', () => {
  it('has correct command id', () => { expect(ChartOfAccountsList.id).toBe('books chart-of-accounts list') })
  it('supports --page flag', () => { expect(ChartOfAccountsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ChartOfAccountsList.flags['per-page']).toBeDefined() })
})

describe('books chart-of-accounts get', () => {
  it('has correct command id', () => { expect(ChartOfAccountsGet.id).toBe('books chart-of-accounts get') })
  it('requires id arg', () => { expect(ChartOfAccountsGet.args.id.required).toBe(true) })
})

describe('books chart-of-accounts create', () => {
  it('has correct command id', () => { expect(ChartOfAccountsCreate.id).toBe('books chart-of-accounts create') })
  it('requires --data flag', () => { expect(ChartOfAccountsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ChartOfAccountsCreate.flags['dry-run']).toBeDefined() })
})

describe('books chart-of-accounts update', () => {
  it('has correct command id', () => { expect(ChartOfAccountsUpdate.id).toBe('books chart-of-accounts update') })
  it('requires id arg', () => { expect(ChartOfAccountsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ChartOfAccountsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ChartOfAccountsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books chart-of-accounts delete', () => {
  it('has correct command id', () => { expect(ChartOfAccountsDelete.id).toBe('books chart-of-accounts delete') })
  it('requires id arg', () => { expect(ChartOfAccountsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ChartOfAccountsDelete.flags['dry-run']).toBeDefined() })
})

describe('books chart-of-accounts activate', () => {
  it('has correct command id', () => { expect(ChartOfAccountsActivate.id).toBe('books chart-of-accounts activate') })
  it('requires id arg', () => { expect(ChartOfAccountsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ChartOfAccountsActivate.flags['dry-run']).toBeDefined() })
})

describe('books chart-of-accounts deactivate', () => {
  it('has correct command id', () => { expect(ChartOfAccountsDeactivate.id).toBe('books chart-of-accounts deactivate') })
  it('requires id arg', () => { expect(ChartOfAccountsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ChartOfAccountsDeactivate.flags['dry-run']).toBeDefined() })
})
