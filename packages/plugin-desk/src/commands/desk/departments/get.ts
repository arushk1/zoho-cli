import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskDepartmentsGet extends DeskBaseCommand<typeof DeskDepartmentsGet> {
  static id = 'desk departments get'
  static summary = 'Get a Zoho Desk department by ID'

  static args = {
    id: Args.string({ description: 'Department ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/departments/${args.id}`)
      this.outputSuccess(data, { action: 'desk.departments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
