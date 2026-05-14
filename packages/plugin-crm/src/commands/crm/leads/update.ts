import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmLeadsUpdate extends CrmBaseCommand<typeof CrmLeadsUpdate> {
  static id = 'crm leads update'
  static summary = 'Update an existing Lead'
  static examples = ['zoho crm leads update --id 5437280000000328001 --json \'{"Email":"new@example.com"}\'']

  static flags = {
    id: Flags.string({ description: 'Record ID', required: true }),
    json: Flags.string({ description: 'JSON object with fields to update', char: 'j' }),
    data: Flags.string({ description: 'Alias for --json', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordUpdate('Leads', this.flags.id, this.flags.json ?? this.flags.data, this.flags['dry-run'])
  }
}
