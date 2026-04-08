import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCurrenciesDelete extends ExpenseBaseCommand<typeof ExpenseCurrenciesDelete> {
  static id = 'expense currencies delete'
  static summary = 'Delete a currency'

  static args = {
    id: Args.string({ description: 'Currency ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/settings/currencies/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/settings/currencies/${args.id}`)
      this.outputSuccess(data, { action: 'expense.currencies.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
