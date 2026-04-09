import { describe, it, expect } from 'vitest'
import DeskTicketCommentsList from '../../../src/commands/desk/ticket-comments/list.js'
import DeskTicketCommentsGet from '../../../src/commands/desk/ticket-comments/get.js'
import DeskTicketCommentsAdd from '../../../src/commands/desk/ticket-comments/add.js'
import DeskTicketCommentsUpdate from '../../../src/commands/desk/ticket-comments/update.js'
import DeskTicketCommentsDelete from '../../../src/commands/desk/ticket-comments/delete.js'

describe('desk ticket-comments list', () => {
  it('has correct command id', () => { expect(DeskTicketCommentsList.id).toBe('desk ticket-comments list') })
  it('has summary', () => { expect(DeskTicketCommentsList.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketCommentsList.flags.ticket.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskTicketCommentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketCommentsList.flags['per-page']).toBeDefined() })
  it('--page defaults to 1', () => { expect(DeskTicketCommentsList.flags.page.default).toBe(1) })
  it('--per-page defaults to 100', () => { expect(DeskTicketCommentsList.flags['per-page'].default).toBe(100) })
})

describe('desk ticket-comments get', () => {
  it('has correct command id', () => { expect(DeskTicketCommentsGet.id).toBe('desk ticket-comments get') })
  it('has summary', () => { expect(DeskTicketCommentsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketCommentsGet.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketCommentsGet.flags.ticket.required).toBe(true) })
})

describe('desk ticket-comments add', () => {
  it('has correct command id', () => { expect(DeskTicketCommentsAdd.id).toBe('desk ticket-comments add') })
  it('has summary', () => { expect(DeskTicketCommentsAdd.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketCommentsAdd.flags.ticket.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketCommentsAdd.flags.data.required).toBe(true) })
})

describe('desk ticket-comments update', () => {
  it('has correct command id', () => { expect(DeskTicketCommentsUpdate.id).toBe('desk ticket-comments update') })
  it('has summary', () => { expect(DeskTicketCommentsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketCommentsUpdate.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketCommentsUpdate.flags.ticket.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketCommentsUpdate.flags.data.required).toBe(true) })
})

describe('desk ticket-comments delete', () => {
  it('has correct command id', () => { expect(DeskTicketCommentsDelete.id).toBe('desk ticket-comments delete') })
  it('has summary', () => { expect(DeskTicketCommentsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketCommentsDelete.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketCommentsDelete.flags.ticket.required).toBe(true) })
})
