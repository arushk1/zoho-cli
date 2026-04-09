import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesUpdate extends DeskBaseCommand<typeof DeskArticlesUpdate> {
  static id = 'desk articles update'
  static summary = 'Update a Zoho Desk knowledge base article'

  static args = {
    id: Args.string({ description: 'Article ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Article data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.articles.update.dry-run' })
        return
      }
      const data = await this.deskPatch(`/articles/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.articles.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
