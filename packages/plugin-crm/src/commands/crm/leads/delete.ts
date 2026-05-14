import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmLeadsDelete extends CrmBaseCommand<typeof CrmLeadsDelete> {
  static id = 'crm leads delete'
  static summary = 'Delete a Lead by ID'
  static examples = ['zoho crm leads delete --id 5437280000000328001']

  static flags = {
    id: Flags.string({ description: 'Record ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordDelete('Leads', this.flags.id, this.flags['dry-run'])
  }
}
