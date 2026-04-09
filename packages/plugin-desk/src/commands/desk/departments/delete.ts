import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskDepartmentsDelete extends DeskBaseCommand<typeof DeskDepartmentsDelete> {
  static id = 'desk departments delete'
  static summary = 'Delete a Zoho Desk department'

  static args = {
    id: Args.string({ description: 'Department ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/departments/${args.id}`)
      this.outputSuccess(null, { action: 'desk.departments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
