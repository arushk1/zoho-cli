import { Args } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsDashboardsGet extends ProjectsBaseCommand<typeof ProjectsDashboardsGet> {
  static id = 'projects dashboards get'
  static summary = 'Get dashboard details'
  static examples = ['zoho projects dashboards get 12345']

  static args = {
    id: Args.string({ description: 'Dashboard ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const { data } = await this.apiClient.get(await this.portalPath(`/dashboards/${args.id}`))
      this.outputSuccess(data.dashboards?.[0] ?? data, { action: 'dashboards.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
