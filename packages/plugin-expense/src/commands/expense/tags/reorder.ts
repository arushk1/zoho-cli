import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTagsReorder extends ExpenseBaseCommand<typeof ExpenseTagsReorder> {
  static id = 'expense tags reorder'
  static summary = 'Reorder reporting tags'

  static flags = {
    data: Flags.string({ description: 'JSON object with reorder data', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: '/reportingtags/reorder', body })
        return
      }
      const data = await this.expensePut('/reportingtags/reorder', body)
      this.outputSuccess(data, { action: 'expense.tags.reorder' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
