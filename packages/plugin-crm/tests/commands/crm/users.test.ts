import { describe, it, expect } from 'vitest'
import CrmUsersList from '../../../src/commands/crm/users/list.js'
import CrmUsersGet from '../../../src/commands/crm/users/get.js'

describe('crm users list', () => {
  it('has correct command id', () => {
    expect(CrmUsersList.id).toBe('crm users list')
  })

  it('has a summary', () => {
    expect(CrmUsersList.summary).toBeDefined()
    expect(typeof CrmUsersList.summary).toBe('string')
    expect(CrmUsersList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmUsersList.examples).toBeDefined()
    expect(CrmUsersList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    // oclif returns {} for .args when no static args are defined
    expect(Object.keys(CrmUsersList.args ?? {}).length).toBe(0)
  })

  it('has optional --type flag with valid user type options', () => {
    expect(CrmUsersList.flags.type).toBeDefined()
    expect(CrmUsersList.flags.type.required).toBeFalsy()
    const options = (CrmUsersList.flags.type as any).options as string[]
    expect(options).toContain('AllUsers')
    expect(options).toContain('ActiveUsers')
    expect(options).toContain('DeactiveUsers')
    expect(options).toContain('ConfirmedUsers')
    expect(options).toContain('NotConfirmedUsers')
    expect(options).toContain('DeletedUsers')
    expect(options).toContain('ActiveConfirmedUsers')
    expect(options).toContain('AdminUsers')
    expect(options).toContain('ActiveConfirmedAdmins')
    expect(options).toContain('CurrentUser')
  })

  it('has pagination flags with sensible defaults', () => {
    expect(CrmUsersList.flags.page).toBeDefined()
    expect((CrmUsersList.flags.page as any).default).toBe(1)

    expect(CrmUsersList.flags['per-page']).toBeDefined()
    expect((CrmUsersList.flags['per-page'] as any).default).toBe(200)
  })
})

describe('crm users get', () => {
  it('has correct command id', () => {
    expect(CrmUsersGet.id).toBe('crm users get')
  })

  it('has a summary', () => {
    expect(CrmUsersGet.summary).toBeDefined()
    expect(typeof CrmUsersGet.summary).toBe('string')
    expect(CrmUsersGet.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmUsersGet.examples).toBeDefined()
    expect(CrmUsersGet.examples!.length).toBeGreaterThan(0)
  })

  it('requires a user id arg', () => {
    expect(CrmUsersGet.args).toBeDefined()
    expect(CrmUsersGet.args.id).toBeDefined()
    expect(CrmUsersGet.args.id.required).toBe(true)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmUsersGet.flags ?? {}).length).toBe(0)
  })
})
