import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksMove extends ProjectsBaseCommand<typeof ProjectsTasksMove> {
  static id = 'projects tasks move'
  static summary = 'Move a task to a different project or tasklist'
  static examples = [
    'zoho projects tasks move 67890 --data \'{"project":{"id":"11111"},"tasklist":{"id":"22222"}}\'',
  ]

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Source project ID (required by V3 API)', required: true, char: 'p' }),
    data: Flags.string({ description: 'JSON object with target project/tasklist', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      // V3 API requires project-scoped path for task move
      const path = await this.projectPath(flags.project, `/tasks/${args.id}/move`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.task ?? data.tasks?.[0] ?? data, {
        action: 'tasks.move',
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
