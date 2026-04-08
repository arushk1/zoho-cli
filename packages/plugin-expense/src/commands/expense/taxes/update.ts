import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTaxesUpdate extends ExpenseBaseCommand<typeof ExpenseTaxesUpdate> {
  static id = 'expense taxes update'
  static summary = 'Update a tax'

  static args = {
    id: Args.string({ description: 'Tax ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/settings/taxes/${args.id}`, body })
        return
      }
      const data = await this.expensePut(`/settings/taxes/${args.id}`, body)
      this.outputSuccess(data.tax ?? data, { action: 'expense.taxes.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
