import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsOpen extends BooksBaseCommand<typeof BooksVendorCreditsOpen> {
  static id = 'books vendor-credits open'
  static summary = 'Mark a vendor credit as open'

  static args = {
    id: Args.string({ description: 'Vendor Credit ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/vendorcredits/${args.id}/status/open` })
        return
      }
      const data = await this.booksPost(`/vendorcredits/${args.id}/status/open`)
      this.outputSuccess(data, { action: 'books.vendor-credits.open' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
