import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskDepartmentsDelete extends DeskBaseCommand<typeof DeskDepartmentsDelete> {
  static id = 'desk departments delete'
  static summary = 'Delete a Zoho Desk department'

  static args = {
    id: Args.string({ description: 'Department ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.departments.delete.dry-run' })
        return
      }
      await this.deskDelete(`/departments/${args.id}`)
      this.outputSuccess(null, { action: 'desk.departments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
