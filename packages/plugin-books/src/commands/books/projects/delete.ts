import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsDelete extends BooksBaseCommand<typeof BooksProjectsDelete> {
  static id = 'books projects delete'
  static summary = 'Delete a project'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/projects/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/projects/${args.id}`)
      this.outputSuccess(data, { action: 'books.projects.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
