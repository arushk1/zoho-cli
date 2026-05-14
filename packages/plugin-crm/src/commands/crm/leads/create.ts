import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmLeadsCreate extends CrmBaseCommand<typeof CrmLeadsCreate> {
  static id = 'crm leads create'
  static summary = 'Create a new Lead'
  static examples = ['zoho crm leads create --json \'{"Last_Name":"Smith","Company":"Acme"}\'']

  static flags = {
    json: Flags.string({ description: 'JSON object with record fields', char: 'j' }),
    data: Flags.string({ description: 'Alias for --json', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordCreate('Leads', this.flags.json ?? this.flags.data, this.flags['dry-run'])
  }
}
