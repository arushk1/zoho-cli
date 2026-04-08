import { describe, it, expect } from 'vitest'
import ProjectsList from '../../../src/commands/people/timetracker/projects/list.js'
import ProjectsGet from '../../../src/commands/people/timetracker/projects/get.js'
import ProjectsAdd from '../../../src/commands/people/timetracker/projects/add.js'
import ProjectsUpdate from '../../../src/commands/people/timetracker/projects/update.js'
import ProjectsDelete from '../../../src/commands/people/timetracker/projects/delete.js'
import ProjectsStatus from '../../../src/commands/people/timetracker/projects/status.js'

describe('people timetracker projects list', () => {
  it('has correct command id', () => {
    expect(ProjectsList.id).toBe('people timetracker projects list')
  })

  it('has a summary', () => {
    expect(ProjectsList.summary).toBeTruthy()
  })
})

describe('people timetracker projects get', () => {
  it('has correct command id', () => {
    expect(ProjectsGet.id).toBe('people timetracker projects get')
  })

  it('has a summary', () => {
    expect(ProjectsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsGet.args.id.required).toBe(true)
  })
})

describe('people timetracker projects add', () => {
  it('has correct command id', () => {
    expect(ProjectsAdd.id).toBe('people timetracker projects add')
  })

  it('has a summary', () => {
    expect(ProjectsAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(ProjectsAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker projects update', () => {
  it('has correct command id', () => {
    expect(ProjectsUpdate.id).toBe('people timetracker projects update')
  })

  it('has a summary', () => {
    expect(ProjectsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(ProjectsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker projects delete', () => {
  it('has correct command id', () => {
    expect(ProjectsDelete.id).toBe('people timetracker projects delete')
  })

  it('has a summary', () => {
    expect(ProjectsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsDelete.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker projects status', () => {
  it('has correct command id', () => {
    expect(ProjectsStatus.id).toBe('people timetracker projects status')
  })

  it('has a summary', () => {
    expect(ProjectsStatus.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsStatus.args.id.required).toBe(true)
  })

  it('requires --status flag', () => {
    expect(ProjectsStatus.flags.status.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsStatus.flags['dry-run']).toBeDefined()
  })
})
