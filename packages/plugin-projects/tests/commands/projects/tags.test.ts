import { describe, it, expect } from 'vitest'
import TagsList from '../../../src/commands/projects/tags/list.js'
import TagsCreate from '../../../src/commands/projects/tags/create.js'
import TagsUpdate from '../../../src/commands/projects/tags/update.js'
import TagsDelete from '../../../src/commands/projects/tags/delete.js'
import TagsAssociate from '../../../src/commands/projects/tags/associate.js'
import TagsDissociate from '../../../src/commands/projects/tags/dissociate.js'

describe('projects tags list', () => {
  it('has correct command metadata', () => {
    expect(TagsList.id).toBe('projects tags list')
  })

  it('has a summary', () => {
    expect(TagsList.summary).toBeTruthy()
  })
})

describe('projects tags create', () => {
  it('has correct command metadata', () => {
    expect(TagsCreate.id).toBe('projects tags create')
  })

  it('has a summary', () => {
    expect(TagsCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TagsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TagsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TagsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TagsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tags update', () => {
  it('has correct command metadata', () => {
    expect(TagsUpdate.id).toBe('projects tags update')
  })

  it('has a summary', () => {
    expect(TagsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TagsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TagsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TagsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TagsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TagsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tags delete', () => {
  it('has correct command metadata', () => {
    expect(TagsDelete.id).toBe('projects tags delete')
  })

  it('has a summary', () => {
    expect(TagsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TagsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TagsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TagsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tags associate', () => {
  it('has correct command metadata', () => {
    expect(TagsAssociate.id).toBe('projects tags associate')
  })

  it('has a summary', () => {
    expect(TagsAssociate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TagsAssociate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TagsAssociate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TagsAssociate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TagsAssociate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TagsAssociate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tags dissociate', () => {
  it('has correct command metadata', () => {
    expect(TagsDissociate.id).toBe('projects tags dissociate')
  })

  it('has a summary', () => {
    expect(TagsDissociate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TagsDissociate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TagsDissociate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TagsDissociate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TagsDissociate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TagsDissociate.flags['dry-run'] as any).default).toBe(false)
  })
})
