import { describe, it, expect } from 'vitest'
import EventsList from '../../../src/commands/projects/events/list.js'
import EventsGet from '../../../src/commands/projects/events/get.js'
import EventsCreate from '../../../src/commands/projects/events/create.js'
import EventsUpdate from '../../../src/commands/projects/events/update.js'
import EventsDelete from '../../../src/commands/projects/events/delete.js'

describe('projects events list', () => {
  it('has correct command metadata', () => {
    expect(EventsList.id).toBe('projects events list')
  })

  it('has a summary', () => {
    expect(EventsList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(EventsList.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((EventsList.flags.project as any).char).toBe('p')
  })

  it('supports --page flag', () => {
    expect(EventsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((EventsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(EventsList.flags['per-page']).toBeDefined()
  })
})

describe('projects events get', () => {
  it('has correct command metadata', () => {
    expect(EventsGet.id).toBe('projects events get')
  })

  it('has a summary', () => {
    expect(EventsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(EventsGet.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(EventsGet.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((EventsGet.flags.project as any).char).toBe('p')
  })
})

describe('projects events create', () => {
  it('has correct command metadata', () => {
    expect(EventsCreate.id).toBe('projects events create')
  })

  it('has a summary', () => {
    expect(EventsCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(EventsCreate.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((EventsCreate.flags.project as any).char).toBe('p')
  })

  it('requires --data flag', () => {
    expect(EventsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((EventsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(EventsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((EventsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects events update', () => {
  it('has correct command metadata', () => {
    expect(EventsUpdate.id).toBe('projects events update')
  })

  it('has a summary', () => {
    expect(EventsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(EventsUpdate.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(EventsUpdate.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((EventsUpdate.flags.project as any).char).toBe('p')
  })

  it('requires --data flag', () => {
    expect(EventsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((EventsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(EventsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((EventsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects events delete', () => {
  it('has correct command metadata', () => {
    expect(EventsDelete.id).toBe('projects events delete')
  })

  it('has a summary', () => {
    expect(EventsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(EventsDelete.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(EventsDelete.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((EventsDelete.flags.project as any).char).toBe('p')
  })

  it('supports --dry-run flag', () => {
    expect(EventsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((EventsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
