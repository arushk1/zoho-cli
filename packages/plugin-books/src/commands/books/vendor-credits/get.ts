import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsGet extends BooksBaseCommand<typeof BooksVendorCreditsGet> {
  static id = 'books vendor-credits get'
  static summary = 'Get a vendor credit by ID'

  static args = {
    id: Args.string({ description: 'Vendor Credit ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/vendorcredits/${args.id}`)
      this.outputSuccess(data.vendor_credit ?? data, { action: 'books.vendor-credits.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
