import { describe, it, expect } from 'vitest'
import TimelogsList from '../../../src/commands/projects/timelogs/list.js'
import TimelogsGet from '../../../src/commands/projects/timelogs/get.js'
import TimelogsCreate from '../../../src/commands/projects/timelogs/create.js'
import TimelogsUpdate from '../../../src/commands/projects/timelogs/update.js'
import TimelogsDelete from '../../../src/commands/projects/timelogs/delete.js'

describe('projects timelogs list', () => {
  it('has correct command metadata', () => {
    expect(TimelogsList.id).toBe('projects timelogs list')
  })

  it('has a summary', () => {
    expect(TimelogsList.summary).toBeTruthy()
  })

  it('supports --project flag (optional)', () => {
    expect(TimelogsList.flags.project).toBeDefined()
  })

  it('--project flag is not required', () => {
    expect(TimelogsList.flags.project.required).toBeFalsy()
  })

  it('supports --page flag', () => {
    expect(TimelogsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((TimelogsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(TimelogsList.flags['per-page']).toBeDefined()
  })

  it('supports --users filter flag', () => {
    expect(TimelogsList.flags.users).toBeDefined()
  })

  it('supports --bill-status filter flag', () => {
    expect(TimelogsList.flags['bill-status']).toBeDefined()
  })

  it('supports --component-type filter flag', () => {
    expect(TimelogsList.flags['component-type']).toBeDefined()
  })

  it('supports --view-type flag', () => {
    expect(TimelogsList.flags['view-type']).toBeDefined()
  })
})

describe('projects timelogs get', () => {
  it('has correct command metadata', () => {
    expect(TimelogsGet.id).toBe('projects timelogs get')
  })

  it('has a summary', () => {
    expect(TimelogsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimelogsGet.args.id.required).toBe(true)
  })
})

describe('projects timelogs create', () => {
  it('has correct command metadata', () => {
    expect(TimelogsCreate.id).toBe('projects timelogs create')
  })

  it('has a summary', () => {
    expect(TimelogsCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TimelogsCreate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimelogsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimelogsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects timelogs update', () => {
  it('has correct command metadata', () => {
    expect(TimelogsUpdate.id).toBe('projects timelogs update')
  })

  it('has a summary', () => {
    expect(TimelogsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimelogsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TimelogsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimelogsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimelogsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects timelogs delete', () => {
  it('has correct command metadata', () => {
    expect(TimelogsDelete.id).toBe('projects timelogs delete')
  })

  it('has a summary', () => {
    expect(TimelogsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimelogsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimelogsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimelogsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
