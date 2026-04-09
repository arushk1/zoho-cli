import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesGet extends DeskBaseCommand<typeof DeskArticlesGet> {
  static id = 'desk articles get'
  static summary = 'Get a Zoho Desk knowledge base article by ID'

  static args = {
    id: Args.string({ description: 'Article ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/articles/${args.id}`)
      this.outputSuccess(data, { action: 'desk.articles.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
