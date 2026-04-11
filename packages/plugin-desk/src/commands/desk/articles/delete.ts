import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesDelete extends DeskBaseCommand<typeof DeskArticlesDelete> {
  static id = 'desk articles delete'
  static summary = 'Delete a Zoho Desk knowledge base article'

  static args = {
    id: Args.string({ description: 'Article ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.articles.delete.dry-run' })
        return
      }
      await this.deskDelete(`/articles/${args.id}`)
      this.outputSuccess(null, { action: 'desk.articles.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
