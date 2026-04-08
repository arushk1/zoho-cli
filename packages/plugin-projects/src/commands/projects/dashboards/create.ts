import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsDashboardsCreate extends ProjectsBaseCommand<typeof ProjectsDashboardsCreate> {
  static id = 'projects dashboards create'
  static summary = 'Create a dashboard'
  static examples = ['zoho projects dashboards create --data \'{"name":"Sprint Dashboard"}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with dashboard fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const dashboardData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: await this.portalPath('/dashboards'), body: dashboardData })
        return
      }
      const { data } = await this.apiClient.post(await this.portalPath('/dashboards'), dashboardData)
      this.outputSuccess(data.dashboards?.[0] ?? data, { action: 'dashboards.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
