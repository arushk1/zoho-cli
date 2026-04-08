import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCustomersCreate extends ExpenseBaseCommand<typeof ExpenseCustomersCreate> {
  static id = 'expense customers create'
  static summary = 'Create a customer'

  static flags = {
    data: Flags.string({ description: 'JSON object with customer fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/contacts', body })
        return
      }
      const data = await this.expensePost('/contacts', body)
      this.outputSuccess(data.contact ?? data, { action: 'expense.customers.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
