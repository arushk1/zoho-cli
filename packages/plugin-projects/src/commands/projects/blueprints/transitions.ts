import { Args } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsBlueprintsTransitions extends ProjectsBaseCommand<typeof ProjectsBlueprintsTransitions> {
  static id = 'projects blueprints transitions'
  static summary = 'Get available transitions for a blueprint'
  static examples = ['zoho projects blueprints transitions 12345']

  static args = {
    id: Args.string({ description: 'Blueprint ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const { data } = await this.apiClient.get(await this.portalPath(`/blueprints/${args.id}/transitions`))
      this.outputSuccess(data.transitions ?? data, { action: 'blueprints.transitions' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
