import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsDeactivate extends BooksBaseCommand<typeof BooksProjectsDeactivate> {
  static id = 'books projects deactivate'
  static summary = 'Mark a project as inactive'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/projects/${args.id}/inactive` })
        return
      }
      const data = await this.booksPost(`/projects/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'books.projects.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
