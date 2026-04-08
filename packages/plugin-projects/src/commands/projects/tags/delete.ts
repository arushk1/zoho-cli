import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTagsDelete extends ProjectsBaseCommand<typeof ProjectsTagsDelete> {
  static id = 'projects tags delete'
  static summary = 'Delete a tag'
  static examples = ['zoho projects tags delete 12345']

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const path = await this.portalPath(`/tags/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path })
        return
      }

      const { data } = await this.apiClient.delete(path)

      this.outputSuccess(data ?? { deleted: true }, {
        action: 'tags.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
