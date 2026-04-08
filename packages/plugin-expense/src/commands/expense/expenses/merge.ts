import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseExpensesMerge extends ExpenseBaseCommand<typeof ExpenseExpensesMerge> {
  static id = 'expense expenses merge'
  static summary = 'Merge expenses into a primary expense'

  static args = {
    id: Args.string({ description: 'Primary expense ID to merge into', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with merge fields (e.g. expense IDs to merge)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/expenses/${args.id}/merge`, body })
        return
      }
      const data = await this.expensePost(`/expenses/${args.id}/merge`, body)
      this.outputSuccess(data, { action: 'expense.expenses.merge' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
