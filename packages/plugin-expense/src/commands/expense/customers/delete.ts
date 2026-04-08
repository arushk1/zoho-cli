import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCustomersDelete extends ExpenseBaseCommand<typeof ExpenseCustomersDelete> {
  static id = 'expense customers delete'
  static summary = 'Delete a customer'

  static args = {
    id: Args.string({ description: 'Customer ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/contacts/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/contacts/${args.id}`)
      this.outputSuccess(data, { action: 'expense.customers.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
