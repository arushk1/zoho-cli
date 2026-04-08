import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseOrganizationsCreate extends ExpenseBaseCommand<typeof ExpenseOrganizationsCreate> {
  static id = 'expense organizations create'
  static summary = 'Create a new organization'

  static flags = {
    data: Flags.string({ description: 'JSON object with organization fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/organizations', body })
        return
      }
      const { data } = await this.apiClient.post<any>('/organizations', body)
      this.outputSuccess(data.organization ?? data, { action: 'expense.organizations.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
