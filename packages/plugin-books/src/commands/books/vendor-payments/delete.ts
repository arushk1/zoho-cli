import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorPaymentsDelete extends BooksBaseCommand<typeof BooksVendorPaymentsDelete> {
  static id = 'books vendor-payments delete'
  static summary = 'Delete a vendor payment'

  static args = {
    id: Args.string({ description: 'Vendor payment ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/vendorpayments/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/vendorpayments/${args.id}`)
      this.outputSuccess(data, { action: 'books.vendor-payments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
