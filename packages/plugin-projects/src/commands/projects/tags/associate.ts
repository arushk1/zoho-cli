import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTagsAssociate extends ProjectsBaseCommand<typeof ProjectsTagsAssociate> {
  static id = 'projects tags associate'
  static summary = 'Associate tags with entities in a project'
  static examples = [
    'zoho projects tags associate --project 12345 --data \'{"tag_ids":["111","222"],"entity":{"id":"333","type":"task"}}\'',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'JSON object with tag_ids and entity info', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.projectPath(flags.project, '/tags/associate')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data, {
        action: 'tags.associate',
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
