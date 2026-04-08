import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotesDelete extends CrmBaseCommand<typeof CrmNotesDelete> {
  static id = 'crm notes delete'
  static summary = 'Delete a note'
  static examples = ['zoho crm notes delete 5437280000000328001']

  static args = {
    id: Args.string({ description: 'Note ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.delete(`/Notes/${args.id}`)

      this.outputSuccess(data.data?.[0] ?? data, {
        action: 'delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
