import { describe, it, expect } from 'vitest'
import ProjectsList from '../../../src/commands/books/projects/list.js'
import ProjectsGet from '../../../src/commands/books/projects/get.js'
import ProjectsCreate from '../../../src/commands/books/projects/create.js'
import ProjectsUpdate from '../../../src/commands/books/projects/update.js'
import ProjectsDelete from '../../../src/commands/books/projects/delete.js'
import ProjectsClone from '../../../src/commands/books/projects/clone.js'
import ProjectsActivate from '../../../src/commands/books/projects/activate.js'
import ProjectsDeactivate from '../../../src/commands/books/projects/deactivate.js'

describe('books projects list', () => {
  it('has correct command id', () => { expect(ProjectsList.id).toBe('books projects list') })
  it('supports --customer-id flag', () => { expect(ProjectsList.flags['customer-id']).toBeDefined() })
  it('supports --page flag', () => { expect(ProjectsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ProjectsList.flags['per-page']).toBeDefined() })
})

describe('books projects get', () => {
  it('has correct command id', () => { expect(ProjectsGet.id).toBe('books projects get') })
  it('requires id arg', () => { expect(ProjectsGet.args.id.required).toBe(true) })
})

describe('books projects create', () => {
  it('has correct command id', () => { expect(ProjectsCreate.id).toBe('books projects create') })
  it('requires --data flag', () => { expect(ProjectsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsCreate.flags['dry-run']).toBeDefined() })
})

describe('books projects update', () => {
  it('has correct command id', () => { expect(ProjectsUpdate.id).toBe('books projects update') })
  it('requires id arg', () => { expect(ProjectsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ProjectsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books projects delete', () => {
  it('has correct command id', () => { expect(ProjectsDelete.id).toBe('books projects delete') })
  it('requires id arg', () => { expect(ProjectsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsDelete.flags['dry-run']).toBeDefined() })
})

describe('books projects clone', () => {
  it('has correct command id', () => { expect(ProjectsClone.id).toBe('books projects clone') })
  it('requires id arg', () => { expect(ProjectsClone.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsClone.flags['dry-run']).toBeDefined() })
})

describe('books projects activate', () => {
  it('has correct command id', () => { expect(ProjectsActivate.id).toBe('books projects activate') })
  it('requires id arg', () => { expect(ProjectsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsActivate.flags['dry-run']).toBeDefined() })
})

describe('books projects deactivate', () => {
  it('has correct command id', () => { expect(ProjectsDeactivate.id).toBe('books projects deactivate') })
  it('requires id arg', () => { expect(ProjectsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ProjectsDeactivate.flags['dry-run']).toBeDefined() })
})
