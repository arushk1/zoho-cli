import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmDealsDelete extends CrmBaseCommand<typeof CrmDealsDelete> {
  static id = 'crm deals delete'
  static summary = 'Delete a Deal by ID'
  static examples = ['zoho crm deals delete --id 5437280000000328001']

  static flags = {
    id: Flags.string({ description: 'Record ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordDelete('Deals', this.flags.id, this.flags['dry-run'])
  }
}
