import { describe, it, expect } from 'vitest'
import ReportsList from '../../../src/commands/expense/reports/list.js'
import ReportsGet from '../../../src/commands/expense/reports/get.js'
import ReportsCreate from '../../../src/commands/expense/reports/create.js'
import ReportsUpdate from '../../../src/commands/expense/reports/update.js'
import ReportsApprove from '../../../src/commands/expense/reports/approve.js'
import ReportsReject from '../../../src/commands/expense/reports/reject.js'
import ReportsReimburse from '../../../src/commands/expense/reports/reimburse.js'
import ReportsApprovalHistory from '../../../src/commands/expense/reports/approval-history.js'

describe('expense reports list', () => {
  it('has correct command id', () => { expect(ReportsList.id).toBe('expense reports list') })
  it('supports --page flag', () => { expect(ReportsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ReportsList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(ReportsList.flags.status).toBeDefined() })
})

describe('expense reports get', () => {
  it('has correct command id', () => { expect(ReportsGet.id).toBe('expense reports get') })
  it('requires id arg', () => { expect(ReportsGet.args.id.required).toBe(true) })
})

describe('expense reports create', () => {
  it('has correct command id', () => { expect(ReportsCreate.id).toBe('expense reports create') })
  it('requires --data flag', () => { expect(ReportsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ReportsCreate.flags['dry-run']).toBeDefined() })
})

describe('expense reports update', () => {
  it('has correct command id', () => { expect(ReportsUpdate.id).toBe('expense reports update') })
  it('requires id arg', () => { expect(ReportsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ReportsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ReportsUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense reports approve', () => {
  it('has correct command id', () => { expect(ReportsApprove.id).toBe('expense reports approve') })
  it('requires id arg', () => { expect(ReportsApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ReportsApprove.flags['dry-run']).toBeDefined() })
})

describe('expense reports reject', () => {
  it('has correct command id', () => { expect(ReportsReject.id).toBe('expense reports reject') })
  it('requires id arg', () => { expect(ReportsReject.args.id.required).toBe(true) })
  it('supports --comments flag', () => { expect(ReportsReject.flags.comments).toBeDefined() })
  it('supports --dry-run flag', () => { expect(ReportsReject.flags['dry-run']).toBeDefined() })
})

describe('expense reports reimburse', () => {
  it('has correct command id', () => { expect(ReportsReimburse.id).toBe('expense reports reimburse') })
  it('requires id arg', () => { expect(ReportsReimburse.args.id.required).toBe(true) })
  it('supports optional --data flag', () => { expect(ReportsReimburse.flags.data).toBeDefined() })
  it('supports --dry-run flag', () => { expect(ReportsReimburse.flags['dry-run']).toBeDefined() })
})

describe('expense reports approval-history', () => {
  it('has correct command id', () => { expect(ReportsApprovalHistory.id).toBe('expense reports approval-history') })
  it('requires id arg', () => { expect(ReportsApprovalHistory.args.id.required).toBe(true) })
})
