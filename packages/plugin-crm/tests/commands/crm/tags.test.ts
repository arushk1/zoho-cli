import { describe, it, expect } from 'vitest'
import CrmTagsList from '../../../src/commands/crm/tags/list.js'
import CrmTagsCreate from '../../../src/commands/crm/tags/create.js'
import CrmTagsUpdate from '../../../src/commands/crm/tags/update.js'
import CrmTagsDelete from '../../../src/commands/crm/tags/delete.js'
import CrmTagsAdd from '../../../src/commands/crm/tags/add.js'
import CrmTagsRemove from '../../../src/commands/crm/tags/remove.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

describe('crm tags list', () => {
  it('has correct command id', () => {
    expect(CrmTagsList.id).toBe('crm tags list')
  })

  it('has a summary', () => {
    expect(CrmTagsList.summary).toBeDefined()
    expect(typeof CrmTagsList.summary).toBe('string')
    expect(CrmTagsList.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmTagsList.examples).toBeDefined()
    expect(Array.isArray(CrmTagsList.examples)).toBe(true)
    expect((CrmTagsList.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmTagsList.flags.module).toBeDefined()
    expect(CrmTagsList.flags.module.required).toBe(true)
    expect(CrmTagsList.flags.module.char).toBe('m')
  })

  it('does not have --dry-run flag (read-only command)', () => {
    expect((CrmTagsList.flags as any)['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmTagsList)).toBe(true)
  })

  it('inherits --pretty and --api-version base flags', () => {
    expect(CrmBaseCommand.baseFlags.pretty).toBeDefined()
    expect(CrmBaseCommand.baseFlags['api-version']).toBeDefined()
  })
})

describe('crm tags create', () => {
  it('has correct command id', () => {
    expect(CrmTagsCreate.id).toBe('crm tags create')
  })

  it('has a summary', () => {
    expect(CrmTagsCreate.summary).toBeDefined()
    expect(typeof CrmTagsCreate.summary).toBe('string')
    expect(CrmTagsCreate.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmTagsCreate.examples).toBeDefined()
    expect(Array.isArray(CrmTagsCreate.examples)).toBe(true)
    expect((CrmTagsCreate.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmTagsCreate.flags.module).toBeDefined()
    expect(CrmTagsCreate.flags.module.required).toBe(true)
    expect(CrmTagsCreate.flags.module.char).toBe('m')
  })

  it('requires --name flag', () => {
    expect(CrmTagsCreate.flags.name).toBeDefined()
    expect(CrmTagsCreate.flags.name.required).toBe(true)
  })

  it('has optional --color flag', () => {
    expect(CrmTagsCreate.flags.color).toBeDefined()
    expect(CrmTagsCreate.flags.color.required).toBeFalsy()
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmTagsCreate.flags['dry-run']).toBeDefined()
    expect(CrmTagsCreate.flags['dry-run'].default).toBe(false)
    expect(CrmTagsCreate.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmTagsCreate)).toBe(true)
  })
})

describe('crm tags update', () => {
  it('has correct command id', () => {
    expect(CrmTagsUpdate.id).toBe('crm tags update')
  })

  it('has a summary', () => {
    expect(CrmTagsUpdate.summary).toBeDefined()
    expect(typeof CrmTagsUpdate.summary).toBe('string')
    expect(CrmTagsUpdate.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmTagsUpdate.examples).toBeDefined()
    expect(Array.isArray(CrmTagsUpdate.examples)).toBe(true)
    expect((CrmTagsUpdate.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires id arg', () => {
    expect(CrmTagsUpdate.args.id).toBeDefined()
    expect(CrmTagsUpdate.args.id.required).toBe(true)
  })

  it('requires --module flag', () => {
    expect(CrmTagsUpdate.flags.module).toBeDefined()
    expect(CrmTagsUpdate.flags.module.required).toBe(true)
    expect(CrmTagsUpdate.flags.module.char).toBe('m')
  })

  it('requires --name flag', () => {
    expect(CrmTagsUpdate.flags.name).toBeDefined()
    expect(CrmTagsUpdate.flags.name.required).toBe(true)
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmTagsUpdate.flags['dry-run']).toBeDefined()
    expect(CrmTagsUpdate.flags['dry-run'].default).toBe(false)
    expect(CrmTagsUpdate.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmTagsUpdate)).toBe(true)
  })
})

describe('crm tags delete', () => {
  it('has correct command id', () => {
    expect(CrmTagsDelete.id).toBe('crm tags delete')
  })

  it('has a summary', () => {
    expect(CrmTagsDelete.summary).toBeDefined()
    expect(typeof CrmTagsDelete.summary).toBe('string')
    expect(CrmTagsDelete.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmTagsDelete.examples).toBeDefined()
    expect(Array.isArray(CrmTagsDelete.examples)).toBe(true)
    expect((CrmTagsDelete.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires id arg', () => {
    expect(CrmTagsDelete.args.id).toBeDefined()
    expect(CrmTagsDelete.args.id.required).toBe(true)
  })

  it('does not have --dry-run flag (single-resource destructive, no body)', () => {
    expect((CrmTagsDelete.flags as any)?.['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmTagsDelete)).toBe(true)
  })
})

describe('crm tags add', () => {
  it('has correct command id', () => {
    expect(CrmTagsAdd.id).toBe('crm tags add')
  })

  it('has a summary', () => {
    expect(CrmTagsAdd.summary).toBeDefined()
    expect(typeof CrmTagsAdd.summary).toBe('string')
    expect(CrmTagsAdd.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmTagsAdd.examples).toBeDefined()
    expect(Array.isArray(CrmTagsAdd.examples)).toBe(true)
    expect((CrmTagsAdd.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmTagsAdd.args.module).toBeDefined()
    expect(CrmTagsAdd.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmTagsAdd.args.id).toBeDefined()
    expect(CrmTagsAdd.args.id.required).toBe(true)
  })

  it('requires --tags flag', () => {
    expect(CrmTagsAdd.flags.tags).toBeDefined()
    expect(CrmTagsAdd.flags.tags.required).toBe(true)
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmTagsAdd.flags['dry-run']).toBeDefined()
    expect(CrmTagsAdd.flags['dry-run'].default).toBe(false)
    expect(CrmTagsAdd.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmTagsAdd)).toBe(true)
  })
})

describe('crm tags remove', () => {
  it('has correct command id', () => {
    expect(CrmTagsRemove.id).toBe('crm tags remove')
  })

  it('has a summary', () => {
    expect(CrmTagsRemove.summary).toBeDefined()
    expect(typeof CrmTagsRemove.summary).toBe('string')
    expect(CrmTagsRemove.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmTagsRemove.examples).toBeDefined()
    expect(Array.isArray(CrmTagsRemove.examples)).toBe(true)
    expect((CrmTagsRemove.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmTagsRemove.args.module).toBeDefined()
    expect(CrmTagsRemove.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmTagsRemove.args.id).toBeDefined()
    expect(CrmTagsRemove.args.id.required).toBe(true)
  })

  it('requires --tags flag', () => {
    expect(CrmTagsRemove.flags.tags).toBeDefined()
    expect(CrmTagsRemove.flags.tags.required).toBe(true)
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmTagsRemove.flags['dry-run']).toBeDefined()
    expect(CrmTagsRemove.flags['dry-run'].default).toBe(false)
    expect(CrmTagsRemove.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmTagsRemove)).toBe(true)
  })
})
