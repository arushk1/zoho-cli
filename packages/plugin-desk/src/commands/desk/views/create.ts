import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskViewsCreate extends DeskBaseCommand<typeof DeskViewsCreate> {
  static id = 'desk views create'
  static summary = 'Create a Zoho Desk view'

  static flags = {
    data: Flags.string({ description: 'View data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.views.create.dry-run' })
        return
      }
      const data = await this.deskPost('/views', body)
      this.outputSuccess(data, { action: 'desk.views.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
