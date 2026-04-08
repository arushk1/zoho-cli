import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPhasesGet extends ProjectsBaseCommand<typeof ProjectsPhasesGet> {
  static id = 'projects phases get'
  static summary = 'Get a specific phase by ID'
  static examples = ['zoho projects phases get 12345 --project 67890']

  static args = {
    id: Args.string({ description: 'Phase ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, `/phases/${args.id}`),
      )

      // V3 API returns phases under "milestones" key (not "phases")
      this.outputSuccess(data.phases?.[0] ?? data.milestones?.[0] ?? data, {
        action: 'phases.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
