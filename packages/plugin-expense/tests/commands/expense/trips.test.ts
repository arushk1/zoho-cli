import { describe, it, expect } from 'vitest'
import TripsList from '../../../src/commands/expense/trips/list.js'
import TripsGet from '../../../src/commands/expense/trips/get.js'
import TripsCreate from '../../../src/commands/expense/trips/create.js'
import TripsUpdate from '../../../src/commands/expense/trips/update.js'
import TripsDelete from '../../../src/commands/expense/trips/delete.js'
import TripsApprove from '../../../src/commands/expense/trips/approve.js'
import TripsReject from '../../../src/commands/expense/trips/reject.js'
import TripsCancel from '../../../src/commands/expense/trips/cancel.js'
import TripsClose from '../../../src/commands/expense/trips/close.js'

describe('expense trips list', () => {
  it('has correct command id', () => { expect(TripsList.id).toBe('expense trips list') })
  it('supports --page flag', () => { expect(TripsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(TripsList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(TripsList.flags.status).toBeDefined() })
})

describe('expense trips get', () => {
  it('has correct command id', () => { expect(TripsGet.id).toBe('expense trips get') })
  it('requires id arg', () => { expect(TripsGet.args.id.required).toBe(true) })
})

describe('expense trips create', () => {
  it('has correct command id', () => { expect(TripsCreate.id).toBe('expense trips create') })
  it('requires --data flag', () => { expect(TripsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TripsCreate.flags['dry-run']).toBeDefined() })
})

describe('expense trips update', () => {
  it('has correct command id', () => { expect(TripsUpdate.id).toBe('expense trips update') })
  it('requires id arg', () => { expect(TripsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(TripsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TripsUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense trips delete', () => {
  it('has correct command id', () => { expect(TripsDelete.id).toBe('expense trips delete') })
  it('requires id arg', () => { expect(TripsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TripsDelete.flags['dry-run']).toBeDefined() })
})

describe('expense trips approve', () => {
  it('has correct command id', () => { expect(TripsApprove.id).toBe('expense trips approve') })
  it('requires id arg', () => { expect(TripsApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TripsApprove.flags['dry-run']).toBeDefined() })
})

describe('expense trips reject', () => {
  it('has correct command id', () => { expect(TripsReject.id).toBe('expense trips reject') })
  it('requires id arg', () => { expect(TripsReject.args.id.required).toBe(true) })
  it('supports --comments flag', () => { expect(TripsReject.flags.comments).toBeDefined() })
  it('supports --dry-run flag', () => { expect(TripsReject.flags['dry-run']).toBeDefined() })
})

describe('expense trips cancel', () => {
  it('has correct command id', () => { expect(TripsCancel.id).toBe('expense trips cancel') })
  it('requires id arg', () => { expect(TripsCancel.args.id.required).toBe(true) })
  it('supports --comments flag', () => { expect(TripsCancel.flags.comments).toBeDefined() })
  it('supports --dry-run flag', () => { expect(TripsCancel.flags['dry-run']).toBeDefined() })
})

describe('expense trips close', () => {
  it('has correct command id', () => { expect(TripsClose.id).toBe('expense trips close') })
  it('requires id arg', () => { expect(TripsClose.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TripsClose.flags['dry-run']).toBeDefined() })
})
