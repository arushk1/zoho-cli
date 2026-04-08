import { describe, it, expect } from 'vitest'
import OrganizationsList from '../../../src/commands/books/organizations/list.js'
import OrganizationsGet from '../../../src/commands/books/organizations/get.js'

describe('books organizations list', () => {
  it('has correct command id', () => { expect(OrganizationsList.id).toBe('books organizations list') })
})

describe('books organizations get', () => {
  it('has correct command id', () => { expect(OrganizationsGet.id).toBe('books organizations get') })
  it('requires id arg', () => { expect(OrganizationsGet.args.id.required).toBe(true) })
})
