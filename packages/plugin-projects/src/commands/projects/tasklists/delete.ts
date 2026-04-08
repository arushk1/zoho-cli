import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasklistsDelete extends ProjectsBaseCommand<typeof ProjectsTasklistsDelete> {
  static id = 'projects tasklists delete'
  static summary = 'Delete a task list'
  static examples = ['zoho projects tasklists delete 54321']

  static args = {
    id: Args.string({ description: 'Task list ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const path = await this.portalPath(`/tasklists/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path })
        return
      }

      const { data } = await this.apiClient.delete(path)

      this.outputSuccess(data ?? { id: args.id, deleted: true }, {
        action: 'tasklists.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
