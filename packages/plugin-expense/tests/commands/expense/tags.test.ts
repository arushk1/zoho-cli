import { describe, it, expect } from 'vitest'
import TagsList from '../../../src/commands/expense/tags/list.js'
import TagsCreate from '../../../src/commands/expense/tags/create.js'
import TagsUpdate from '../../../src/commands/expense/tags/update.js'
import TagsDelete from '../../../src/commands/expense/tags/delete.js'
import TagsActivate from '../../../src/commands/expense/tags/activate.js'
import TagsDeactivate from '../../../src/commands/expense/tags/deactivate.js'
import TagsGetOptions from '../../../src/commands/expense/tags/get-options.js'
import TagsUpdateOptions from '../../../src/commands/expense/tags/update-options.js'
import TagsReorder from '../../../src/commands/expense/tags/reorder.js'

describe('expense tags list', () => {
  it('has correct command id', () => { expect(TagsList.id).toBe('expense tags list') })
})

describe('expense tags create', () => {
  it('has correct command id', () => { expect(TagsCreate.id).toBe('expense tags create') })
  it('requires --data flag', () => { expect(TagsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsCreate.flags['dry-run']).toBeDefined() })
})

describe('expense tags update', () => {
  it('has correct command id', () => { expect(TagsUpdate.id).toBe('expense tags update') })
  it('requires id arg', () => { expect(TagsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(TagsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense tags delete', () => {
  it('has correct command id', () => { expect(TagsDelete.id).toBe('expense tags delete') })
  it('requires id arg', () => { expect(TagsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsDelete.flags['dry-run']).toBeDefined() })
})

describe('expense tags activate', () => {
  it('has correct command id', () => { expect(TagsActivate.id).toBe('expense tags activate') })
  it('requires id arg', () => { expect(TagsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsActivate.flags['dry-run']).toBeDefined() })
})

describe('expense tags deactivate', () => {
  it('has correct command id', () => { expect(TagsDeactivate.id).toBe('expense tags deactivate') })
  it('requires id arg', () => { expect(TagsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsDeactivate.flags['dry-run']).toBeDefined() })
})

describe('expense tags get-options', () => {
  it('has correct command id', () => { expect(TagsGetOptions.id).toBe('expense tags get-options') })
  it('requires id arg', () => { expect(TagsGetOptions.args.id.required).toBe(true) })
})

describe('expense tags update-options', () => {
  it('has correct command id', () => { expect(TagsUpdateOptions.id).toBe('expense tags update-options') })
  it('requires id arg', () => { expect(TagsUpdateOptions.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(TagsUpdateOptions.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsUpdateOptions.flags['dry-run']).toBeDefined() })
})

describe('expense tags reorder', () => {
  it('has correct command id', () => { expect(TagsReorder.id).toBe('expense tags reorder') })
  it('requires --data flag', () => { expect(TagsReorder.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TagsReorder.flags['dry-run']).toBeDefined() })
})
