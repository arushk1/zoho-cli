import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksDelete extends ProjectsBaseCommand<typeof ProjectsTasksDelete> {
  static id = 'projects tasks delete'
  static summary = 'Delete a task'
  static examples = ['zoho projects tasks delete 67890']

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      // V3 API requires project-scoped path for task delete
      const path = await this.projectPath(flags.project, `/tasks/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path })
        return
      }

      const { data } = await this.apiClient.delete(path)

      this.outputSuccess(data ?? { id: args.id, deleted: true }, {
        action: 'tasks.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
