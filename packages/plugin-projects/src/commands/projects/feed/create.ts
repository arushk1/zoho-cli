import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsFeedCreate extends ProjectsBaseCommand<typeof ProjectsFeedCreate> {
  static id = 'projects feed create'
  static summary = 'Post a status update to a project feed'
  static examples = ['zoho projects feed create --project 12345 --data \'{"content":"Sprint 5 is on track!"}\'']

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    data: Flags.string({ description: 'JSON object with feed content', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const feedData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: await this.projectPath(flags.project, '/feed'), body: feedData })
        return
      }
      const { data } = await this.apiClient.post(await this.projectPath(flags.project, '/feed'), feedData)
      this.outputSuccess(data.feed?.[0] ?? data, { action: 'feed.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
