import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTeamsList extends ProjectsBaseCommand<typeof ProjectsTeamsList> {
  static id = 'projects teams list'
  static summary = 'List teams in a project'
  static examples = [
    'zoho projects teams list --project 12345',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID (required)', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const { data } = await this.apiClient.get(await this.projectPath(flags.project, '/teams'), { params })

      this.outputSuccess(data.teams ?? [], {
        action: 'teams.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.teams?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
