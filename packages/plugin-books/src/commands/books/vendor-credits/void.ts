import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsVoid extends BooksBaseCommand<typeof BooksVendorCreditsVoid> {
  static id = 'books vendor-credits void'
  static summary = 'Void a vendor credit'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/vendorcredits/${args.id}/status/void` })
        return
      }
      const data = await this.booksPost(`/vendorcredits/${args.id}/status/void`)
      this.outputSuccess(data, { action: 'books.vendor-credits.void' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
