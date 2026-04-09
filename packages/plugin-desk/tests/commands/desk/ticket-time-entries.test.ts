import { describe, it, expect } from 'vitest'
import DeskTicketTimeEntriesList from '../../../src/commands/desk/ticket-time-entries/list.js'
import DeskTicketTimeEntriesGet from '../../../src/commands/desk/ticket-time-entries/get.js'
import DeskTicketTimeEntriesCreate from '../../../src/commands/desk/ticket-time-entries/create.js'
import DeskTicketTimeEntriesUpdate from '../../../src/commands/desk/ticket-time-entries/update.js'
import DeskTicketTimeEntriesDelete from '../../../src/commands/desk/ticket-time-entries/delete.js'

describe('desk ticket-time-entries list', () => {
  it('has correct command id', () => { expect(DeskTicketTimeEntriesList.id).toBe('desk ticket-time-entries list') })
  it('has summary', () => { expect(DeskTicketTimeEntriesList.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimeEntriesList.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimeEntriesList.flags.ticket.char).toBe('t') })
  it('supports --page flag', () => { expect(DeskTicketTimeEntriesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketTimeEntriesList.flags['per-page']).toBeDefined() })
})

describe('desk ticket-time-entries get', () => {
  it('has correct command id', () => { expect(DeskTicketTimeEntriesGet.id).toBe('desk ticket-time-entries get') })
  it('has summary', () => { expect(DeskTicketTimeEntriesGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketTimeEntriesGet.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketTimeEntriesGet.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimeEntriesGet.flags.ticket.char).toBe('t') })
})

describe('desk ticket-time-entries create', () => {
  it('has correct command id', () => { expect(DeskTicketTimeEntriesCreate.id).toBe('desk ticket-time-entries create') })
  it('has summary', () => { expect(DeskTicketTimeEntriesCreate.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimeEntriesCreate.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimeEntriesCreate.flags.ticket.char).toBe('t') })
  it('requires --data flag', () => { expect(DeskTicketTimeEntriesCreate.flags.data.required).toBe(true) })
  it('--data flag has char d', () => { expect(DeskTicketTimeEntriesCreate.flags.data.char).toBe('d') })
  it('supports --dry-run flag', () => { expect(DeskTicketTimeEntriesCreate.flags['dry-run']).toBeDefined() })
})

describe('desk ticket-time-entries update', () => {
  it('has correct command id', () => { expect(DeskTicketTimeEntriesUpdate.id).toBe('desk ticket-time-entries update') })
  it('has summary', () => { expect(DeskTicketTimeEntriesUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketTimeEntriesUpdate.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketTimeEntriesUpdate.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimeEntriesUpdate.flags.ticket.char).toBe('t') })
  it('requires --data flag', () => { expect(DeskTicketTimeEntriesUpdate.flags.data.required).toBe(true) })
  it('--data flag has char d', () => { expect(DeskTicketTimeEntriesUpdate.flags.data.char).toBe('d') })
  it('supports --dry-run flag', () => { expect(DeskTicketTimeEntriesUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk ticket-time-entries delete', () => {
  it('has correct command id', () => { expect(DeskTicketTimeEntriesDelete.id).toBe('desk ticket-time-entries delete') })
  it('has summary', () => { expect(DeskTicketTimeEntriesDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketTimeEntriesDelete.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketTimeEntriesDelete.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimeEntriesDelete.flags.ticket.char).toBe('t') })
})
