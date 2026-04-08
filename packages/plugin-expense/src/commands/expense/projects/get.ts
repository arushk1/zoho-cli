import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseProjectsGet extends ExpenseBaseCommand<typeof ExpenseProjectsGet> {
  static id = 'expense projects get'
  static summary = 'Get a project by ID'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/projects/${args.id}`)
      this.outputSuccess(data.project ?? data, { action: 'expense.projects.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
