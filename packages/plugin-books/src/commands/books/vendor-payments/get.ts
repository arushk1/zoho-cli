import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorPaymentsGet extends BooksBaseCommand<typeof BooksVendorPaymentsGet> {
  static id = 'books vendor-payments get'
  static summary = 'Get a vendor payment by ID'

  static args = {
    id: Args.string({ description: 'Vendor payment ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/vendorpayments/${args.id}`)
      this.outputSuccess(data.vendorpayment ?? data, { action: 'books.vendor-payments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
