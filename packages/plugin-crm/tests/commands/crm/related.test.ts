import { describe, it, expect } from 'vitest'
import CrmRelatedList from '../../../src/commands/crm/related/list.js'

describe('crm related list', () => {
  it('has correct command id', () => {
    expect(CrmRelatedList.id).toBe('crm related list')
  })

  it('has a summary', () => {
    expect(CrmRelatedList.summary).toBeDefined()
    expect(typeof CrmRelatedList.summary).toBe('string')
    expect(CrmRelatedList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmRelatedList.examples).toBeDefined()
    expect(CrmRelatedList.examples!.length).toBeGreaterThan(0)
  })

  it('requires a module arg', () => {
    expect(CrmRelatedList.args).toBeDefined()
    expect(CrmRelatedList.args.module).toBeDefined()
    expect(CrmRelatedList.args.module.required).toBe(true)
  })

  it('requires a record id arg', () => {
    expect(CrmRelatedList.args.id).toBeDefined()
    expect(CrmRelatedList.args.id.required).toBe(true)
  })

  it('requires a relatedList arg', () => {
    expect(CrmRelatedList.args.relatedList).toBeDefined()
    expect(CrmRelatedList.args.relatedList.required).toBe(true)
  })

  it('has pagination flags with sensible defaults', () => {
    expect(CrmRelatedList.flags.page).toBeDefined()
    expect((CrmRelatedList.flags.page as any).default).toBe(1)

    expect(CrmRelatedList.flags['per-page']).toBeDefined()
    expect((CrmRelatedList.flags['per-page'] as any).default).toBe(200)
  })

  it('has required --fields flag for field selection (Zoho API requires fields param)', () => {
    expect(CrmRelatedList.flags.fields).toBeDefined()
    expect(CrmRelatedList.flags.fields.required).toBe(true)
    expect((CrmRelatedList.flags.fields as any).char).toBe('f')
  })
})
