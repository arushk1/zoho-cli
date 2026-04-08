import { describe, it, expect } from 'vitest'
import JournalsList from '../../../src/commands/books/journals/list.js'
import JournalsGet from '../../../src/commands/books/journals/get.js'
import JournalsCreate from '../../../src/commands/books/journals/create.js'
import JournalsUpdate from '../../../src/commands/books/journals/update.js'
import JournalsDelete from '../../../src/commands/books/journals/delete.js'
import JournalsPublish from '../../../src/commands/books/journals/publish.js'

describe('books journals list', () => {
  it('has correct command id', () => { expect(JournalsList.id).toBe('books journals list') })
  it('supports --page flag', () => { expect(JournalsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(JournalsList.flags['per-page']).toBeDefined() })
})

describe('books journals get', () => {
  it('has correct command id', () => { expect(JournalsGet.id).toBe('books journals get') })
  it('requires id arg', () => { expect(JournalsGet.args.id.required).toBe(true) })
})

describe('books journals create', () => {
  it('has correct command id', () => { expect(JournalsCreate.id).toBe('books journals create') })
  it('requires --data flag', () => { expect(JournalsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(JournalsCreate.flags['dry-run']).toBeDefined() })
})

describe('books journals update', () => {
  it('has correct command id', () => { expect(JournalsUpdate.id).toBe('books journals update') })
  it('requires id arg', () => { expect(JournalsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(JournalsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(JournalsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books journals delete', () => {
  it('has correct command id', () => { expect(JournalsDelete.id).toBe('books journals delete') })
  it('requires id arg', () => { expect(JournalsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(JournalsDelete.flags['dry-run']).toBeDefined() })
})

describe('books journals publish', () => {
  it('has correct command id', () => { expect(JournalsPublish.id).toBe('books journals publish') })
  it('requires id arg', () => { expect(JournalsPublish.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(JournalsPublish.flags['dry-run']).toBeDefined() })
})
