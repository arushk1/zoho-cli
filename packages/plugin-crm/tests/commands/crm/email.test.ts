import { describe, it, expect } from 'vitest'
import CrmEmailList from '../../../src/commands/crm/email/list.js'
import CrmEmailSend from '../../../src/commands/crm/email/send.js'

describe('crm email list', () => {
  it('has correct command id', () => {
    expect(CrmEmailList.id).toBe('crm email list')
  })

  it('has a summary', () => {
    expect(CrmEmailList.summary).toBeDefined()
    expect(typeof CrmEmailList.summary).toBe('string')
    expect(CrmEmailList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmEmailList.examples).toBeDefined()
    expect(CrmEmailList.examples!.length).toBeGreaterThan(0)
  })

  it('requires a module arg', () => {
    expect(CrmEmailList.args).toBeDefined()
    expect(CrmEmailList.args.module).toBeDefined()
    expect(CrmEmailList.args.module.required).toBe(true)
  })

  it('requires a record id arg', () => {
    expect(CrmEmailList.args.id).toBeDefined()
    expect(CrmEmailList.args.id.required).toBe(true)
  })

  it('has no custom flags', () => {
    expect(CrmEmailList.flags).toBeUndefined()
  })
})

describe('crm email send', () => {
  it('has correct command id', () => {
    expect(CrmEmailSend.id).toBe('crm email send')
  })

  it('has a summary', () => {
    expect(CrmEmailSend.summary).toBeDefined()
    expect(typeof CrmEmailSend.summary).toBe('string')
    expect(CrmEmailSend.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmEmailSend.examples).toBeDefined()
    expect(CrmEmailSend.examples!.length).toBeGreaterThan(0)
  })

  it('requires a module arg', () => {
    expect(CrmEmailSend.args).toBeDefined()
    expect(CrmEmailSend.args.module).toBeDefined()
    expect(CrmEmailSend.args.module.required).toBe(true)
  })

  it('requires a record id arg', () => {
    expect(CrmEmailSend.args.id).toBeDefined()
    expect(CrmEmailSend.args.id.required).toBe(true)
  })

  it('requires --data flag with email payload', () => {
    expect(CrmEmailSend.flags.data).toBeDefined()
    expect(CrmEmailSend.flags.data.required).toBe(true)
    expect((CrmEmailSend.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(CrmEmailSend.flags['dry-run']).toBeDefined()
    expect((CrmEmailSend.flags['dry-run'] as any).default).toBe(false)
  })
})
