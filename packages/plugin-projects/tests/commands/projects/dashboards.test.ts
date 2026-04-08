import { describe, it, expect } from 'vitest'
import DashboardsList from '../../../src/commands/projects/dashboards/list.js'
import DashboardsGet from '../../../src/commands/projects/dashboards/get.js'
import DashboardsCreate from '../../../src/commands/projects/dashboards/create.js'
import DashboardsUpdate from '../../../src/commands/projects/dashboards/update.js'
import DashboardsDelete from '../../../src/commands/projects/dashboards/delete.js'

describe('projects dashboards list', () => {
  it('has correct command metadata', () => {
    expect(DashboardsList.id).toBe('projects dashboards list')
  })

  it('has a summary', () => {
    expect(DashboardsList.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(DashboardsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((DashboardsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(DashboardsList.flags['per-page']).toBeDefined()
  })
})

describe('projects dashboards get', () => {
  it('has correct command metadata', () => {
    expect(DashboardsGet.id).toBe('projects dashboards get')
  })

  it('has a summary', () => {
    expect(DashboardsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(DashboardsGet.args.id.required).toBe(true)
  })
})

describe('projects dashboards create', () => {
  it('has correct command metadata', () => {
    expect(DashboardsCreate.id).toBe('projects dashboards create')
  })

  it('has a summary', () => {
    expect(DashboardsCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(DashboardsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((DashboardsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(DashboardsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((DashboardsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects dashboards update', () => {
  it('has correct command metadata', () => {
    expect(DashboardsUpdate.id).toBe('projects dashboards update')
  })

  it('has a summary', () => {
    expect(DashboardsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(DashboardsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(DashboardsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((DashboardsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(DashboardsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((DashboardsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects dashboards delete', () => {
  it('has correct command metadata', () => {
    expect(DashboardsDelete.id).toBe('projects dashboards delete')
  })

  it('has a summary', () => {
    expect(DashboardsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(DashboardsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(DashboardsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((DashboardsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
