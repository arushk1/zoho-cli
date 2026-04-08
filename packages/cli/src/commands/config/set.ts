import { Args } from '@oclif/core'
import { saveConfig, configSchema } from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class ConfigSet extends BaseCommand<typeof ConfigSet> {
  static summary = 'Set a configuration value'

  static args = {
    key: Args.string({ description: 'Config key to set', required: true }),
    value: Args.string({ description: 'Value to set', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    const validKeys = Object.keys(configSchema.shape)
    if (!validKeys.includes(args.key)) {
      this.outputError('INVALID_KEY', `Unknown config key "${args.key}". Valid keys: ${validKeys.join(', ')}`)
      this.exit(3)
    }
    try {
      const updated = await saveConfig(undefined, { [args.key]: args.value })
      this.outputSuccess({ message: `Set ${args.key} = ${args.value}`, config: updated })
    } catch (error: unknown) {
      // ZodError duck-typing: has an `issues` array with validation errors
      const zodError = error as { issues?: Array<{ message: string }> }
      if (Array.isArray(zodError?.issues) && zodError.issues.length > 0) {
        const message = zodError.issues[0].message
        this.outputError('INVALID_VALUE', `Invalid value for "${args.key}": ${message}`)
        this.exit(3)
      }
      throw error
    }
  }
}
