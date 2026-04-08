import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmPipelinesList extends CrmBaseCommand<typeof CrmPipelinesList> {
  static id = 'crm pipelines list'
  static summary = 'List pipelines for a layout'
  static examples = ['zoho crm pipelines list --layout 5437280000000091055']

  static flags = {
    layout: Flags.string({ description: 'Layout ID', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get('/settings/pipeline', {
        params: { layout_id: flags.layout },
      })

      const pipelines = data.pipeline ?? []

      this.outputSuccess(pipelines, {
        action: 'pipelines.list',
        count: pipelines.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
