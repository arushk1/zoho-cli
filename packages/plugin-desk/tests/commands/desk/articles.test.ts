import { describe, it, expect } from 'vitest'
import DeskArticlesList from '../../../src/commands/desk/articles/list.js'
import DeskArticlesGet from '../../../src/commands/desk/articles/get.js'
import DeskArticlesCreate from '../../../src/commands/desk/articles/create.js'
import DeskArticlesUpdate from '../../../src/commands/desk/articles/update.js'
import DeskArticlesDelete from '../../../src/commands/desk/articles/delete.js'
import DeskArticlesSearch from '../../../src/commands/desk/articles/search.js'
import DeskArticlesCount from '../../../src/commands/desk/articles/count.js'

describe('desk articles list', () => {
  it('has correct command id', () => { expect(DeskArticlesList.id).toBe('desk articles list') })
  it('has summary', () => { expect(DeskArticlesList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskArticlesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskArticlesList.flags['per-page']).toBeDefined() })
  it('supports --category-id flag', () => { expect(DeskArticlesList.flags['category-id']).toBeDefined() })
  it('supports --section-id flag', () => { expect(DeskArticlesList.flags['section-id']).toBeDefined() })
  it('supports --status flag', () => { expect(DeskArticlesList.flags.status).toBeDefined() })
})

describe('desk articles get', () => {
  it('has correct command id', () => { expect(DeskArticlesGet.id).toBe('desk articles get') })
  it('has summary', () => { expect(DeskArticlesGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskArticlesGet.args.id.required).toBe(true) })
})

describe('desk articles create', () => {
  it('has correct command id', () => { expect(DeskArticlesCreate.id).toBe('desk articles create') })
  it('has summary', () => { expect(DeskArticlesCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskArticlesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskArticlesCreate.flags['dry-run']).toBeDefined() })
})

describe('desk articles update', () => {
  it('has correct command id', () => { expect(DeskArticlesUpdate.id).toBe('desk articles update') })
  it('has summary', () => { expect(DeskArticlesUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskArticlesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskArticlesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskArticlesUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk articles delete', () => {
  it('has correct command id', () => { expect(DeskArticlesDelete.id).toBe('desk articles delete') })
  it('has summary', () => { expect(DeskArticlesDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskArticlesDelete.args.id.required).toBe(true) })
})

describe('desk articles search', () => {
  it('has correct command id', () => { expect(DeskArticlesSearch.id).toBe('desk articles search') })
  it('has summary', () => { expect(DeskArticlesSearch.summary).toBeDefined() })
  it('requires --query flag', () => { expect(DeskArticlesSearch.flags.query.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskArticlesSearch.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskArticlesSearch.flags['per-page']).toBeDefined() })
})

describe('desk articles count', () => {
  it('has correct command id', () => { expect(DeskArticlesCount.id).toBe('desk articles count') })
  it('has summary', () => { expect(DeskArticlesCount.summary).toBeDefined() })
})
