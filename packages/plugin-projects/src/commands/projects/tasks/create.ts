import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksCreate extends ProjectsBaseCommand<typeof ProjectsTasksCreate> {
  static id = 'projects tasks create'
  static summary = 'Create a new task in a project'
  static examples = [
    'zoho projects tasks create --project 12345 --data \'{"name":"New Task","priority":"high"}\'',
    'zoho projects tasks create --project 12345 --data \'{"name":"New Task","owners_and_work":{"owners":[{"zpuid":"4000000002055"}]}}\'',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'JSON object with task fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.projectPath(flags.project, '/tasks')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.tasks?.[0] ?? data, {
        action: 'tasks.create',
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
