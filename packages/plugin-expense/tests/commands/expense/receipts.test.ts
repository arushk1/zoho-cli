import { describe, it, expect } from 'vitest'
import ReceiptsUpload from '../../../src/commands/expense/receipts/upload.js'

describe('expense receipts upload', () => {
  it('has correct command id', () => { expect(ReceiptsUpload.id).toBe('expense receipts upload') })
  it('has a summary', () => { expect(ReceiptsUpload.summary).toBeDefined() })
  it('requires --file flag', () => { expect(ReceiptsUpload.flags.file.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ReceiptsUpload.flags['dry-run']).toBeDefined() })
})
