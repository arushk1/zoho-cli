import { describe, it, expect } from 'vitest'
import UsersList from '../../../src/commands/projects/users/list.js'
import UsersGet from '../../../src/commands/projects/users/get.js'
import UsersAdd from '../../../src/commands/projects/users/add.js'
import UsersUpdate from '../../../src/commands/projects/users/update.js'
import UsersActivate from '../../../src/commands/projects/users/activate.js'
import UsersDeactivate from '../../../src/commands/projects/users/deactivate.js'

describe('projects users list', () => {
  it('has correct command metadata', () => {
    expect(UsersList.id).toBe('projects users list')
  })

  it('has a summary', () => {
    expect(UsersList.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(UsersList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((UsersList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(UsersList.flags['per-page']).toBeDefined()
  })
})

describe('projects users get', () => {
  it('has correct command metadata', () => {
    expect(UsersGet.id).toBe('projects users get')
  })

  it('has a summary', () => {
    expect(UsersGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(UsersGet.args.id.required).toBe(true)
  })
})

describe('projects users add', () => {
  it('has correct command metadata', () => {
    expect(UsersAdd.id).toBe('projects users add')
  })

  it('has a summary', () => {
    expect(UsersAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(UsersAdd.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((UsersAdd.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(UsersAdd.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((UsersAdd.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects users update', () => {
  it('has correct command metadata', () => {
    expect(UsersUpdate.id).toBe('projects users update')
  })

  it('has a summary', () => {
    expect(UsersUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(UsersUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(UsersUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((UsersUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(UsersUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((UsersUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects users activate', () => {
  it('has correct command metadata', () => {
    expect(UsersActivate.id).toBe('projects users activate')
  })

  it('has a summary', () => {
    expect(UsersActivate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(UsersActivate.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(UsersActivate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((UsersActivate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects users deactivate', () => {
  it('has correct command metadata', () => {
    expect(UsersDeactivate.id).toBe('projects users deactivate')
  })

  it('has a summary', () => {
    expect(UsersDeactivate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(UsersDeactivate.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(UsersDeactivate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((UsersDeactivate.flags['dry-run'] as any).default).toBe(false)
  })
})
