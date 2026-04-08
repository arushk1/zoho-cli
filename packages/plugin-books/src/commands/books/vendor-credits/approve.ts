import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsApprove extends BooksBaseCommand<typeof BooksVendorCreditsApprove> {
  static id = 'books vendor-credits approve'
  static summary = 'Approve a vendor credit'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/vendorcredits/${args.id}/approve` })
        return
      }
      const data = await this.booksPost(`/vendorcredits/${args.id}/approve`)
      this.outputSuccess(data, { action: 'books.vendor-credits.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
