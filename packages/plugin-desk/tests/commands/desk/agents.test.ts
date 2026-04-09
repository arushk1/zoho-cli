import { describe, it, expect } from 'vitest'
import DeskAgentsList from '../../../src/commands/desk/agents/list.js'
import DeskAgentsGet from '../../../src/commands/desk/agents/get.js'
import DeskAgentsCreate from '../../../src/commands/desk/agents/create.js'
import DeskAgentsUpdate from '../../../src/commands/desk/agents/update.js'
import DeskAgentsDelete from '../../../src/commands/desk/agents/delete.js'
import DeskAgentsMe from '../../../src/commands/desk/agents/me.js'
import DeskAgentsCount from '../../../src/commands/desk/agents/count.js'
import DeskAgentsActivate from '../../../src/commands/desk/agents/activate.js'

describe('desk agents list', () => {
  it('has correct command id', () => { expect(DeskAgentsList.id).toBe('desk agents list') })
  it('has summary', () => { expect(DeskAgentsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskAgentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskAgentsList.flags['per-page']).toBeDefined() })
  it('supports --department flag', () => { expect(DeskAgentsList.flags.department).toBeDefined() })
  it('supports --status flag', () => { expect(DeskAgentsList.flags.status).toBeDefined() })
})

describe('desk agents get', () => {
  it('has correct command id', () => { expect(DeskAgentsGet.id).toBe('desk agents get') })
  it('has summary', () => { expect(DeskAgentsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAgentsGet.args.id.required).toBe(true) })
})

describe('desk agents create', () => {
  it('has correct command id', () => { expect(DeskAgentsCreate.id).toBe('desk agents create') })
  it('has summary', () => { expect(DeskAgentsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskAgentsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskAgentsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk agents update', () => {
  it('has correct command id', () => { expect(DeskAgentsUpdate.id).toBe('desk agents update') })
  it('has summary', () => { expect(DeskAgentsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAgentsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskAgentsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskAgentsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk agents delete', () => {
  it('has correct command id', () => { expect(DeskAgentsDelete.id).toBe('desk agents delete') })
  it('has summary', () => { expect(DeskAgentsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAgentsDelete.args.id.required).toBe(true) })
})

describe('desk agents me', () => {
  it('has correct command id', () => { expect(DeskAgentsMe.id).toBe('desk agents me') })
  it('has summary', () => { expect(DeskAgentsMe.summary).toBeDefined() })
  it('has no required args', () => { expect(Object.keys(DeskAgentsMe.args ?? {}).length).toBe(0) })
})

describe('desk agents count', () => {
  it('has correct command id', () => { expect(DeskAgentsCount.id).toBe('desk agents count') })
  it('has summary', () => { expect(DeskAgentsCount.summary).toBeDefined() })
})

describe('desk agents activate', () => {
  it('has correct command id', () => { expect(DeskAgentsActivate.id).toBe('desk agents activate') })
  it('has summary', () => { expect(DeskAgentsActivate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskAgentsActivate.args.id.required).toBe(true) })
})
