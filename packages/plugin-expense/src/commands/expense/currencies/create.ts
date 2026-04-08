import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCurrenciesCreate extends ExpenseBaseCommand<typeof ExpenseCurrenciesCreate> {
  static id = 'expense currencies create'
  static summary = 'Create a currency'

  static flags = {
    data: Flags.string({ description: 'JSON object with currency fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/settings/currencies', body })
        return
      }
      const data = await this.expensePost('/settings/currencies', body)
      this.outputSuccess(data.currency ?? data, { action: 'expense.currencies.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
