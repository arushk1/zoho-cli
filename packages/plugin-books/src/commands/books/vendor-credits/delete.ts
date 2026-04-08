import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsDelete extends BooksBaseCommand<typeof BooksVendorCreditsDelete> {
  static id = 'books vendor-credits delete'
  static summary = 'Delete a vendor credit'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/vendorcredits/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/vendorcredits/${args.id}`)
      this.outputSuccess(data, { action: 'books.vendor-credits.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
