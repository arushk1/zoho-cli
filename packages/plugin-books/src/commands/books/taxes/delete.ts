import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTaxesDelete extends BooksBaseCommand<typeof BooksTaxesDelete> {
  static id = 'books taxes delete'
  static summary = 'Delete a tax'

  static args = {
    id: Args.string({ description: 'Tax ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/settings/taxes/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/settings/taxes/${args.id}`)
      this.outputSuccess(data, { action: 'books.taxes.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
