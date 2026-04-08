import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsGet extends BooksBaseCommand<typeof BooksProjectsGet> {
  static id = 'books projects get'
  static summary = 'Get a project by ID'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/projects/${args.id}`)
      this.outputSuccess(data.project ?? data, { action: 'books.projects.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
