import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasklistsUpdate extends ProjectsBaseCommand<typeof ProjectsTasklistsUpdate> {
  static id = 'projects tasklists update'
  static summary = 'Update an existing task list'
  static examples = [
    'zoho projects tasklists update 54321 --data \'{"name":"Sprint 2"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Task list ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with task list fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath(`/tasklists/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, body })
        return
      }

      const { data } = await this.apiClient.put(path, body)

      this.outputSuccess(data.tasklists?.[0] ?? data, {
        action: 'tasklists.update',
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
