import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesCreate extends DeskBaseCommand<typeof DeskArticlesCreate> {
  static id = 'desk articles create'
  static summary = 'Create a Zoho Desk knowledge base article'

  static flags = {
    data: Flags.string({ description: 'Article data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.articles.create.dry-run' })
        return
      }
      const data = await this.deskPost('/articles', body)
      this.outputSuccess(data, { action: 'desk.articles.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
