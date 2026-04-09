import { describe, it, expect } from 'vitest'
import DeskDepartmentsList from '../../../src/commands/desk/departments/list.js'
import DeskDepartmentsGet from '../../../src/commands/desk/departments/get.js'
import DeskDepartmentsCreate from '../../../src/commands/desk/departments/create.js'
import DeskDepartmentsUpdate from '../../../src/commands/desk/departments/update.js'
import DeskDepartmentsDelete from '../../../src/commands/desk/departments/delete.js'

describe('desk departments list', () => {
  it('has correct command id', () => { expect(DeskDepartmentsList.id).toBe('desk departments list') })
  it('has summary', () => { expect(DeskDepartmentsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskDepartmentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskDepartmentsList.flags['per-page']).toBeDefined() })
})

describe('desk departments get', () => {
  it('has correct command id', () => { expect(DeskDepartmentsGet.id).toBe('desk departments get') })
  it('has summary', () => { expect(DeskDepartmentsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskDepartmentsGet.args.id.required).toBe(true) })
})

describe('desk departments create', () => {
  it('has correct command id', () => { expect(DeskDepartmentsCreate.id).toBe('desk departments create') })
  it('has summary', () => { expect(DeskDepartmentsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskDepartmentsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskDepartmentsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk departments update', () => {
  it('has correct command id', () => { expect(DeskDepartmentsUpdate.id).toBe('desk departments update') })
  it('has summary', () => { expect(DeskDepartmentsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskDepartmentsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskDepartmentsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskDepartmentsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk departments delete', () => {
  it('has correct command id', () => { expect(DeskDepartmentsDelete.id).toBe('desk departments delete') })
  it('has summary', () => { expect(DeskDepartmentsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskDepartmentsDelete.args.id.required).toBe(true) })
})
