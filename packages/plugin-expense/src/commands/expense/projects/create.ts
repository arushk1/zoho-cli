import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseProjectsCreate extends ExpenseBaseCommand<typeof ExpenseProjectsCreate> {
  static id = 'expense projects create'
  static summary = 'Create a project'

  static flags = {
    data: Flags.string({ description: 'JSON object with project fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/projects', body })
        return
      }
      const data = await this.expensePost('/projects', body)
      this.outputSuccess(data.project ?? data, { action: 'expense.projects.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
