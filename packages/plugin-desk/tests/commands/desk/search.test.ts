import { describe, it, expect } from 'vitest'
import DeskSearch from '../../../src/commands/desk/search.js'

describe('desk search', () => {
  it('has correct command id', () => { expect(DeskSearch.id).toBe('desk search') })
  it('has summary', () => { expect(DeskSearch.summary).toBeDefined() })
  it('requires --query flag', () => { expect(DeskSearch.flags.query.required).toBe(true) })
  it('supports --module flag', () => { expect(DeskSearch.flags.module).toBeDefined() })
  it('supports --page flag', () => { expect(DeskSearch.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskSearch.flags['per-page']).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskSearch.flags['sort-by']).toBeDefined() })
})
