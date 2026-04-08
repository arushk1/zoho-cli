import { describe, it, expect } from 'vitest'
import ForumsList from '../../../src/commands/projects/forums/list.js'
import ForumsGet from '../../../src/commands/projects/forums/get.js'
import ForumsCreate from '../../../src/commands/projects/forums/create.js'
import ForumsUpdate from '../../../src/commands/projects/forums/update.js'
import ForumsDelete from '../../../src/commands/projects/forums/delete.js'

describe('projects forums list', () => {
  it('has correct command metadata', () => {
    expect(ForumsList.id).toBe('projects forums list')
  })

  it('has a summary', () => {
    expect(ForumsList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(ForumsList.flags.project.required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(ForumsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((ForumsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(ForumsList.flags['per-page']).toBeDefined()
  })
})

describe('projects forums get', () => {
  it('has correct command metadata', () => {
    expect(ForumsGet.id).toBe('projects forums get')
  })

  it('has a summary', () => {
    expect(ForumsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ForumsGet.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(ForumsGet.flags.project.required).toBe(true)
  })
})

describe('projects forums create', () => {
  it('has correct command metadata', () => {
    expect(ForumsCreate.id).toBe('projects forums create')
  })

  it('has a summary', () => {
    expect(ForumsCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(ForumsCreate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(ForumsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((ForumsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(ForumsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((ForumsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects forums update', () => {
  it('has correct command metadata', () => {
    expect(ForumsUpdate.id).toBe('projects forums update')
  })

  it('has a summary', () => {
    expect(ForumsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ForumsUpdate.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(ForumsUpdate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(ForumsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((ForumsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(ForumsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((ForumsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects forums delete', () => {
  it('has correct command metadata', () => {
    expect(ForumsDelete.id).toBe('projects forums delete')
  })

  it('has a summary', () => {
    expect(ForumsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ForumsDelete.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(ForumsDelete.flags.project.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ForumsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((ForumsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
