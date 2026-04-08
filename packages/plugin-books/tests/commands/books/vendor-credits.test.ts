import { describe, it, expect } from 'vitest'
import VendorCreditsList from '../../../src/commands/books/vendor-credits/list.js'
import VendorCreditsGet from '../../../src/commands/books/vendor-credits/get.js'
import VendorCreditsCreate from '../../../src/commands/books/vendor-credits/create.js'
import VendorCreditsUpdate from '../../../src/commands/books/vendor-credits/update.js'
import VendorCreditsDelete from '../../../src/commands/books/vendor-credits/delete.js'
import VendorCreditsVoid from '../../../src/commands/books/vendor-credits/void.js'
import VendorCreditsOpen from '../../../src/commands/books/vendor-credits/open.js'
import VendorCreditsApprove from '../../../src/commands/books/vendor-credits/approve.js'

describe('books vendor-credits list', () => {
  it('has correct command id', () => { expect(VendorCreditsList.id).toBe('books vendor-credits list') })
  it('supports --page flag', () => { expect(VendorCreditsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(VendorCreditsList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(VendorCreditsList.flags.status).toBeDefined() })
  it('supports --vendor-id filter', () => { expect(VendorCreditsList.flags['vendor-id']).toBeDefined() })
})

describe('books vendor-credits get', () => {
  it('has correct command id', () => { expect(VendorCreditsGet.id).toBe('books vendor-credits get') })
  it('requires id arg', () => { expect(VendorCreditsGet.args.id.required).toBe(true) })
})

describe('books vendor-credits create', () => {
  it('has correct command id', () => { expect(VendorCreditsCreate.id).toBe('books vendor-credits create') })
  it('requires --data flag', () => { expect(VendorCreditsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorCreditsCreate.flags['dry-run']).toBeDefined() })
})

describe('books vendor-credits update', () => {
  it('has correct command id', () => { expect(VendorCreditsUpdate.id).toBe('books vendor-credits update') })
  it('requires id arg', () => { expect(VendorCreditsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(VendorCreditsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorCreditsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books vendor-credits delete', () => {
  it('has correct command id', () => { expect(VendorCreditsDelete.id).toBe('books vendor-credits delete') })
  it('requires id arg', () => { expect(VendorCreditsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorCreditsDelete.flags['dry-run']).toBeDefined() })
})

describe('books vendor-credits void', () => {
  it('has correct command id', () => { expect(VendorCreditsVoid.id).toBe('books vendor-credits void') })
  it('requires id arg', () => { expect(VendorCreditsVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorCreditsVoid.flags['dry-run']).toBeDefined() })
})

describe('books vendor-credits open', () => {
  it('has correct command id', () => { expect(VendorCreditsOpen.id).toBe('books vendor-credits open') })
  it('requires id arg', () => { expect(VendorCreditsOpen.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorCreditsOpen.flags['dry-run']).toBeDefined() })
})

describe('books vendor-credits approve', () => {
  it('has correct command id', () => { expect(VendorCreditsApprove.id).toBe('books vendor-credits approve') })
  it('requires id arg', () => { expect(VendorCreditsApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorCreditsApprove.flags['dry-run']).toBeDefined() })
})
