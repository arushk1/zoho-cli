import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTagsList extends ProjectsBaseCommand<typeof ProjectsTagsList> {
  static id = 'projects tags list'
  static summary = 'List all tags in the portal'
  static examples = ['zoho projects tags list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get(await this.portalPath('/tags'))

      this.outputSuccess(data.tags ?? [], {
        action: 'tags.list',
        count: data.tags?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
