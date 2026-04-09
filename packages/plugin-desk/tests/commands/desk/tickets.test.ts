import { describe, it, expect } from 'vitest'
import DeskTicketsList from '../../../src/commands/desk/tickets/list.js'
import DeskTicketsGet from '../../../src/commands/desk/tickets/get.js'
import DeskTicketsCreate from '../../../src/commands/desk/tickets/create.js'
import DeskTicketsUpdate from '../../../src/commands/desk/tickets/update.js'
import DeskTicketsDelete from '../../../src/commands/desk/tickets/delete.js'

describe('desk tickets list', () => {
  it('has correct command id', () => { expect(DeskTicketsList.id).toBe('desk tickets list') })
  it('has summary', () => { expect(DeskTicketsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskTicketsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketsList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTicketsList.flags.department).toBeDefined() })
  it('supports --status filter', () => { expect(DeskTicketsList.flags.status).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskTicketsList.flags['sort-by']).toBeDefined() })
})

describe('desk tickets get', () => {
  it('has correct command id', () => { expect(DeskTicketsGet.id).toBe('desk tickets get') })
  it('has summary', () => { expect(DeskTicketsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsGet.args.id.required).toBe(true) })
  it('supports --include flag', () => { expect(DeskTicketsGet.flags.include).toBeDefined() })
})

describe('desk tickets create', () => {
  it('has correct command id', () => { expect(DeskTicketsCreate.id).toBe('desk tickets create') })
  it('has summary', () => { expect(DeskTicketsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskTicketsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTicketsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk tickets update', () => {
  it('has correct command id', () => { expect(DeskTicketsUpdate.id).toBe('desk tickets update') })
  it('has summary', () => { expect(DeskTicketsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTicketsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk tickets delete', () => {
  it('has correct command id', () => { expect(DeskTicketsDelete.id).toBe('desk tickets delete') })
  it('has summary', () => { expect(DeskTicketsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsDelete.args.id.required).toBe(true) })
})
