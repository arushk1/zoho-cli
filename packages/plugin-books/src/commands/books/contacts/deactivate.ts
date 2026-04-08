import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactsDeactivate extends BooksBaseCommand<typeof BooksContactsDeactivate> {
  static id = 'books contacts deactivate'
  static summary = 'Mark a contact as inactive'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/contacts/${args.id}/inactive` })
        return
      }
      const data = await this.booksPost(`/contacts/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'books.contacts.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
