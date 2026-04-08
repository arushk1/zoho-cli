import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsDashboardsDelete extends ProjectsBaseCommand<typeof ProjectsDashboardsDelete> {
  static id = 'projects dashboards delete'
  static summary = 'Delete a dashboard'
  static examples = ['zoho projects dashboards delete 12345']

  static args = {
    id: Args.string({ description: 'Dashboard ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: await this.portalPath(`/dashboards/${args.id}`) })
        return
      }
      const { data } = await this.apiClient.delete(await this.portalPath(`/dashboards/${args.id}`))
      this.outputSuccess(data ?? { deleted: true }, { action: 'dashboards.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
