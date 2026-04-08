import { describe, it, expect } from 'vitest'
import PayrollReport from '../../../src/commands/people/timetracker/payroll-report.js'

describe('people timetracker payroll-report', () => {
  it('has correct command id', () => {
    expect(PayrollReport.id).toBe('people timetracker payroll-report')
  })

  it('has a summary', () => {
    expect(PayrollReport.summary).toBeTruthy()
  })

  it('requires --from flag', () => {
    expect(PayrollReport.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(PayrollReport.flags.to.required).toBe(true)
  })
})
