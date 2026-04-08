import { describe, it, expect } from 'vitest'
import UsersList from '../../../src/commands/expense/users/list.js'
import UsersGet from '../../../src/commands/expense/users/get.js'
import UsersCreate from '../../../src/commands/expense/users/create.js'
import UsersUpdate from '../../../src/commands/expense/users/update.js'
import UsersDelete from '../../../src/commands/expense/users/delete.js'
import UsersActivate from '../../../src/commands/expense/users/activate.js'
import UsersDeactivate from '../../../src/commands/expense/users/deactivate.js'
import UsersAssignRole from '../../../src/commands/expense/users/assign-role.js'

describe('expense users list', () => {
  it('has correct command id', () => { expect(UsersList.id).toBe('expense users list') })
  it('supports --page flag', () => { expect(UsersList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(UsersList.flags['per-page']).toBeDefined() })
})

describe('expense users get', () => {
  it('has correct command id', () => { expect(UsersGet.id).toBe('expense users get') })
  it('requires id arg', () => { expect(UsersGet.args.id.required).toBe(true) })
})

describe('expense users create', () => {
  it('has correct command id', () => { expect(UsersCreate.id).toBe('expense users create') })
  it('requires --data flag', () => { expect(UsersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersCreate.flags['dry-run']).toBeDefined() })
})

describe('expense users update', () => {
  it('has correct command id', () => { expect(UsersUpdate.id).toBe('expense users update') })
  it('requires id arg', () => { expect(UsersUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(UsersUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense users delete', () => {
  it('has correct command id', () => { expect(UsersDelete.id).toBe('expense users delete') })
  it('requires id arg', () => { expect(UsersDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersDelete.flags['dry-run']).toBeDefined() })
})

describe('expense users activate', () => {
  it('has correct command id', () => { expect(UsersActivate.id).toBe('expense users activate') })
  it('requires id arg', () => { expect(UsersActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersActivate.flags['dry-run']).toBeDefined() })
})

describe('expense users deactivate', () => {
  it('has correct command id', () => { expect(UsersDeactivate.id).toBe('expense users deactivate') })
  it('requires id arg', () => { expect(UsersDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersDeactivate.flags['dry-run']).toBeDefined() })
})

describe('expense users assign-role', () => {
  it('has correct command id', () => { expect(UsersAssignRole.id).toBe('expense users assign-role') })
  it('requires user-id arg', () => { expect(UsersAssignRole.args['user-id'].required).toBe(true) })
  it('requires role-id arg', () => { expect(UsersAssignRole.args['role-id'].required).toBe(true) })
  it('supports --dry-run flag', () => { expect(UsersAssignRole.flags['dry-run']).toBeDefined() })
})
