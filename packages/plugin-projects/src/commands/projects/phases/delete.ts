import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPhasesDelete extends ProjectsBaseCommand<typeof ProjectsPhasesDelete> {
  static id = 'projects phases delete'
  static summary = 'Delete a phase'
  static examples = ['zoho projects phases delete 12345 --project 67890']

  static args = {
    id: Args.string({ description: 'Phase ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'phases.delete.dryRun' })
      return
    }

    try {
      await this.apiClient.delete(
        await this.projectPath(flags.project, `/phases/${args.id}`),
      )

      this.outputSuccess({ id: args.id, deleted: true }, {
        action: 'phases.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
