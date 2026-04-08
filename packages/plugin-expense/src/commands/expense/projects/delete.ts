import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseProjectsDelete extends ExpenseBaseCommand<typeof ExpenseProjectsDelete> {
  static id = 'expense projects delete'
  static summary = 'Delete a project'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/projects/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/projects/${args.id}`)
      this.outputSuccess(data, { action: 'expense.projects.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
