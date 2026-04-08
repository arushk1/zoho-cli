import { describe, it, expect } from 'vitest'
import EmployeesList from '../../../src/commands/people/employees/list.js'
import EmployeesGet from '../../../src/commands/people/employees/get.js'
import EmployeesAdd from '../../../src/commands/people/employees/add.js'
import EmployeesUpdate from '../../../src/commands/people/employees/update.js'
import EmployeesSearch from '../../../src/commands/people/employees/search.js'

describe('people employees list', () => {
  it('has correct command id', () => {
    expect(EmployeesList.id).toBe('people employees list')
  })

  it('has a summary', () => {
    expect(EmployeesList.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(EmployeesList.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(EmployeesList.flags['per-page']).toBeDefined()
  })

  it('supports --modified-since flag', () => {
    expect(EmployeesList.flags['modified-since']).toBeDefined()
  })
})

describe('people employees get', () => {
  it('has correct command id', () => {
    expect(EmployeesGet.id).toBe('people employees get')
  })

  it('has a summary', () => {
    expect(EmployeesGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(EmployeesGet.args.id.required).toBe(true)
  })
})

describe('people employees add', () => {
  it('has correct command id', () => {
    expect(EmployeesAdd.id).toBe('people employees add')
  })

  it('has a summary', () => {
    expect(EmployeesAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(EmployeesAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(EmployeesAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people employees update', () => {
  it('has correct command id', () => {
    expect(EmployeesUpdate.id).toBe('people employees update')
  })

  it('has a summary', () => {
    expect(EmployeesUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(EmployeesUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(EmployeesUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(EmployeesUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people employees search', () => {
  it('has correct command id', () => {
    expect(EmployeesSearch.id).toBe('people employees search')
  })

  it('has a summary', () => {
    expect(EmployeesSearch.summary).toBeTruthy()
  })

  it('requires --search-params flag', () => {
    expect(EmployeesSearch.flags['search-params'].required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(EmployeesSearch.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(EmployeesSearch.flags['per-page']).toBeDefined()
  })
})
