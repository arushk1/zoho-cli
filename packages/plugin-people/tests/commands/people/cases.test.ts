import { describe, it, expect } from 'vitest'
import CasesList from '../../../src/commands/people/cases/list.js'
import CasesMy from '../../../src/commands/people/cases/my.js'
import CasesView from '../../../src/commands/people/cases/view.js'
import CasesAdd from '../../../src/commands/people/cases/add.js'
import CasesCategories from '../../../src/commands/people/cases/categories.js'

describe('people cases list', () => {
  it('has correct command id', () => {
    expect(CasesList.id).toBe('people cases list')
  })

  it('has a summary', () => {
    expect(CasesList.summary).toBeTruthy()
  })

  it('supports --status flag', () => {
    expect(CasesList.flags.status).toBeDefined()
  })

  it('supports --category flag', () => {
    expect(CasesList.flags.category).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(CasesList.flags.page).toBeDefined()
  })
})

describe('people cases my', () => {
  it('has correct command id', () => {
    expect(CasesMy.id).toBe('people cases my')
  })

  it('has a summary', () => {
    expect(CasesMy.summary).toBeTruthy()
  })

  it('supports --status flag', () => {
    expect(CasesMy.flags.status).toBeDefined()
  })

  it('supports --page flag', () => {
    expect(CasesMy.flags.page).toBeDefined()
  })
})

describe('people cases view', () => {
  it('has correct command id', () => {
    expect(CasesView.id).toBe('people cases view')
  })

  it('has a summary', () => {
    expect(CasesView.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(CasesView.args.id.required).toBe(true)
  })
})

describe('people cases add', () => {
  it('has correct command id', () => {
    expect(CasesAdd.id).toBe('people cases add')
  })

  it('has a summary', () => {
    expect(CasesAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(CasesAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CasesAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people cases categories', () => {
  it('has correct command id', () => {
    expect(CasesCategories.id).toBe('people cases categories')
  })

  it('has a summary', () => {
    expect(CasesCategories.summary).toBeTruthy()
  })
})
