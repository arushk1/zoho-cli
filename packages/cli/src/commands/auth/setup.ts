import { Flags } from '@oclif/core'
import { saveConfig, ZOHO_REGIONS, type ZohoRegion } from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class AuthSetup extends BaseCommand<typeof AuthSetup> {
  static summary = 'Configure Zoho API client credentials'

  static flags = {
    'client-id': Flags.string({ description: 'Zoho OAuth client ID', required: true }),
    'client-secret': Flags.string({ description: 'Zoho OAuth client secret', required: true }),
    region: Flags.string({
      description: 'Zoho data center region',
      options: [...ZOHO_REGIONS],
      default: 'in',
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    await saveConfig(undefined, {
      clientId: flags['client-id'],
      clientSecret: flags['client-secret'],
      region: flags.region as ZohoRegion,
    })
    this.outputSuccess({
      message: 'Configuration saved',
      region: flags.region,
      clientId: flags['client-id'],
    })
  }
}
