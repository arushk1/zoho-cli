import { Args } from '@oclif/core'
import { getConfigValue, configSchema } from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class ConfigGet extends BaseCommand<typeof ConfigGet> {
  static summary = 'Get a configuration value'

  static args = {
    key: Args.string({ description: 'Config key to get', required: true }),
  }

  async run(): Promise<void> {
    const validKeys = Object.keys(configSchema.shape)
    if (!validKeys.includes(this.args.key)) {
      this.outputError('INVALID_KEY', `Unknown config key "${this.args.key}". Valid keys: ${validKeys.join(', ')}`)
      this.exit(3)
    }
    const value = await getConfigValue(undefined, this.args.key as any)
    this.outputSuccess({ key: this.args.key, value: value ?? null })
  }
}
