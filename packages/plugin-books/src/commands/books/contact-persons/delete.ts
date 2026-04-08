import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactPersonsDelete extends BooksBaseCommand<typeof BooksContactPersonsDelete> {
  static id = 'books contact-persons delete'
  static summary = 'Delete a contact person'

  static args = {
    id: Args.string({ description: 'Contact person ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/contacts/contactpersons/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/contacts/contactpersons/${args.id}`)
      this.outputSuccess(data, { action: 'books.contact-persons.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
