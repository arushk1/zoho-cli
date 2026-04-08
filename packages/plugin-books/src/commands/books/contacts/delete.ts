import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactsDelete extends BooksBaseCommand<typeof BooksContactsDelete> {
  static id = 'books contacts delete'
  static summary = 'Delete a contact'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/contacts/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/contacts/${args.id}`)
      this.outputSuccess(data, { action: 'books.contacts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
