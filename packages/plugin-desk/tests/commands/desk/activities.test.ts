import { describe, it, expect } from 'vitest'
import DeskActivitiesList from '../../../src/commands/desk/activities/list.js'
import DeskActivitiesCount from '../../../src/commands/desk/activities/count.js'

describe('desk activities list', () => {
  it('has correct command id', () => { expect(DeskActivitiesList.id).toBe('desk activities list') })
  it('has summary', () => { expect(DeskActivitiesList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskActivitiesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskActivitiesList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskActivitiesList.flags.department).toBeDefined() })
  it('supports --type filter', () => { expect(DeskActivitiesList.flags.type).toBeDefined() })
})

describe('desk activities count', () => {
  it('has correct command id', () => { expect(DeskActivitiesCount.id).toBe('desk activities count') })
  it('has summary', () => { expect(DeskActivitiesCount.summary).toBeDefined() })
})
