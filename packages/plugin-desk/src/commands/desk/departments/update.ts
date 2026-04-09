import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskDepartmentsUpdate extends DeskBaseCommand<typeof DeskDepartmentsUpdate> {
  static id = 'desk departments update'
  static summary = 'Update a Zoho Desk department'

  static args = {
    id: Args.string({ description: 'Department ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data to update the department', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.departments.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/departments/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.departments.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
