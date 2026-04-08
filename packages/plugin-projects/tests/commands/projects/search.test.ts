import { describe, it, expect } from 'vitest'
import Search from '../../../src/commands/projects/search.js'

describe('projects search', () => {
  it('has correct command metadata', () => {
    expect(Search.id).toBe('projects search')
  })

  it('has a summary', () => {
    expect(Search.summary).toBeTruthy()
  })

  it('requires --query flag', () => {
    expect(Search.flags.query.required).toBe(true)
  })

  it('--query flag has -q shorthand', () => {
    expect((Search.flags.query as any).char).toBe('q')
  })

  it('supports --project flag (optional)', () => {
    expect(Search.flags.project).toBeDefined()
  })

  it('--project flag is not required', () => {
    expect(Search.flags.project.required).toBeFalsy()
  })

  it('--project flag has -p shorthand', () => {
    expect((Search.flags.project as any).char).toBe('p')
  })

  it('supports --module flag', () => {
    expect(Search.flags.module).toBeDefined()
  })

  it('--module has valid options', () => {
    const options = (Search.flags.module as any).options
    expect(options).toContain('tasks')
    expect(options).toContain('projects')
    expect(options).toContain('milestones')
    expect(options).toContain('tasklists')
  })

  it('supports --page flag', () => {
    expect(Search.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((Search.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(Search.flags['per-page']).toBeDefined()
  })
})
