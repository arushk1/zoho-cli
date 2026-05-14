import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmDealsCreate extends CrmBaseCommand<typeof CrmDealsCreate> {
  static id = 'crm deals create'
  static summary = 'Create a new Deal'
  static examples = ['zoho crm deals create --json \'{"Deal_Name":"Acme Q2","Stage":"Qualification"}\'']

  static flags = {
    json: Flags.string({ description: 'JSON object with record fields', char: 'j' }),
    data: Flags.string({ description: 'Alias for --json', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordCreate('Deals', this.flags.json ?? this.flags.data, this.flags['dry-run'])
  }
}
