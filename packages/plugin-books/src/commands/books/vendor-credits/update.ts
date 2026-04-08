import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsUpdate extends BooksBaseCommand<typeof BooksVendorCreditsUpdate> {
  static id = 'books vendor-credits update'
  static summary = 'Update a vendor credit'

  static args = {
    id: Args.string({ description: 'Vendor Credit ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/vendorcredits/${args.id}`, body })
        return
      }
      const data = await this.booksPut(`/vendorcredits/${args.id}`, body)
      this.outputSuccess(data.vendor_credit ?? data, { action: 'books.vendor-credits.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
