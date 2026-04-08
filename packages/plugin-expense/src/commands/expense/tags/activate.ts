import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTagsActivate extends ExpenseBaseCommand<typeof ExpenseTagsActivate> {
  static id = 'expense tags activate'
  static summary = 'Activate a reporting tag'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/reportingtags/${args.id}/active` })
        return
      }
      const data = await this.expensePost(`/reportingtags/${args.id}/active`)
      this.outputSuccess(data, { action: 'expense.tags.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
