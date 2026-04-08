import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactsActivate extends BooksBaseCommand<typeof BooksContactsActivate> {
  static id = 'books contacts activate'
  static summary = 'Mark a contact as active'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/contacts/${args.id}/active` })
        return
      }
      const data = await this.booksPost(`/contacts/${args.id}/active`)
      this.outputSuccess(data, { action: 'books.contacts.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
