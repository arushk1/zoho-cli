import { clearTokens } from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class AuthLogout extends BaseCommand<typeof AuthLogout> {
  static summary = 'Clear stored authentication tokens'

  async run(): Promise<void> {
    await clearTokens()
    this.outputSuccess({ message: 'Logged out. Tokens cleared.' })
  }
}
