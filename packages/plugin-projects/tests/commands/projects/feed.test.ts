import { describe, it, expect } from 'vitest'
import FeedList from '../../../src/commands/projects/feed/list.js'
import FeedCreate from '../../../src/commands/projects/feed/create.js'

describe('projects feed list', () => {
  it('has correct command metadata', () => {
    expect(FeedList.id).toBe('projects feed list')
  })

  it('has a summary', () => {
    expect(FeedList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(FeedList.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((FeedList.flags.project as any).char).toBe('p')
  })

  it('supports --page flag', () => {
    expect(FeedList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((FeedList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(FeedList.flags['per-page']).toBeDefined()
  })
})

describe('projects feed create', () => {
  it('has correct command metadata', () => {
    expect(FeedCreate.id).toBe('projects feed create')
  })

  it('has a summary', () => {
    expect(FeedCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(FeedCreate.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((FeedCreate.flags.project as any).char).toBe('p')
  })

  it('requires --data flag', () => {
    expect(FeedCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((FeedCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(FeedCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((FeedCreate.flags['dry-run'] as any).default).toBe(false)
  })
})
