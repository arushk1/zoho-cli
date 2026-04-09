import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesDelete extends DeskBaseCommand<typeof DeskArticlesDelete> {
  static id = 'desk articles delete'
  static summary = 'Delete a Zoho Desk knowledge base article'

  static args = {
    id: Args.string({ description: 'Article ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/articles/${args.id}`)
      this.outputSuccess(null, { action: 'desk.articles.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
