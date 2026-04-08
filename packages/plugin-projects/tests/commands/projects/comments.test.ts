import { describe, it, expect } from 'vitest'
import CommentsList from '../../../src/commands/projects/comments/list.js'
import CommentsCreate from '../../../src/commands/projects/comments/create.js'
import CommentsUpdate from '../../../src/commands/projects/comments/update.js'
import CommentsDelete from '../../../src/commands/projects/comments/delete.js'

describe('projects comments list', () => {
  it('has correct command metadata', () => {
    expect(CommentsList.id).toBe('projects comments list')
  })

  it('has a summary', () => {
    expect(CommentsList.summary).toBeTruthy()
  })

  it('requires --entity-type flag', () => {
    expect(CommentsList.flags['entity-type'].required).toBe(true)
  })

  it('--entity-type has valid options', () => {
    const options = (CommentsList.flags['entity-type'] as any).options
    expect(options).toContain('tasks')
    expect(options).toContain('tasklists')
    expect(options).toContain('phases')
  })

  it('requires --entity-id flag', () => {
    expect(CommentsList.flags['entity-id'].required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(CommentsList.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(CommentsList.flags['per-page']).toBeDefined()
  })
})

describe('projects comments create', () => {
  it('has correct command metadata', () => {
    expect(CommentsCreate.id).toBe('projects comments create')
  })

  it('has a summary', () => {
    expect(CommentsCreate.summary).toBeTruthy()
  })

  it('requires --entity-type flag', () => {
    expect(CommentsCreate.flags['entity-type'].required).toBe(true)
  })

  it('requires --entity-id flag', () => {
    expect(CommentsCreate.flags['entity-id'].required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CommentsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((CommentsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(CommentsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((CommentsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects comments update', () => {
  it('has correct command metadata', () => {
    expect(CommentsUpdate.id).toBe('projects comments update')
  })

  it('has a summary', () => {
    expect(CommentsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(CommentsUpdate.args.id.required).toBe(true)
  })

  it('requires --entity-type flag', () => {
    expect(CommentsUpdate.flags['entity-type'].required).toBe(true)
  })

  it('requires --entity-id flag', () => {
    expect(CommentsUpdate.flags['entity-id'].required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CommentsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CommentsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((CommentsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects comments delete', () => {
  it('has correct command metadata', () => {
    expect(CommentsDelete.id).toBe('projects comments delete')
  })

  it('has a summary', () => {
    expect(CommentsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(CommentsDelete.args.id.required).toBe(true)
  })

  it('requires --entity-type flag', () => {
    expect(CommentsDelete.flags['entity-type'].required).toBe(true)
  })

  it('requires --entity-id flag', () => {
    expect(CommentsDelete.flags['entity-id'].required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CommentsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((CommentsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
