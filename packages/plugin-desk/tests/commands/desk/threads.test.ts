import { describe, it, expect } from 'vitest'
import DeskThreadsList from '../../../src/commands/desk/threads/list.js'
import DeskThreadsGet from '../../../src/commands/desk/threads/get.js'
import DeskThreadsReply from '../../../src/commands/desk/threads/reply.js'
import DeskThreadsDraft from '../../../src/commands/desk/threads/draft.js'

describe('desk threads list', () => {
  it('has correct command id', () => { expect(DeskThreadsList.id).toBe('desk threads list') })
  it('has summary', () => { expect(DeskThreadsList.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskThreadsList.flags.ticket.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskThreadsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskThreadsList.flags['per-page']).toBeDefined() })
  it('--page defaults to 1', () => { expect(DeskThreadsList.flags.page.default).toBe(1) })
  it('--per-page defaults to 100', () => { expect(DeskThreadsList.flags['per-page'].default).toBe(100) })
})

describe('desk threads get', () => {
  it('has correct command id', () => { expect(DeskThreadsGet.id).toBe('desk threads get') })
  it('has summary', () => { expect(DeskThreadsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskThreadsGet.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskThreadsGet.flags.ticket.required).toBe(true) })
})

describe('desk threads reply', () => {
  it('has correct command id', () => { expect(DeskThreadsReply.id).toBe('desk threads reply') })
  it('has summary', () => { expect(DeskThreadsReply.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskThreadsReply.flags.ticket.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskThreadsReply.flags.data.required).toBe(true) })
})

describe('desk threads draft', () => {
  it('has correct command id', () => { expect(DeskThreadsDraft.id).toBe('desk threads draft') })
  it('has summary', () => { expect(DeskThreadsDraft.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskThreadsDraft.flags.ticket.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskThreadsDraft.flags.data.required).toBe(true) })
})
