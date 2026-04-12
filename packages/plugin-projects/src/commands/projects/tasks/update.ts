import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksUpdate extends ProjectsBaseCommand<typeof ProjectsTasksUpdate> {
  static id = 'projects tasks update'
  static summary = 'Update an existing task'
  static examples = [
    'zoho projects tasks update 67890 --data \'{"name":"Updated Task","status":"completed"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    data: Flags.string({ description: 'JSON object with task fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      // V3 API requires project-scoped path for task update
      const path = await this.projectPath(flags.project, `/tasks/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path, body })
        return
      }

      const { data } = await this.apiClient.patch(path, body)

      this.outputSuccess(data.task ?? data.tasks?.[0] ?? data, {
        action: 'tasks.update',
      })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
