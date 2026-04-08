import { describe, it, expect } from 'vitest'
import ProjectsList from '../../../src/commands/expense/projects/list.js'
import ProjectsGet from '../../../src/commands/expense/projects/get.js'
import ProjectsCreate from '../../../src/commands/expense/projects/create.js'
import ProjectsUpdate from '../../../src/commands/expense/projects/update.js'
import ProjectsDelete from '../../../src/commands/expense/projects/delete.js'
import ProjectsActivate from '../../../src/commands/expense/projects/activate.js'
import ProjectsDeactivate from '../../../src/commands/expense/projects/deactivate.js'

describe('expense projects list', () => {
  it('has correct command id', () => { expect(ProjectsList.id).toBe('expense projects list') })
  it('supports --page flag', () => { expect(ProjectsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ProjectsList.flags['per-page']).toBeDefined() })
})

describe('expense projects get', () => {
  it('has correct command id', () => { expect(ProjectsGet.id).toBe('expense projects get') })
  it('requires id arg', () => { expect(ProjectsGet.args.id.required).toBe(true) })
})

describe('expense projects create', () => {
  it('has correct command id', () => { expect(ProjectsCreate.id).toBe('expense projects create') })
  it('requires --data flag', () => { expect(ProjectsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsCreate.flags['dry-run']).toBeDefined() })
})

describe('expense projects update', () => {
  it('has correct command id', () => { expect(ProjectsUpdate.id).toBe('expense projects update') })
  it('requires id arg', () => { expect(ProjectsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ProjectsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense projects delete', () => {
  it('has correct command id', () => { expect(ProjectsDelete.id).toBe('expense projects delete') })
  it('requires id arg', () => { expect(ProjectsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsDelete.flags['dry-run']).toBeDefined() })
})

describe('expense projects activate', () => {
  it('has correct command id', () => { expect(ProjectsActivate.id).toBe('expense projects activate') })
  it('requires id arg', () => { expect(ProjectsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsActivate.flags['dry-run']).toBeDefined() })
})

describe('expense projects deactivate', () => {
  it('has correct command id', () => { expect(ProjectsDeactivate.id).toBe('expense projects deactivate') })
  it('requires id arg', () => { expect(ProjectsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsDeactivate.flags['dry-run']).toBeDefined() })
})
