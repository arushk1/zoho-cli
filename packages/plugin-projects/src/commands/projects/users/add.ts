import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsUsersAdd extends ProjectsBaseCommand<typeof ProjectsUsersAdd> {
  static id = 'projects users add'
  static summary = 'Add a user to the portal'
  static examples = [
    'zoho projects users add --data \'{"email":"user@example.com","role":"employee"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with user fields (email, role, etc.)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath('/users')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.users?.[0] ?? data, {
        action: 'users.add',
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
