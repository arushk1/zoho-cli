import { describe, it, expect } from 'vitest'
import CrmLeadsCreate from '../../../src/commands/crm/leads/create.js'
import CrmLeadsUpdate from '../../../src/commands/crm/leads/update.js'
import CrmLeadsDelete from '../../../src/commands/crm/leads/delete.js'
import CrmContactsCreate from '../../../src/commands/crm/contacts/create.js'
import CrmContactsUpdate from '../../../src/commands/crm/contacts/update.js'
import CrmContactsDelete from '../../../src/commands/crm/contacts/delete.js'
import CrmDealsCreate from '../../../src/commands/crm/deals/create.js'
import CrmDealsUpdate from '../../../src/commands/crm/deals/update.js'
import CrmDealsDelete from '../../../src/commands/crm/deals/delete.js'
import CrmAccountsCreate from '../../../src/commands/crm/accounts/create.js'
import CrmAccountsUpdate from '../../../src/commands/crm/accounts/update.js'
import CrmAccountsDelete from '../../../src/commands/crm/accounts/delete.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

const createCommands = [
  ['crm leads create', CrmLeadsCreate],
  ['crm contacts create', CrmContactsCreate],
  ['crm deals create', CrmDealsCreate],
  ['crm accounts create', CrmAccountsCreate],
] as const

const updateCommands = [
  ['crm leads update', CrmLeadsUpdate],
  ['crm contacts update', CrmContactsUpdate],
  ['crm deals update', CrmDealsUpdate],
  ['crm accounts update', CrmAccountsUpdate],
] as const

const deleteCommands = [
  ['crm leads delete', CrmLeadsDelete],
  ['crm contacts delete', CrmContactsDelete],
  ['crm deals delete', CrmDealsDelete],
  ['crm accounts delete', CrmAccountsDelete],
] as const

describe.each(createCommands)('%s', (id, Cmd) => {
  it('has correct id and inherits from CrmBaseCommand', () => {
    expect(Cmd.id).toBe(id)
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, Cmd)).toBe(true)
  })

  it('has --json (preferred) and --data (alias) flags', () => {
    expect(Cmd.flags.json).toBeDefined()
    expect(Cmd.flags.json.char).toBe('j')
    expect(Cmd.flags.data).toBeDefined()
    expect(Cmd.flags.data.char).toBe('d')
  })

  it('has --dry-run flag', () => {
    expect(Cmd.flags['dry-run']).toBeDefined()
    expect(Cmd.flags['dry-run'].default).toBe(false)
  })

  it('has summary and examples', () => {
    expect(typeof Cmd.summary).toBe('string')
    expect(Cmd.summary.length).toBeGreaterThan(0)
    expect((Cmd.examples as string[]).length).toBeGreaterThan(0)
  })
})

describe.each(updateCommands)('%s', (id, Cmd) => {
  it('has correct id and inherits from CrmBaseCommand', () => {
    expect(Cmd.id).toBe(id)
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, Cmd)).toBe(true)
  })

  it('requires --id flag', () => {
    expect(Cmd.flags.id).toBeDefined()
    expect(Cmd.flags.id.required).toBe(true)
  })

  it('has --json (preferred) and --data (alias) flags', () => {
    expect(Cmd.flags.json).toBeDefined()
    expect(Cmd.flags.data).toBeDefined()
  })

  it('has --dry-run flag', () => {
    expect(Cmd.flags['dry-run']).toBeDefined()
    expect(Cmd.flags['dry-run'].default).toBe(false)
  })
})

describe.each(deleteCommands)('%s', (id, Cmd) => {
  it('has correct id and inherits from CrmBaseCommand', () => {
    expect(Cmd.id).toBe(id)
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, Cmd)).toBe(true)
  })

  it('requires --id flag', () => {
    expect(Cmd.flags.id).toBeDefined()
    expect(Cmd.flags.id.required).toBe(true)
  })

  it('has --dry-run flag', () => {
    expect(Cmd.flags['dry-run']).toBeDefined()
    expect(Cmd.flags['dry-run'].default).toBe(false)
  })
})
