import { describe, it, expect } from 'vitest'
import DeskKbSectionsList from '../../../src/commands/desk/kb-sections/list.js'
import DeskKbSectionsGet from '../../../src/commands/desk/kb-sections/get.js'
import DeskKbSectionsCreate from '../../../src/commands/desk/kb-sections/create.js'

describe('desk kb-sections list', () => {
  it('has correct command id', () => { expect(DeskKbSectionsList.id).toBe('desk kb-sections list') })
  it('has summary', () => { expect(DeskKbSectionsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskKbSectionsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskKbSectionsList.flags['per-page']).toBeDefined() })
  it('supports --category-id flag', () => { expect(DeskKbSectionsList.flags['category-id']).toBeDefined() })
})

describe('desk kb-sections get', () => {
  it('has correct command id', () => { expect(DeskKbSectionsGet.id).toBe('desk kb-sections get') })
  it('has summary', () => { expect(DeskKbSectionsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskKbSectionsGet.args.id.required).toBe(true) })
})

describe('desk kb-sections create', () => {
  it('has correct command id', () => { expect(DeskKbSectionsCreate.id).toBe('desk kb-sections create') })
  it('has summary', () => { expect(DeskKbSectionsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskKbSectionsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskKbSectionsCreate.flags['dry-run']).toBeDefined() })
})
