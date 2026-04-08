import { describe, it, expect } from 'vitest'
import TaxesList from '../../../src/commands/expense/taxes/list.js'
import TaxesGet from '../../../src/commands/expense/taxes/get.js'
import TaxesCreate from '../../../src/commands/expense/taxes/create.js'
import TaxesUpdate from '../../../src/commands/expense/taxes/update.js'
import TaxesDelete from '../../../src/commands/expense/taxes/delete.js'
import TaxesGetGroup from '../../../src/commands/expense/taxes/get-group.js'

describe('expense taxes list', () => {
  it('has correct command id', () => { expect(TaxesList.id).toBe('expense taxes list') })
  it('supports --page flag', () => { expect(TaxesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(TaxesList.flags['per-page']).toBeDefined() })
})

describe('expense taxes get', () => {
  it('has correct command id', () => { expect(TaxesGet.id).toBe('expense taxes get') })
  it('requires id arg', () => { expect(TaxesGet.args.id.required).toBe(true) })
})

describe('expense taxes create', () => {
  it('has correct command id', () => { expect(TaxesCreate.id).toBe('expense taxes create') })
  it('requires --data flag', () => { expect(TaxesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TaxesCreate.flags['dry-run']).toBeDefined() })
})

describe('expense taxes update', () => {
  it('has correct command id', () => { expect(TaxesUpdate.id).toBe('expense taxes update') })
  it('requires id arg', () => { expect(TaxesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(TaxesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TaxesUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense taxes delete', () => {
  it('has correct command id', () => { expect(TaxesDelete.id).toBe('expense taxes delete') })
  it('requires id arg', () => { expect(TaxesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TaxesDelete.flags['dry-run']).toBeDefined() })
})

describe('expense taxes get-group', () => {
  it('has correct command id', () => { expect(TaxesGetGroup.id).toBe('expense taxes get-group') })
  it('requires id arg', () => { expect(TaxesGetGroup.args.id.required).toBe(true) })
})
