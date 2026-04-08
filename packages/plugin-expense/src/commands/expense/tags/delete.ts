import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTagsDelete extends ExpenseBaseCommand<typeof ExpenseTagsDelete> {
  static id = 'expense tags delete'
  static summary = 'Delete a reporting tag'

  static args = {
    id: Args.string({ description: 'Reporting tag ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/reportingtags/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/reportingtags/${args.id}`)
      this.outputSuccess(data, { action: 'expense.tags.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
