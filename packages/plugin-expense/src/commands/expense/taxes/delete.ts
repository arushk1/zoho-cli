import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTaxesDelete extends ExpenseBaseCommand<typeof ExpenseTaxesDelete> {
  static id = 'expense taxes delete'
  static summary = 'Delete a tax'

  static args = {
    id: Args.string({ description: 'Tax ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/settings/taxes/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/settings/taxes/${args.id}`)
      this.outputSuccess(data, { action: 'expense.taxes.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
