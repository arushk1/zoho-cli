import { describe, it, expect } from 'vitest'
import OrganizationsList from '../../../src/commands/expense/organizations/list.js'
import OrganizationsGet from '../../../src/commands/expense/organizations/get.js'
import OrganizationsCreate from '../../../src/commands/expense/organizations/create.js'
import OrganizationsUpdate from '../../../src/commands/expense/organizations/update.js'

describe('expense organizations list', () => {
  it('has correct command id', () => { expect(OrganizationsList.id).toBe('expense organizations list') })
})

describe('expense organizations get', () => {
  it('has correct command id', () => { expect(OrganizationsGet.id).toBe('expense organizations get') })
  it('requires id arg', () => { expect(OrganizationsGet.args.id.required).toBe(true) })
})

describe('expense organizations create', () => {
  it('has correct command id', () => { expect(OrganizationsCreate.id).toBe('expense organizations create') })
  it('requires --data flag', () => { expect(OrganizationsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(OrganizationsCreate.flags['dry-run']).toBeDefined() })
})

describe('expense organizations update', () => {
  it('has correct command id', () => { expect(OrganizationsUpdate.id).toBe('expense organizations update') })
  it('requires id arg', () => { expect(OrganizationsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(OrganizationsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(OrganizationsUpdate.flags['dry-run']).toBeDefined() })
})
