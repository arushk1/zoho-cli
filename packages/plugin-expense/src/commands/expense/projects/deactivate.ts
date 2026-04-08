import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseProjectsDeactivate extends ExpenseBaseCommand<typeof ExpenseProjectsDeactivate> {
  static id = 'expense projects deactivate'
  static summary = 'Deactivate a project'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/projects/${args.id}/inactive` })
        return
      }
      const data = await this.expensePost(`/projects/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'expense.projects.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
