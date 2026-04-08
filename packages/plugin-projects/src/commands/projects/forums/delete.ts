import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsForumsDelete extends ProjectsBaseCommand<typeof ProjectsForumsDelete> {
  static id = 'projects forums delete'
  static summary = 'Delete a forum from a project'
  static examples = ['zoho projects forums delete 67890 --project 12345']

  static args = {
    id: Args.string({ description: 'Forum ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const path = await this.projectPath(flags.project, `/forums/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path })
        return
      }

      const { data } = await this.apiClient.delete(path)

      this.outputSuccess(data ?? { deleted: true }, {
        action: 'forums.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
