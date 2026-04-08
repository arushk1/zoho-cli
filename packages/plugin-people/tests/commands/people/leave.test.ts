import { describe, it, expect } from 'vitest'
import LeaveTypes from '../../../src/commands/people/leave/types.js'
import LeaveApply from '../../../src/commands/people/leave/apply.js'
import LeaveGet from '../../../src/commands/people/leave/get.js'
import LeaveList from '../../../src/commands/people/leave/list.js'
import LeaveCancel from '../../../src/commands/people/leave/cancel.js'
import LeaveBalance from '../../../src/commands/people/leave/balance.js'
import LeaveHolidays from '../../../src/commands/people/leave/holidays.js'
import LeaveUserReport from '../../../src/commands/people/leave/user-report.js'
import LeaveBookedReport from '../../../src/commands/people/leave/booked-report.js'
import LeaveCompensatory from '../../../src/commands/people/leave/compensatory.js'
import LeaveEncashmentReport from '../../../src/commands/people/leave/encashment-report.js'
import LeaveLopReport from '../../../src/commands/people/leave/lop-report.js'
import LeaveCustomizeBalance from '../../../src/commands/people/leave/customize-balance.js'

describe('people leave types', () => {
  it('has correct command id', () => {
    expect(LeaveTypes.id).toBe('people leave types')
  })

  it('has a summary', () => {
    expect(LeaveTypes.summary).toBeTruthy()
  })

  it('requires --user flag', () => {
    expect(LeaveTypes.flags.user.required).toBe(true)
  })
})

describe('people leave apply', () => {
  it('has correct command id', () => {
    expect(LeaveApply.id).toBe('people leave apply')
  })

  it('has a summary', () => {
    expect(LeaveApply.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(LeaveApply.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(LeaveApply.flags['dry-run']).toBeDefined()
  })
})

describe('people leave get', () => {
  it('has correct command id', () => {
    expect(LeaveGet.id).toBe('people leave get')
  })

  it('has a summary', () => {
    expect(LeaveGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(LeaveGet.args.id.required).toBe(true)
  })
})

describe('people leave list', () => {
  it('has correct command id', () => {
    expect(LeaveList.id).toBe('people leave list')
  })

  it('has a summary', () => {
    expect(LeaveList.summary).toBeTruthy()
  })

  it('requires --from flag', () => {
    expect(LeaveList.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(LeaveList.flags.to.required).toBe(true)
  })

  it('supports --data-select flag', () => {
    expect(LeaveList.flags['data-select']).toBeDefined()
  })

  it('--data-select has valid options', () => {
    const options = (LeaveList.flags['data-select'] as any).options
    expect(options).toContain('MINE')
    expect(options).toContain('SUBS')
    expect(options).toContain('DIRSUBS')
    expect(options).toContain('ALL')
  })

  it('supports --approval-status flag', () => {
    expect(LeaveList.flags['approval-status']).toBeDefined()
  })

  it('supports --employee flag', () => {
    expect(LeaveList.flags.employee).toBeDefined()
  })

  it('supports --leave-type flag', () => {
    expect(LeaveList.flags['leave-type']).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(LeaveList.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(LeaveList.flags['per-page']).toBeDefined()
  })
})

describe('people leave cancel', () => {
  it('has correct command id', () => {
    expect(LeaveCancel.id).toBe('people leave cancel')
  })

  it('has a summary', () => {
    expect(LeaveCancel.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(LeaveCancel.args.id.required).toBe(true)
  })

  it('supports --reason flag', () => {
    expect(LeaveCancel.flags.reason).toBeDefined()
  })

  it('supports --dry-run flag', () => {
    expect(LeaveCancel.flags['dry-run']).toBeDefined()
  })
})

describe('people leave balance', () => {
  it('has correct command id', () => {
    expect(LeaveBalance.id).toBe('people leave balance')
  })

  it('has a summary', () => {
    expect(LeaveBalance.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(LeaveBalance.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(LeaveBalance.flags['dry-run']).toBeDefined()
  })
})

describe('people leave holidays', () => {
  it('has correct command id', () => {
    expect(LeaveHolidays.id).toBe('people leave holidays')
  })

  it('has a summary', () => {
    expect(LeaveHolidays.summary).toBeTruthy()
  })

  it('supports --from flag', () => {
    expect(LeaveHolidays.flags.from).toBeDefined()
  })

  it('supports --to flag', () => {
    expect(LeaveHolidays.flags.to).toBeDefined()
  })

  it('supports --upcoming flag', () => {
    expect(LeaveHolidays.flags.upcoming).toBeDefined()
  })
})

describe('people leave user-report', () => {
  it('has correct command id', () => {
    expect(LeaveUserReport.id).toBe('people leave user-report')
  })

  it('has a summary', () => {
    expect(LeaveUserReport.summary).toBeTruthy()
  })

  it('requires --employee flag', () => {
    expect(LeaveUserReport.flags.employee.required).toBe(true)
  })

  it('supports --to flag', () => {
    expect(LeaveUserReport.flags.to).toBeDefined()
  })
})

describe('people leave booked-report', () => {
  it('has correct command id', () => {
    expect(LeaveBookedReport.id).toBe('people leave booked-report')
  })

  it('has a summary', () => {
    expect(LeaveBookedReport.summary).toBeTruthy()
  })

  it('requires --from flag', () => {
    expect(LeaveBookedReport.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(LeaveBookedReport.flags.to.required).toBe(true)
  })

  it('supports --employee flag', () => {
    expect(LeaveBookedReport.flags.employee).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(LeaveBookedReport.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(LeaveBookedReport.flags['per-page']).toBeDefined()
  })
})

describe('people leave compensatory', () => {
  it('has correct command id', () => {
    expect(LeaveCompensatory.id).toBe('people leave compensatory')
  })

  it('has a summary', () => {
    expect(LeaveCompensatory.summary).toBeTruthy()
  })

  it('requires --from flag', () => {
    expect(LeaveCompensatory.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(LeaveCompensatory.flags.to.required).toBe(true)
  })

  it('supports --data-select flag', () => {
    expect(LeaveCompensatory.flags['data-select']).toBeDefined()
  })

  it('--data-select has valid options', () => {
    const options = (LeaveCompensatory.flags['data-select'] as any).options
    expect(options).toContain('MINE')
    expect(options).toContain('SUBS')
    expect(options).toContain('DIRSUBS')
    expect(options).toContain('ALL')
  })

  it('supports --approval-status flag', () => {
    expect(LeaveCompensatory.flags['approval-status']).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(LeaveCompensatory.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(LeaveCompensatory.flags['per-page']).toBeDefined()
  })
})

describe('people leave encashment-report', () => {
  it('has correct command id', () => {
    expect(LeaveEncashmentReport.id).toBe('people leave encashment-report')
  })

  it('has a summary', () => {
    expect(LeaveEncashmentReport.summary).toBeTruthy()
  })

  it('requires --pay-period-id flag', () => {
    expect(LeaveEncashmentReport.flags['pay-period-id'].required).toBe(true)
  })

  it('requires --from flag', () => {
    expect(LeaveEncashmentReport.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(LeaveEncashmentReport.flags.to.required).toBe(true)
  })

  it('supports --employee flag', () => {
    expect(LeaveEncashmentReport.flags.employee).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(LeaveEncashmentReport.flags['per-page']).toBeDefined()
  })
})

describe('people leave lop-report', () => {
  it('has correct command id', () => {
    expect(LeaveLopReport.id).toBe('people leave lop-report')
  })

  it('has a summary', () => {
    expect(LeaveLopReport.summary).toBeTruthy()
  })

  it('requires --pay-period-id flag', () => {
    expect(LeaveLopReport.flags['pay-period-id'].required).toBe(true)
  })

  it('requires --from flag', () => {
    expect(LeaveLopReport.flags.from.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(LeaveLopReport.flags.to.required).toBe(true)
  })

  it('supports --employee flag', () => {
    expect(LeaveLopReport.flags.employee).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(LeaveLopReport.flags['per-page']).toBeDefined()
  })
})

describe('people leave customize-balance', () => {
  it('has correct command id', () => {
    expect(LeaveCustomizeBalance.id).toBe('people leave customize-balance')
  })

  it('has a summary', () => {
    expect(LeaveCustomizeBalance.summary).toBeTruthy()
  })

  it('requires erecno arg', () => {
    expect(LeaveCustomizeBalance.args.erecno.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(LeaveCustomizeBalance.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(LeaveCustomizeBalance.flags['dry-run']).toBeDefined()
  })
})
