import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsActivate extends BooksBaseCommand<typeof BooksProjectsActivate> {
  static id = 'books projects activate'
  static summary = 'Mark a project as active'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/projects/${args.id}/active` })
        return
      }
      const data = await this.booksPost(`/projects/${args.id}/active`)
      this.outputSuccess(data, { action: 'books.projects.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
