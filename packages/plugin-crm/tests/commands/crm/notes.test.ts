import { describe, it, expect } from 'vitest'
import CrmNotesList from '../../../src/commands/crm/notes/list.js'
import CrmNotesGet from '../../../src/commands/crm/notes/get.js'
import CrmNotesCreate from '../../../src/commands/crm/notes/create.js'
import CrmNotesUpdate from '../../../src/commands/crm/notes/update.js'
import CrmNotesDelete from '../../../src/commands/crm/notes/delete.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

describe('crm notes list', () => {
  it('has correct command id', () => {
    expect(CrmNotesList.id).toBe('crm notes list')
  })

  it('has a summary', () => {
    expect(CrmNotesList.summary).toBeDefined()
    expect(typeof CrmNotesList.summary).toBe('string')
    expect(CrmNotesList.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmNotesList.examples).toBeDefined()
    expect(Array.isArray(CrmNotesList.examples)).toBe(true)
    expect((CrmNotesList.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmNotesList.args.module).toBeDefined()
    expect(CrmNotesList.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmNotesList.args.id).toBeDefined()
    expect(CrmNotesList.args.id.required).toBe(true)
  })

  it('has optional --page flag with default of 1', () => {
    expect(CrmNotesList.flags.page).toBeDefined()
    expect(CrmNotesList.flags.page.default).toBe(1)
    expect(CrmNotesList.flags.page.required).toBeFalsy()
  })

  it('has optional --per-page flag with default of 200', () => {
    expect(CrmNotesList.flags['per-page']).toBeDefined()
    expect(CrmNotesList.flags['per-page'].default).toBe(200)
    expect(CrmNotesList.flags['per-page'].required).toBeFalsy()
  })

  it('does not have --dry-run flag (read-only command)', () => {
    expect((CrmNotesList.flags as any)['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmNotesList)).toBe(true)
  })

  it('inherits --pretty and --api-version base flags', () => {
    expect(CrmBaseCommand.baseFlags.pretty).toBeDefined()
    expect(CrmBaseCommand.baseFlags['api-version']).toBeDefined()
  })
})

describe('crm notes get', () => {
  it('has correct command id', () => {
    expect(CrmNotesGet.id).toBe('crm notes get')
  })

  it('has a summary', () => {
    expect(CrmNotesGet.summary).toBeDefined()
    expect(typeof CrmNotesGet.summary).toBe('string')
    expect(CrmNotesGet.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmNotesGet.examples).toBeDefined()
    expect(Array.isArray(CrmNotesGet.examples)).toBe(true)
    expect((CrmNotesGet.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires id arg', () => {
    expect(CrmNotesGet.args.id).toBeDefined()
    expect(CrmNotesGet.args.id.required).toBe(true)
  })

  it('does not have --dry-run flag (read-only command)', () => {
    expect((CrmNotesGet.flags as any)?.['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmNotesGet)).toBe(true)
  })
})

describe('crm notes create', () => {
  it('has correct command id', () => {
    expect(CrmNotesCreate.id).toBe('crm notes create')
  })

  it('has a summary', () => {
    expect(CrmNotesCreate.summary).toBeDefined()
    expect(typeof CrmNotesCreate.summary).toBe('string')
    expect(CrmNotesCreate.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmNotesCreate.examples).toBeDefined()
    expect(Array.isArray(CrmNotesCreate.examples)).toBe(true)
    expect((CrmNotesCreate.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmNotesCreate.args.module).toBeDefined()
    expect(CrmNotesCreate.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmNotesCreate.args.id).toBeDefined()
    expect(CrmNotesCreate.args.id.required).toBe(true)
  })

  it('requires --content flag', () => {
    expect(CrmNotesCreate.flags.content).toBeDefined()
    expect(CrmNotesCreate.flags.content.required).toBe(true)
    expect(CrmNotesCreate.flags.content.char).toBe('c')
  })

  it('has optional --title flag', () => {
    expect(CrmNotesCreate.flags.title).toBeDefined()
    expect(CrmNotesCreate.flags.title.required).toBeFalsy()
    expect(CrmNotesCreate.flags.title.char).toBe('t')
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmNotesCreate.flags['dry-run']).toBeDefined()
    expect(CrmNotesCreate.flags['dry-run'].default).toBe(false)
    expect(CrmNotesCreate.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmNotesCreate)).toBe(true)
  })
})

describe('crm notes update', () => {
  it('has correct command id', () => {
    expect(CrmNotesUpdate.id).toBe('crm notes update')
  })

  it('has a summary', () => {
    expect(CrmNotesUpdate.summary).toBeDefined()
    expect(typeof CrmNotesUpdate.summary).toBe('string')
    expect(CrmNotesUpdate.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmNotesUpdate.examples).toBeDefined()
    expect(Array.isArray(CrmNotesUpdate.examples)).toBe(true)
    expect((CrmNotesUpdate.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires id arg', () => {
    expect(CrmNotesUpdate.args.id).toBeDefined()
    expect(CrmNotesUpdate.args.id.required).toBe(true)
  })

  it('requires --content flag', () => {
    expect(CrmNotesUpdate.flags.content).toBeDefined()
    expect(CrmNotesUpdate.flags.content.required).toBe(true)
    expect(CrmNotesUpdate.flags.content.char).toBe('c')
  })

  it('has optional --title flag', () => {
    expect(CrmNotesUpdate.flags.title).toBeDefined()
    expect(CrmNotesUpdate.flags.title.required).toBeFalsy()
    expect(CrmNotesUpdate.flags.title.char).toBe('t')
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmNotesUpdate.flags['dry-run']).toBeDefined()
    expect(CrmNotesUpdate.flags['dry-run'].default).toBe(false)
    expect(CrmNotesUpdate.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmNotesUpdate)).toBe(true)
  })
})

describe('crm notes delete', () => {
  it('has correct command id', () => {
    expect(CrmNotesDelete.id).toBe('crm notes delete')
  })

  it('has a summary', () => {
    expect(CrmNotesDelete.summary).toBeDefined()
    expect(typeof CrmNotesDelete.summary).toBe('string')
    expect(CrmNotesDelete.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmNotesDelete.examples).toBeDefined()
    expect(Array.isArray(CrmNotesDelete.examples)).toBe(true)
    expect((CrmNotesDelete.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires id arg', () => {
    expect(CrmNotesDelete.args.id).toBeDefined()
    expect(CrmNotesDelete.args.id.required).toBe(true)
  })

  it('does not have --dry-run flag (destructive but single-resource, no body needed)', () => {
    expect((CrmNotesDelete.flags as any)?.['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmNotesDelete)).toBe(true)
  })
})
