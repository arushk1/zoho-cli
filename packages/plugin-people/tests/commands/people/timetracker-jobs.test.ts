import { describe, it, expect } from 'vitest'
import JobsList from '../../../src/commands/people/timetracker/jobs/list.js'
import JobsGet from '../../../src/commands/people/timetracker/jobs/get.js'
import JobsAdd from '../../../src/commands/people/timetracker/jobs/add.js'
import JobsUpdate from '../../../src/commands/people/timetracker/jobs/update.js'
import JobsDelete from '../../../src/commands/people/timetracker/jobs/delete.js'
import JobsStatus from '../../../src/commands/people/timetracker/jobs/status.js'

describe('people timetracker jobs list', () => {
  it('has correct command id', () => {
    expect(JobsList.id).toBe('people timetracker jobs list')
  })

  it('has a summary', () => {
    expect(JobsList.summary).toBeTruthy()
  })
})

describe('people timetracker jobs get', () => {
  it('has correct command id', () => {
    expect(JobsGet.id).toBe('people timetracker jobs get')
  })

  it('has a summary', () => {
    expect(JobsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(JobsGet.args.id.required).toBe(true)
  })
})

describe('people timetracker jobs add', () => {
  it('has correct command id', () => {
    expect(JobsAdd.id).toBe('people timetracker jobs add')
  })

  it('has a summary', () => {
    expect(JobsAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(JobsAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(JobsAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker jobs update', () => {
  it('has correct command id', () => {
    expect(JobsUpdate.id).toBe('people timetracker jobs update')
  })

  it('has a summary', () => {
    expect(JobsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(JobsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(JobsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(JobsUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker jobs delete', () => {
  it('has correct command id', () => {
    expect(JobsDelete.id).toBe('people timetracker jobs delete')
  })

  it('has a summary', () => {
    expect(JobsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(JobsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(JobsDelete.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker jobs status', () => {
  it('has correct command id', () => {
    expect(JobsStatus.id).toBe('people timetracker jobs status')
  })

  it('has a summary', () => {
    expect(JobsStatus.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(JobsStatus.args.id.required).toBe(true)
  })

  it('requires --status flag', () => {
    expect(JobsStatus.flags.status.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(JobsStatus.flags['dry-run']).toBeDefined()
  })
})
