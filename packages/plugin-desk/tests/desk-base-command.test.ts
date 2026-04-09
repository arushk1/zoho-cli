import { describe, it, expect } from 'vitest'
import { DeskBaseCommand } from '../src/desk-base-command.js'

describe('DeskBaseCommand', () => {
  describe('paginationParams', () => {
    it('converts page 1 to from=1', () => {
      const result = DeskBaseCommand.paginationParams({ page: 1, 'per-page': 100 })
      expect(result).toEqual({ from: '1', limit: '100' })
    })

    it('converts page 2 with per-page 50 to from=51', () => {
      const result = DeskBaseCommand.paginationParams({ page: 2, 'per-page': 50 })
      expect(result).toEqual({ from: '51', limit: '50' })
    })

    it('converts page 3 with per-page 100 to from=201', () => {
      const result = DeskBaseCommand.paginationParams({ page: 3, 'per-page': 100 })
      expect(result).toEqual({ from: '201', limit: '100' })
    })

    it('converts page 1 with per-page 10 to from=1', () => {
      const result = DeskBaseCommand.paginationParams({ page: 1, 'per-page': 10 })
      expect(result).toEqual({ from: '1', limit: '10' })
    })
  })

  describe('baseFlags', () => {
    it('has pretty flag defaulting to false', () => {
      expect(DeskBaseCommand.baseFlags.pretty).toBeDefined()
    })

    it('has org flag with env ZOHO_DESK_ORG_ID', () => {
      expect(DeskBaseCommand.baseFlags.org).toBeDefined()
    })
  })
})
