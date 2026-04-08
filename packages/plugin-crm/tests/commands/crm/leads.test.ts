import { describe, it, expect } from 'vitest'
import CrmLeadsConvert from '../../../src/commands/crm/leads/convert.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

describe('crm leads convert', () => {
  it('has correct command id', () => {
    expect(CrmLeadsConvert.id).toBe('crm leads convert')
  })

  it('has a summary', () => {
    expect(CrmLeadsConvert.summary).toBeDefined()
    expect(typeof CrmLeadsConvert.summary).toBe('string')
    expect(CrmLeadsConvert.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmLeadsConvert.examples).toBeDefined()
    expect(Array.isArray(CrmLeadsConvert.examples)).toBe(true)
    expect((CrmLeadsConvert.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires the lead id arg', () => {
    expect(CrmLeadsConvert.args.id).toBeDefined()
    expect(CrmLeadsConvert.args.id.required).toBe(true)
  })

  it('has --data flag for conversion options (optional)', () => {
    expect(CrmLeadsConvert.flags.data).toBeDefined()
    expect(CrmLeadsConvert.flags.data.required).toBeFalsy()
    expect(CrmLeadsConvert.flags.data.char).toBe('d')
  })

  it('has --dry-run flag', () => {
    expect(CrmLeadsConvert.flags['dry-run']).toBeDefined()
    expect(CrmLeadsConvert.flags['dry-run'].default).toBe(false)
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmLeadsConvert)).toBe(true)
  })

  it('inherits --pretty flag from base', () => {
    expect(CrmBaseCommand.baseFlags.pretty).toBeDefined()
  })

  it('inherits --api-version flag from base', () => {
    expect(CrmBaseCommand.baseFlags['api-version']).toBeDefined()
  })
})
