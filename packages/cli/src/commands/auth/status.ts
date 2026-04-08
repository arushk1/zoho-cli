import { loadTokens, isTokenExpired } from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class AuthStatus extends BaseCommand<typeof AuthStatus> {
  static summary = 'Show current authentication status'

  async run(): Promise<void> {
    const tokens = await loadTokens()

    if (!tokens) {
      this.outputSuccess({
        authenticated: false,
        message: 'Not authenticated. Run "zoho auth login".',
      })
      return
    }

    const expired = isTokenExpired(tokens)
    this.outputSuccess({
      authenticated: true,
      tokenExpired: expired,
      expiresAt: new Date(tokens.expiresAt).toISOString(),
      scope: tokens.scope,
      region: this.zohoConfig.region,
    })
  }
}
