import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactsCreate extends BooksBaseCommand<typeof BooksContactsCreate> {
  static id = 'books contacts create'
  static summary = 'Create a contact'

  static flags = {
    data: Flags.string({ description: 'JSON object with contact fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/contacts', body })
        return
      }
      const data = await this.booksPost('/contacts', body)
      this.outputSuccess(data.contact ?? data, { action: 'books.contacts.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
