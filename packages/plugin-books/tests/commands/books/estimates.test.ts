import { describe, it, expect } from 'vitest'
import EstimatesList from '../../../src/commands/books/estimates/list.js'
import EstimatesGet from '../../../src/commands/books/estimates/get.js'
import EstimatesCreate from '../../../src/commands/books/estimates/create.js'
import EstimatesUpdate from '../../../src/commands/books/estimates/update.js'
import EstimatesDelete from '../../../src/commands/books/estimates/delete.js'
import EstimatesSend from '../../../src/commands/books/estimates/send.js'
import EstimatesAccept from '../../../src/commands/books/estimates/accept.js'
import EstimatesDecline from '../../../src/commands/books/estimates/decline.js'
import EstimatesApprove from '../../../src/commands/books/estimates/approve.js'

describe('books estimates list', () => {
  it('has correct command id', () => { expect(EstimatesList.id).toBe('books estimates list') })
  it('supports --page flag', () => { expect(EstimatesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(EstimatesList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(EstimatesList.flags.status).toBeDefined() })
  it('supports --customer-id filter', () => { expect(EstimatesList.flags['customer-id']).toBeDefined() })
})

describe('books estimates get', () => {
  it('has correct command id', () => { expect(EstimatesGet.id).toBe('books estimates get') })
  it('requires id arg', () => { expect(EstimatesGet.args.id.required).toBe(true) })
})

describe('books estimates create', () => {
  it('has correct command id', () => { expect(EstimatesCreate.id).toBe('books estimates create') })
  it('requires --data flag', () => { expect(EstimatesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(EstimatesCreate.flags['dry-run']).toBeDefined() })
})

describe('books estimates update', () => {
  it('has correct command id', () => { expect(EstimatesUpdate.id).toBe('books estimates update') })
  it('requires id arg', () => { expect(EstimatesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(EstimatesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(EstimatesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books estimates delete', () => {
  it('has correct command id', () => { expect(EstimatesDelete.id).toBe('books estimates delete') })
  it('requires id arg', () => { expect(EstimatesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(EstimatesDelete.flags['dry-run']).toBeDefined() })
})

describe('books estimates send', () => {
  it('has correct command id', () => { expect(EstimatesSend.id).toBe('books estimates send') })
  it('requires id arg', () => { expect(EstimatesSend.args.id.required).toBe(true) })
  it('supports optional --data flag', () => { expect(EstimatesSend.flags.data).toBeDefined() })
  it('supports --dry-run flag', () => { expect(EstimatesSend.flags['dry-run']).toBeDefined() })
})

describe('books estimates accept', () => {
  it('has correct command id', () => { expect(EstimatesAccept.id).toBe('books estimates accept') })
  it('requires id arg', () => { expect(EstimatesAccept.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(EstimatesAccept.flags['dry-run']).toBeDefined() })
})

describe('books estimates decline', () => {
  it('has correct command id', () => { expect(EstimatesDecline.id).toBe('books estimates decline') })
  it('requires id arg', () => { expect(EstimatesDecline.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(EstimatesDecline.flags['dry-run']).toBeDefined() })
})

describe('books estimates approve', () => {
  it('has correct command id', () => { expect(EstimatesApprove.id).toBe('books estimates approve') })
  it('requires id arg', () => { expect(EstimatesApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(EstimatesApprove.flags['dry-run']).toBeDefined() })
})
