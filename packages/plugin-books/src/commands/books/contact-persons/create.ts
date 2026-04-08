import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactPersonsCreate extends BooksBaseCommand<typeof BooksContactPersonsCreate> {
  static id = 'books contact-persons create'
  static summary = 'Create a contact person'

  static args = {
    'contact-id': Args.string({ description: 'Contact ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with contact person fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = { ...JSON.parse(flags.data), contact_id: args['contact-id'] }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/contacts/contactpersons', body })
        return
      }
      const data = await this.booksPost('/contacts/contactpersons', body)
      this.outputSuccess(data.contact_person ?? data, { action: 'books.contact-persons.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
