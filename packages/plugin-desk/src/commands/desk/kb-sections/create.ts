import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbSectionsCreate extends DeskBaseCommand<typeof DeskKbSectionsCreate> {
  static id = 'desk kb-sections create'
  static summary = 'Create a Zoho Desk knowledge base section'

  static flags = {
    data: Flags.string({ description: 'Section data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.kb-sections.create.dry-run' })
        return
      }
      const data = await this.deskPost('/kbSections', body)
      this.outputSuccess(data, { action: 'desk.kb-sections.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
