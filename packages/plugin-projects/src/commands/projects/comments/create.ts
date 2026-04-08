import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsCommentsCreate extends ProjectsBaseCommand<typeof ProjectsCommentsCreate> {
  static id = 'projects comments create'
  static summary = 'Add a comment to a task, issue, or other entity'
  static examples = ['zoho projects comments create --entity-type tasks --entity-id 12345 --data \'{"content":"Looks good!"}\'']

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    'entity-type': Flags.string({
      description: 'Entity type (tasks, tasklists, phases)',
      required: true,
      options: ['tasks', 'tasklists', 'phases'],
    }),
    'entity-id': Flags.string({ description: 'Entity ID', required: true }),
    data: Flags.string({ description: 'JSON object with comment fields (content)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const commentData = JSON.parse(flags.data)
      // V3 API requires project-scoped path for comments
      const path = await this.projectPath(flags.project, `/${flags['entity-type']}/${flags['entity-id']}/comments`)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body: commentData })
        return
      }
      const { data } = await this.apiClient.post(path, commentData)
      this.outputSuccess(data.comments?.[0] ?? data, { action: 'comments.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
