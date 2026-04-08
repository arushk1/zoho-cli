import { describe, it, expect } from 'vitest'
import AttendanceCheckin from '../../../src/commands/people/attendance/checkin.js'
import AttendanceCheckout from '../../../src/commands/people/attendance/checkout.js'
import AttendanceEntries from '../../../src/commands/people/attendance/entries.js'
import AttendanceReport from '../../../src/commands/people/attendance/report.js'
import AttendanceBulkImport from '../../../src/commands/people/attendance/bulk-import.js'
import AttendanceShiftConfig from '../../../src/commands/people/attendance/shift-config.js'
import AttendanceShiftUpdate from '../../../src/commands/people/attendance/shift-update.js'
import AttendanceRegularization from '../../../src/commands/people/attendance/regularization.js'
import AttendanceLatest from '../../../src/commands/people/attendance/latest.js'

describe('people attendance checkin', () => {
  it('has correct command id', () => {
    expect(AttendanceCheckin.id).toBe('people attendance checkin')
  })

  it('has a summary', () => {
    expect(AttendanceCheckin.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(AttendanceCheckin.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AttendanceCheckin.flags['dry-run']).toBeDefined()
  })
})

describe('people attendance checkout', () => {
  it('has correct command id', () => {
    expect(AttendanceCheckout.id).toBe('people attendance checkout')
  })

  it('has a summary', () => {
    expect(AttendanceCheckout.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(AttendanceCheckout.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AttendanceCheckout.flags['dry-run']).toBeDefined()
  })
})

describe('people attendance entries', () => {
  it('has correct command id', () => {
    expect(AttendanceEntries.id).toBe('people attendance entries')
  })

  it('has a summary', () => {
    expect(AttendanceEntries.summary).toBeTruthy()
  })

  it('supports --date flag', () => {
    expect(AttendanceEntries.flags.date).toBeDefined()
  })

  it('supports --employee flag', () => {
    expect(AttendanceEntries.flags.employee).toBeDefined()
  })
})

describe('people attendance report', () => {
  it('has correct command id', () => {
    expect(AttendanceReport.id).toBe('people attendance report')
  })

  it('has a summary', () => {
    expect(AttendanceReport.summary).toBeTruthy()
  })

  it('requires --from flag', () => {
    expect(AttendanceReport.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(AttendanceReport.flags.to.required).toBe(true)
  })

  it('supports --employee flag', () => {
    expect(AttendanceReport.flags.employee).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(AttendanceReport.flags.page).toBeDefined()
  })
})

describe('people attendance bulk-import', () => {
  it('has correct command id', () => {
    expect(AttendanceBulkImport.id).toBe('people attendance bulk-import')
  })

  it('has a summary', () => {
    expect(AttendanceBulkImport.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(AttendanceBulkImport.flags.data.required).toBe(true)
  })

  it('supports --date-format flag', () => {
    expect(AttendanceBulkImport.flags['date-format']).toBeDefined()
  })

  it('supports --dry-run flag', () => {
    expect(AttendanceBulkImport.flags['dry-run']).toBeDefined()
  })
})

describe('people attendance shift-config', () => {
  it('has correct command id', () => {
    expect(AttendanceShiftConfig.id).toBe('people attendance shift-config')
  })

  it('has a summary', () => {
    expect(AttendanceShiftConfig.summary).toBeTruthy()
  })

  it('requires --employee flag', () => {
    expect(AttendanceShiftConfig.flags.employee.required).toBe(true)
  })

  it('supports --from flag', () => {
    expect(AttendanceShiftConfig.flags.from).toBeDefined()
  })

  it('supports --to flag', () => {
    expect(AttendanceShiftConfig.flags.to).toBeDefined()
  })
})

describe('people attendance shift-update', () => {
  it('has correct command id', () => {
    expect(AttendanceShiftUpdate.id).toBe('people attendance shift-update')
  })

  it('has a summary', () => {
    expect(AttendanceShiftUpdate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(AttendanceShiftUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AttendanceShiftUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people attendance regularization', () => {
  it('has correct command id', () => {
    expect(AttendanceRegularization.id).toBe('people attendance regularization')
  })

  it('has a summary', () => {
    expect(AttendanceRegularization.summary).toBeTruthy()
  })

  it('supports --from flag', () => {
    expect(AttendanceRegularization.flags.from).toBeDefined()
  })

  it('supports --to flag', () => {
    expect(AttendanceRegularization.flags.to).toBeDefined()
  })

  it('supports --employee flag', () => {
    expect(AttendanceRegularization.flags.employee).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(AttendanceRegularization.flags.page).toBeDefined()
  })
})

describe('people attendance latest', () => {
  it('has correct command id', () => {
    expect(AttendanceLatest.id).toBe('people attendance latest')
  })

  it('has a summary', () => {
    expect(AttendanceLatest.summary).toBeTruthy()
  })

  it('supports --duration flag', () => {
    expect(AttendanceLatest.flags.duration).toBeDefined()
  })
})
