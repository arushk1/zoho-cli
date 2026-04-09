import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesCount extends DeskBaseCommand<typeof DeskArticlesCount> {
  static id = 'desk articles count'
  static summary = 'Get count of Zoho Desk knowledge base articles'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/articles/count')
      this.outputSuccess(data, { action: 'desk.articles.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
