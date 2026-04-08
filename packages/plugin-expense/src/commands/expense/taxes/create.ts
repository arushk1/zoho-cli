import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTaxesCreate extends ExpenseBaseCommand<typeof ExpenseTaxesCreate> {
  static id = 'expense taxes create'
  static summary = 'Create a tax'

  static flags = {
    data: Flags.string({ description: 'JSON object with tax fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/settings/taxes', body })
        return
      }
      const data = await this.expensePost('/settings/taxes', body)
      this.outputSuccess(data.tax ?? data, { action: 'expense.taxes.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
