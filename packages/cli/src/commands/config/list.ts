import { loadConfig } from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class ConfigList extends BaseCommand<typeof ConfigList> {
  static summary = 'List all configuration values'

  async run(): Promise<void> {
    const config = await loadConfig()
    this.outputSuccess(config)
  }
}
