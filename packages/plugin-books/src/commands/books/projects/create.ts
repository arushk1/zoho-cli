import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsCreate extends BooksBaseCommand<typeof BooksProjectsCreate> {
  static id = 'books projects create'
  static summary = 'Create a project'

  static flags = {
    data: Flags.string({ description: 'JSON object with project fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/projects', body })
        return
      }
      const data = await this.booksPost('/projects', body)
      this.outputSuccess(data.project ?? data, { action: 'books.projects.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
