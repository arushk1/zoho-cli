import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsClone extends BooksBaseCommand<typeof BooksProjectsClone> {
  static id = 'books projects clone'
  static summary = 'Clone a project'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/projects/${args.id}/clone` })
        return
      }
      const data = await this.booksPost(`/projects/${args.id}/clone`)
      this.outputSuccess(data.project ?? data, { action: 'books.projects.clone' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
