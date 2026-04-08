import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsCreate extends BooksBaseCommand<typeof BooksVendorCreditsCreate> {
  static id = 'books vendor-credits create'
  static summary = 'Create a vendor credit'

  static flags = {
    data: Flags.string({ description: 'JSON object with vendor credit fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/vendorcredits', body })
        return
      }
      const data = await this.booksPost('/vendorcredits', body)
      this.outputSuccess(data.vendor_credit ?? data, { action: 'books.vendor-credits.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
