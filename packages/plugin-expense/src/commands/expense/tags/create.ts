import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTagsCreate extends ExpenseBaseCommand<typeof ExpenseTagsCreate> {
  static id = 'expense tags create'
  static summary = 'Create a reporting tag'

  static flags = {
    data: Flags.string({ description: 'JSON object with reporting tag fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/reportingtags', body })
        return
      }
      const data = await this.expensePost('/reportingtags', body)
      this.outputSuccess(data.reporting_tag ?? data, { action: 'expense.tags.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
