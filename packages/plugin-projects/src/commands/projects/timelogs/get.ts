import { Args } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimelogsGet extends ProjectsBaseCommand<typeof ProjectsTimelogsGet> {
  static id = 'projects timelogs get'
  static summary = 'Get a specific time log by ID'
  static examples = ['zoho projects timelogs get 12345']

  static args = {
    id: Args.string({ description: 'Time log ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(
        await this.portalPath(`/timelogs/${args.id}`),
      )

      this.outputSuccess(data.timelogs?.[0] ?? data, {
        action: 'timelogs.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
