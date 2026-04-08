import { describe, it, expect } from 'vitest'
import CrmPipelinesList from '../../../src/commands/crm/pipelines/list.js'

describe('crm pipelines list', () => {
  it('has correct command id', () => {
    expect(CrmPipelinesList.id).toBe('crm pipelines list')
  })

  it('has a summary', () => {
    expect(CrmPipelinesList.summary).toBeDefined()
    expect(typeof CrmPipelinesList.summary).toBe('string')
    expect(CrmPipelinesList.summary!.length).toBeGreaterThan(0)
  })

  it('requires --layout flag', () => {
    expect(CrmPipelinesList.flags.layout).toBeDefined()
    expect(CrmPipelinesList.flags.layout.required).toBe(true)
  })

  it('has examples', () => {
    expect(CrmPipelinesList.examples).toBeDefined()
    expect(CrmPipelinesList.examples!.length).toBeGreaterThan(0)
  })
})
