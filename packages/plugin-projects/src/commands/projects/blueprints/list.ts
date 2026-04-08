import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsBlueprintsList extends ProjectsBaseCommand<typeof ProjectsBlueprintsList> {
  static id = 'projects blueprints list'
  static summary = 'List available blueprints for a project'
  static examples = ['zoho projects blueprints list --project 12345']

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      // V3 API blueprints endpoint (may not be available in all plans/regions)
      const { data } = await this.apiClient.get(await this.projectPath(flags.project, '/blueprints'))
      this.outputSuccess(data.blueprints ?? data, { action: 'blueprints.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
