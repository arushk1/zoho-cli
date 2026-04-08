import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmTagsDelete extends CrmBaseCommand<typeof CrmTagsDelete> {
  static id = 'crm tags delete'
  static summary = 'Delete a tag'
  static examples = ['zoho crm tags delete 5437280000000328001']

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.delete(`/settings/tags/${args.id}`)

      this.outputSuccess(data.tags?.[0] ?? data, {
        action: 'delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
