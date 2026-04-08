import { describe, it, expect } from 'vitest'
import TimesheetsList from '../../../src/commands/people/timetracker/timesheets/list.js'
import TimesheetsGet from '../../../src/commands/people/timetracker/timesheets/get.js'
import TimesheetsCreate from '../../../src/commands/people/timetracker/timesheets/create.js'
import TimesheetsUpdate from '../../../src/commands/people/timetracker/timesheets/update.js'
import TimesheetsDelete from '../../../src/commands/people/timetracker/timesheets/delete.js'
import TimesheetsApprove from '../../../src/commands/people/timetracker/timesheets/approve.js'

describe('people timetracker timesheets list', () => {
  it('has correct command id', () => {
    expect(TimesheetsList.id).toBe('people timetracker timesheets list')
  })

  it('has a summary', () => {
    expect(TimesheetsList.summary).toBeTruthy()
  })

  it('requires --user flag', () => {
    expect(TimesheetsList.flags.user.required).toBe(true)
  })
})

describe('people timetracker timesheets get', () => {
  it('has correct command id', () => {
    expect(TimesheetsGet.id).toBe('people timetracker timesheets get')
  })

  it('has a summary', () => {
    expect(TimesheetsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimesheetsGet.args.id.required).toBe(true)
  })
})

describe('people timetracker timesheets create', () => {
  it('has correct command id', () => {
    expect(TimesheetsCreate.id).toBe('people timetracker timesheets create')
  })

  it('has a summary', () => {
    expect(TimesheetsCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TimesheetsCreate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimesheetsCreate.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker timesheets update', () => {
  it('has correct command id', () => {
    expect(TimesheetsUpdate.id).toBe('people timetracker timesheets update')
  })

  it('has a summary', () => {
    expect(TimesheetsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimesheetsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TimesheetsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimesheetsUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker timesheets delete', () => {
  it('has correct command id', () => {
    expect(TimesheetsDelete.id).toBe('people timetracker timesheets delete')
  })

  it('has a summary', () => {
    expect(TimesheetsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimesheetsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimesheetsDelete.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker timesheets approve', () => {
  it('has correct command id', () => {
    expect(TimesheetsApprove.id).toBe('people timetracker timesheets approve')
  })

  it('has a summary', () => {
    expect(TimesheetsApprove.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimesheetsApprove.args.id.required).toBe(true)
  })

  it('requires --status flag', () => {
    expect(TimesheetsApprove.flags.status.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimesheetsApprove.flags['dry-run']).toBeDefined()
  })
})
