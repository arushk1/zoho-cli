import { describe, it, expect } from 'vitest'
import DeskOrganizationsList from '../../../src/commands/desk/organizations/list.js'
import DeskOrganizationsGet from '../../../src/commands/desk/organizations/get.js'
import DeskRolesList from '../../../src/commands/desk/roles/list.js'
import DeskRolesGet from '../../../src/commands/desk/roles/get.js'
import DeskProfilesList from '../../../src/commands/desk/profiles/list.js'
import DeskProfilesGet from '../../../src/commands/desk/profiles/get.js'
import DeskTeamsList from '../../../src/commands/desk/teams/list.js'
import DeskTeamsGet from '../../../src/commands/desk/teams/get.js'
import DeskSlaList from '../../../src/commands/desk/sla/list.js'
import DeskSlaGet from '../../../src/commands/desk/sla/get.js'
import DeskBusinessHoursList from '../../../src/commands/desk/business-hours/list.js'
import DeskBusinessHoursGet from '../../../src/commands/desk/business-hours/get.js'
import DeskFieldsList from '../../../src/commands/desk/fields/list.js'
import DeskLayoutsList from '../../../src/commands/desk/layouts/list.js'
import DeskLayoutsGet from '../../../src/commands/desk/layouts/get.js'
import DeskBlueprintsList from '../../../src/commands/desk/blueprints/list.js'

describe('desk organizations list', () => {
  it('has correct command id', () => { expect(DeskOrganizationsList.id).toBe('desk organizations list') })
  it('has summary', () => { expect(DeskOrganizationsList.summary).toBeDefined() })
})

describe('desk organizations get', () => {
  it('has correct command id', () => { expect(DeskOrganizationsGet.id).toBe('desk organizations get') })
  it('has summary', () => { expect(DeskOrganizationsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskOrganizationsGet.args.id.required).toBe(true) })
})

describe('desk roles list', () => {
  it('has correct command id', () => { expect(DeskRolesList.id).toBe('desk roles list') })
  it('has summary', () => { expect(DeskRolesList.summary).toBeDefined() })
})

describe('desk roles get', () => {
  it('has correct command id', () => { expect(DeskRolesGet.id).toBe('desk roles get') })
  it('has summary', () => { expect(DeskRolesGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskRolesGet.args.id.required).toBe(true) })
})

describe('desk profiles list', () => {
  it('has correct command id', () => { expect(DeskProfilesList.id).toBe('desk profiles list') })
  it('has summary', () => { expect(DeskProfilesList.summary).toBeDefined() })
})

describe('desk profiles get', () => {
  it('has correct command id', () => { expect(DeskProfilesGet.id).toBe('desk profiles get') })
  it('has summary', () => { expect(DeskProfilesGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskProfilesGet.args.id.required).toBe(true) })
})

describe('desk teams list', () => {
  it('has correct command id', () => { expect(DeskTeamsList.id).toBe('desk teams list') })
  it('has summary', () => { expect(DeskTeamsList.summary).toBeDefined() })
})

describe('desk teams get', () => {
  it('has correct command id', () => { expect(DeskTeamsGet.id).toBe('desk teams get') })
  it('has summary', () => { expect(DeskTeamsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTeamsGet.args.id.required).toBe(true) })
})

describe('desk sla list', () => {
  it('has correct command id', () => { expect(DeskSlaList.id).toBe('desk sla list') })
  it('has summary', () => { expect(DeskSlaList.summary).toBeDefined() })
})

describe('desk sla get', () => {
  it('has correct command id', () => { expect(DeskSlaGet.id).toBe('desk sla get') })
  it('has summary', () => { expect(DeskSlaGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskSlaGet.args.id.required).toBe(true) })
})

describe('desk business-hours list', () => {
  it('has correct command id', () => { expect(DeskBusinessHoursList.id).toBe('desk business-hours list') })
  it('has summary', () => { expect(DeskBusinessHoursList.summary).toBeDefined() })
})

describe('desk business-hours get', () => {
  it('has correct command id', () => { expect(DeskBusinessHoursGet.id).toBe('desk business-hours get') })
  it('has summary', () => { expect(DeskBusinessHoursGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskBusinessHoursGet.args.id.required).toBe(true) })
})

describe('desk fields list', () => {
  it('has correct command id', () => { expect(DeskFieldsList.id).toBe('desk fields list') })
  it('has summary', () => { expect(DeskFieldsList.summary).toBeDefined() })
  it('supports --module flag', () => { expect(DeskFieldsList.flags.module).toBeDefined() })
  it('has default module of tickets', () => { expect(DeskFieldsList.flags.module.default).toBe('tickets') })
})

describe('desk layouts list', () => {
  it('has correct command id', () => { expect(DeskLayoutsList.id).toBe('desk layouts list') })
  it('has summary', () => { expect(DeskLayoutsList.summary).toBeDefined() })
  it('supports --department flag', () => { expect(DeskLayoutsList.flags.department).toBeDefined() })
})

describe('desk layouts get', () => {
  it('has correct command id', () => { expect(DeskLayoutsGet.id).toBe('desk layouts get') })
  it('has summary', () => { expect(DeskLayoutsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskLayoutsGet.args.id.required).toBe(true) })
})

describe('desk blueprints list', () => {
  it('has correct command id', () => { expect(DeskBlueprintsList.id).toBe('desk blueprints list') })
  it('has summary', () => { expect(DeskBlueprintsList.summary).toBeDefined() })
  it('supports --department flag', () => { expect(DeskBlueprintsList.flags.department).toBeDefined() })
})
