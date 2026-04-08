import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTagsCreate extends ProjectsBaseCommand<typeof ProjectsTagsCreate> {
  static id = 'projects tags create'
  static summary = 'Create a new tag'
  static examples = [
    'zoho projects tags create --data \'{"name":"urgent","color_class":"red"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with tag fields (name, color_class)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath('/tags')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.tags?.[0] ?? data, {
        action: 'tags.create',
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
