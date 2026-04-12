import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimersList extends ProjectsBaseCommand<typeof ProjectsTimersList> {
  static id = 'projects timers list'
  static summary = 'List currently running timers'
  static examples = ['zoho projects timers list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get(
        await this.portalPath('/logs/timers'),
      )

      this.outputSuccess(data.timers ?? [], {
        action: 'timers.list',
        count: data.timers?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
