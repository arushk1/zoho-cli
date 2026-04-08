import { describe, it, expect } from 'vitest'
import FormsList from '../../../src/commands/people/forms/list.js'
import FormsFields from '../../../src/commands/people/forms/fields.js'
import FormsInsert from '../../../src/commands/people/forms/insert.js'
import FormsUpdate from '../../../src/commands/people/forms/update.js'
import FormsGet from '../../../src/commands/people/forms/get.js'
import FormsSearch from '../../../src/commands/people/forms/search.js'

describe('people forms list', () => {
  it('has correct command id', () => {
    expect(FormsList.id).toBe('people forms list')
  })

  it('has a summary', () => {
    expect(FormsList.summary).toBeTruthy()
  })
})

describe('people forms fields', () => {
  it('has correct command id', () => {
    expect(FormsFields.id).toBe('people forms fields')
  })

  it('has a summary', () => {
    expect(FormsFields.summary).toBeTruthy()
  })

  it('requires form arg', () => {
    expect(FormsFields.args.form.required).toBe(true)
  })
})

describe('people forms insert', () => {
  it('has correct command id', () => {
    expect(FormsInsert.id).toBe('people forms insert')
  })

  it('has a summary', () => {
    expect(FormsInsert.summary).toBeTruthy()
  })

  it('requires form arg', () => {
    expect(FormsInsert.args.form.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(FormsInsert.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(FormsInsert.flags['dry-run']).toBeDefined()
  })
})

describe('people forms update', () => {
  it('has correct command id', () => {
    expect(FormsUpdate.id).toBe('people forms update')
  })

  it('has a summary', () => {
    expect(FormsUpdate.summary).toBeTruthy()
  })

  it('requires form arg', () => {
    expect(FormsUpdate.args.form.required).toBe(true)
  })

  it('requires --record-id flag', () => {
    expect(FormsUpdate.flags['record-id'].required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(FormsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(FormsUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people forms get', () => {
  it('has correct command id', () => {
    expect(FormsGet.id).toBe('people forms get')
  })

  it('has a summary', () => {
    expect(FormsGet.summary).toBeTruthy()
  })

  it('requires form arg', () => {
    expect(FormsGet.args.form.required).toBe(true)
  })

  it('requires --record-id flag', () => {
    expect(FormsGet.flags['record-id'].required).toBe(true)
  })
})

describe('people forms search', () => {
  it('has correct command id', () => {
    expect(FormsSearch.id).toBe('people forms search')
  })

  it('has a summary', () => {
    expect(FormsSearch.summary).toBeTruthy()
  })

  it('requires form arg', () => {
    expect(FormsSearch.args.form.required).toBe(true)
  })

  it('requires --search-params flag', () => {
    expect(FormsSearch.flags['search-params'].required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(FormsSearch.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(FormsSearch.flags['per-page']).toBeDefined()
  })
})
