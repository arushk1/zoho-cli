import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsUsersUpdate extends ProjectsBaseCommand<typeof ProjectsUsersUpdate> {
  static id = 'projects users update'
  static summary = 'Update a user in the portal'
  static examples = [
    'zoho projects users update 12345 --data \'{"role":"manager"}\'',
  ]

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with user fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath(`/users/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, body })
        return
      }

      const { data } = await this.apiClient.put(path, body)

      this.outputSuccess(data.users?.[0] ?? data, {
        action: 'users.update',
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
