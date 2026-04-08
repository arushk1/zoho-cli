import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsCommentsDelete extends ProjectsBaseCommand<typeof ProjectsCommentsDelete> {
  static id = 'projects comments delete'
  static summary = 'Delete a comment'
  static examples = ['zoho projects comments delete 99999 --entity-type tasks --entity-id 12345']

  static args = {
    id: Args.string({ description: 'Comment ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    'entity-type': Flags.string({
      description: 'Entity type (tasks, tasklists, phases)',
      required: true,
      options: ['tasks', 'tasklists', 'phases'],
    }),
    'entity-id': Flags.string({ description: 'Entity ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      // V3 API requires project-scoped path for comments
      const path = await this.projectPath(flags.project, `/${flags['entity-type']}/${flags['entity-id']}/comments/${args.id}`)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path })
        return
      }
      const { data } = await this.apiClient.delete(path)
      this.outputSuccess(data ?? { deleted: true }, { action: 'comments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
