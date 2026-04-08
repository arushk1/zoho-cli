import { describe, it, expect } from 'vitest'
import UsersList from '../../../src/commands/books/users/list.js'
import UsersGet from '../../../src/commands/books/users/get.js'
import UsersCreate from '../../../src/commands/books/users/create.js'
import UsersUpdate from '../../../src/commands/books/users/update.js'
import UsersDelete from '../../../src/commands/books/users/delete.js'
import UsersMe from '../../../src/commands/books/users/me.js'
import UsersInvite from '../../../src/commands/books/users/invite.js'
import UsersActivate from '../../../src/commands/books/users/activate.js'
import UsersDeactivate from '../../../src/commands/books/users/deactivate.js'

describe('books users list', () => {
  it('has correct command id', () => { expect(UsersList.id).toBe('books users list') })
  it('supports --page flag', () => { expect(UsersList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(UsersList.flags['per-page']).toBeDefined() })
})

describe('books users get', () => {
  it('has correct command id', () => { expect(UsersGet.id).toBe('books users get') })
  it('requires id arg', () => { expect(UsersGet.args.id.required).toBe(true) })
})

describe('books users create', () => {
  it('has correct command id', () => { expect(UsersCreate.id).toBe('books users create') })
  it('requires --data flag', () => { expect(UsersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersCreate.flags['dry-run']).toBeDefined() })
})

describe('books users update', () => {
  it('has correct command id', () => { expect(UsersUpdate.id).toBe('books users update') })
  it('requires id arg', () => { expect(UsersUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(UsersUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersUpdate.flags['dry-run']).toBeDefined() })
})

describe('books users delete', () => {
  it('has correct command id', () => { expect(UsersDelete.id).toBe('books users delete') })
  it('requires id arg', () => { expect(UsersDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersDelete.flags['dry-run']).toBeDefined() })
})

describe('books users me', () => {
  it('has correct command id', () => { expect(UsersMe.id).toBe('books users me') })
})

describe('books users invite', () => {
  it('has correct command id', () => { expect(UsersInvite.id).toBe('books users invite') })
  it('requires id arg', () => { expect(UsersInvite.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersInvite.flags['dry-run']).toBeDefined() })
})

describe('books users activate', () => {
  it('has correct command id', () => { expect(UsersActivate.id).toBe('books users activate') })
  it('requires id arg', () => { expect(UsersActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersActivate.flags['dry-run']).toBeDefined() })
})

describe('books users deactivate', () => {
  it('has correct command id', () => { expect(UsersDeactivate.id).toBe('books users deactivate') })
  it('requires id arg', () => { expect(UsersDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersDeactivate.flags['dry-run']).toBeDefined() })
})
