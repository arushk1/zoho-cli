import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPortalsGet extends ProjectsBaseCommand<typeof ProjectsPortalsGet> {
  static id = 'projects portals get'
  static summary = 'Get details of the current portal'
  static examples = ['zoho projects portals get', 'zoho projects portals get --portal 12345']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get(await this.portalPath(''))

      this.outputSuccess(data.portals?.[0] ?? data, {
        action: 'portals.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
