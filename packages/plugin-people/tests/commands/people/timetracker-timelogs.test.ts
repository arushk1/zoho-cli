import { describe, it, expect } from 'vitest'
import TimelogsList from '../../../src/commands/people/timetracker/timelogs/list.js'
import TimelogsGet from '../../../src/commands/people/timetracker/timelogs/get.js'
import TimelogsAdd from '../../../src/commands/people/timetracker/timelogs/add.js'
import TimelogsUpdate from '../../../src/commands/people/timetracker/timelogs/update.js'
import TimelogsDelete from '../../../src/commands/people/timetracker/timelogs/delete.js'
import TimelogsBulk from '../../../src/commands/people/timetracker/timelogs/bulk.js'

describe('people timetracker timelogs list', () => {
  it('has correct command id', () => {
    expect(TimelogsList.id).toBe('people timetracker timelogs list')
  })

  it('has a summary', () => {
    expect(TimelogsList.summary).toBeTruthy()
  })

  it('requires --user flag', () => {
    expect(TimelogsList.flags.user.required).toBe(true)
  })
})

describe('people timetracker timelogs get', () => {
  it('has correct command id', () => {
    expect(TimelogsGet.id).toBe('people timetracker timelogs get')
  })

  it('has a summary', () => {
    expect(TimelogsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimelogsGet.args.id.required).toBe(true)
  })
})

describe('people timetracker timelogs add', () => {
  it('has correct command id', () => {
    expect(TimelogsAdd.id).toBe('people timetracker timelogs add')
  })

  it('has a summary', () => {
    expect(TimelogsAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TimelogsAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimelogsAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker timelogs update', () => {
  it('has correct command id', () => {
    expect(TimelogsUpdate.id).toBe('people timetracker timelogs update')
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
})

describe('people timetracker timelogs delete', () => {
  it('has correct command id', () => {
    expect(TimelogsDelete.id).toBe('people timetracker timelogs delete')
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
})

describe('people timetracker timelogs bulk', () => {
  it('has correct command id', () => {
    expect(TimelogsBulk.id).toBe('people timetracker timelogs bulk')
  })

  it('has a summary', () => {
    expect(TimelogsBulk.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TimelogsBulk.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimelogsBulk.flags['dry-run']).toBeDefined()
  })
})
