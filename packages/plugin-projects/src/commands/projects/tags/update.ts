import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTagsUpdate extends ProjectsBaseCommand<typeof ProjectsTagsUpdate> {
  static id = 'projects tags update'
  static summary = 'Update a tag'
  static examples = [
    'zoho projects tags update 12345 --data \'{"name":"critical","color_class":"blue"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with tag fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath(`/tags/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path, body })
        return
      }

      const { data } = await this.apiClient.patch(path, body)

      this.outputSuccess(data.tags?.[0] ?? data, {
        action: 'tags.update',
      })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
