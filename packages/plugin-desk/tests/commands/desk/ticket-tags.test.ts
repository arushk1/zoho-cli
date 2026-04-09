import { describe, it, expect } from 'vitest'
import DeskTicketTagsList from '../../../src/commands/desk/ticket-tags/list.js'
import DeskTicketTagsAdd from '../../../src/commands/desk/ticket-tags/add.js'
import DeskTicketTagsRemove from '../../../src/commands/desk/ticket-tags/remove.js'

describe('desk ticket-tags list', () => {
  it('has correct command id', () => { expect(DeskTicketTagsList.id).toBe('desk ticket-tags list') })
  it('has summary', () => { expect(DeskTicketTagsList.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTagsList.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTagsList.flags.ticket.char).toBe('t') })
})

describe('desk ticket-tags add', () => {
  it('has correct command id', () => { expect(DeskTicketTagsAdd.id).toBe('desk ticket-tags add') })
  it('has summary', () => { expect(DeskTicketTagsAdd.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTagsAdd.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTagsAdd.flags.ticket.char).toBe('t') })
  it('requires --data flag', () => { expect(DeskTicketTagsAdd.flags.data.required).toBe(true) })
  it('--data flag has char d', () => { expect(DeskTicketTagsAdd.flags.data.char).toBe('d') })
})

describe('desk ticket-tags remove', () => {
  it('has correct command id', () => { expect(DeskTicketTagsRemove.id).toBe('desk ticket-tags remove') })
  it('has summary', () => { expect(DeskTicketTagsRemove.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketTagsRemove.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketTagsRemove.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTagsRemove.flags.ticket.char).toBe('t') })
})
