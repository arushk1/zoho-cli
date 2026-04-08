import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsBlueprintsExecute extends ProjectsBaseCommand<typeof ProjectsBlueprintsExecute> {
  static id = 'projects blueprints execute'
  static summary = 'Execute a blueprint transition'
  static examples = ['zoho projects blueprints execute 12345 --data \'{"transition_id":"67890","data":{}}\'']

  static args = {
    id: Args.string({ description: 'Blueprint ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with transition_id and transition data', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const transitionData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: await this.portalPath(`/blueprints/${args.id}/execute`), body: transitionData })
        return
      }
      const { data } = await this.apiClient.post(await this.portalPath(`/blueprints/${args.id}/execute`), transitionData)
      this.outputSuccess(data, { action: 'blueprints.execute' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
