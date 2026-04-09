import { describe, it, expect } from 'vitest'
import DeskTicketTimersStart from '../../../src/commands/desk/ticket-timers/start.js'
import DeskTicketTimersPause from '../../../src/commands/desk/ticket-timers/pause.js'
import DeskTicketTimersResume from '../../../src/commands/desk/ticket-timers/resume.js'
import DeskTicketTimersStop from '../../../src/commands/desk/ticket-timers/stop.js'
import DeskTicketTimersStatus from '../../../src/commands/desk/ticket-timers/status.js'

describe('desk ticket-timers start', () => {
  it('has correct command id', () => { expect(DeskTicketTimersStart.id).toBe('desk ticket-timers start') })
  it('has summary', () => { expect(DeskTicketTimersStart.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimersStart.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimersStart.flags.ticket.char).toBe('t') })
})

describe('desk ticket-timers pause', () => {
  it('has correct command id', () => { expect(DeskTicketTimersPause.id).toBe('desk ticket-timers pause') })
  it('has summary', () => { expect(DeskTicketTimersPause.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimersPause.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimersPause.flags.ticket.char).toBe('t') })
})

describe('desk ticket-timers resume', () => {
  it('has correct command id', () => { expect(DeskTicketTimersResume.id).toBe('desk ticket-timers resume') })
  it('has summary', () => { expect(DeskTicketTimersResume.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimersResume.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimersResume.flags.ticket.char).toBe('t') })
})

describe('desk ticket-timers stop', () => {
  it('has correct command id', () => { expect(DeskTicketTimersStop.id).toBe('desk ticket-timers stop') })
  it('has summary', () => { expect(DeskTicketTimersStop.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimersStop.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimersStop.flags.ticket.char).toBe('t') })
})

describe('desk ticket-timers status', () => {
  it('has correct command id', () => { expect(DeskTicketTimersStatus.id).toBe('desk ticket-timers status') })
  it('has summary', () => { expect(DeskTicketTimersStatus.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketTimersStatus.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketTimersStatus.flags.ticket.char).toBe('t') })
})
