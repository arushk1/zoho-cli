import { describe, it, expect } from 'vitest'
import BankAccountsList from '../../../src/commands/books/bank-accounts/list.js'
import BankAccountsGet from '../../../src/commands/books/bank-accounts/get.js'
import BankAccountsCreate from '../../../src/commands/books/bank-accounts/create.js'
import BankAccountsUpdate from '../../../src/commands/books/bank-accounts/update.js'
import BankAccountsDelete from '../../../src/commands/books/bank-accounts/delete.js'
import BankAccountsActivate from '../../../src/commands/books/bank-accounts/activate.js'
import BankAccountsDeactivate from '../../../src/commands/books/bank-accounts/deactivate.js'

describe('books bank-accounts list', () => {
  it('has correct command id', () => { expect(BankAccountsList.id).toBe('books bank-accounts list') })
  it('supports --page flag', () => { expect(BankAccountsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BankAccountsList.flags['per-page']).toBeDefined() })
})

describe('books bank-accounts get', () => {
  it('has correct command id', () => { expect(BankAccountsGet.id).toBe('books bank-accounts get') })
  it('requires id arg', () => { expect(BankAccountsGet.args.id.required).toBe(true) })
})

describe('books bank-accounts create', () => {
  it('has correct command id', () => { expect(BankAccountsCreate.id).toBe('books bank-accounts create') })
  it('requires --data flag', () => { expect(BankAccountsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BankAccountsCreate.flags['dry-run']).toBeDefined() })
})

describe('books bank-accounts update', () => {
  it('has correct command id', () => { expect(BankAccountsUpdate.id).toBe('books bank-accounts update') })
  it('requires id arg', () => { expect(BankAccountsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BankAccountsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BankAccountsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books bank-accounts delete', () => {
  it('has correct command id', () => { expect(BankAccountsDelete.id).toBe('books bank-accounts delete') })
  it('requires id arg', () => { expect(BankAccountsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BankAccountsDelete.flags['dry-run']).toBeDefined() })
})

describe('books bank-accounts activate', () => {
  it('has correct command id', () => { expect(BankAccountsActivate.id).toBe('books bank-accounts activate') })
  it('requires id arg', () => { expect(BankAccountsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BankAccountsActivate.flags['dry-run']).toBeDefined() })
})

describe('books bank-accounts deactivate', () => {
  it('has correct command id', () => { expect(BankAccountsDeactivate.id).toBe('books bank-accounts deactivate') })
  it('requires id arg', () => { expect(BankAccountsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BankAccountsDeactivate.flags['dry-run']).toBeDefined() })
})
