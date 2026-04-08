import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseProjectsActivate extends ExpenseBaseCommand<typeof ExpenseProjectsActivate> {
  static id = 'expense projects activate'
  static summary = 'Activate a project'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/projects/${args.id}/active` })
        return
      }
      const data = await this.expensePost(`/projects/${args.id}/active`)
      this.outputSuccess(data, { action: 'expense.projects.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
