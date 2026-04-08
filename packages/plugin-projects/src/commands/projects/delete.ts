import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../projects-base-command.js'

export default class ProjectsDelete extends ProjectsBaseCommand<typeof ProjectsDelete> {
  static id = 'projects delete'
  static summary = 'Delete a project (move to trash or permanently delete)'
  static examples = [
    'zoho projects delete 12345',
    'zoho projects delete 12345 --permanent',
  ]

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    permanent: Flags.boolean({ description: 'Permanently delete instead of moving to trash', default: false }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const trashPath = await this.portalPath(`/projects/${args.id}/trash`)
      const deletePath = await this.portalPath(`/projects/${args.id}`)

      if (flags['dry-run']) {
        if (flags.permanent) {
          this.outputSuccess({ dryRun: true, method: 'DELETE', path: deletePath })
        } else {
          this.outputSuccess({ dryRun: true, method: 'POST', path: trashPath })
        }
        return
      }

      let data: any
      if (flags.permanent) {
        const response = await this.apiClient.delete(deletePath)
        data = response.data
      } else {
        const response = await this.apiClient.post(trashPath, {})
        data = response.data
      }

      this.outputSuccess(data ?? { id: args.id, deleted: true }, {
        action: flags.permanent ? 'projects.delete' : 'projects.trash',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
