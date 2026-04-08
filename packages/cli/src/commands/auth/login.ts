import { Flags } from '@oclif/core'
import {
  buildAuthorizationUrl,
  exchangeCodeForTokens,
  startCallbackServer,
  saveTokens,
} from '@zoho-cli/core'
import { BaseCommand } from '../../base-command.js'

export default class AuthLogin extends BaseCommand<typeof AuthLogin> {
  static summary = 'Authenticate with Zoho via OAuth2 browser flow'

  static flags = {
    port: Flags.integer({ description: 'Local callback server port', default: 8901 }),
    scopes: Flags.string({
      description: 'OAuth scopes (comma-separated)',
      default: [
        // CRM
        'ZohoCRM.modules.ALL',
        'ZohoCRM.settings.ALL',
        'ZohoCRM.org.ALL',
        'ZohoCRM.users.ALL',
        'ZohoCRM.bulk.ALL',
        'ZohoCRM.coql.READ',
        // Projects
        'ZohoProjects.portals.ALL',
        'ZohoProjects.projects.ALL',
        'ZohoProjects.tasks.ALL',
        'ZohoProjects.tasklists.ALL',
        'ZohoProjects.milestones.ALL',
        'ZohoProjects.bugs.ALL',
        'ZohoProjects.timesheets.ALL',
        'ZohoProjects.forums.ALL',
        'ZohoProjects.events.ALL',
        'ZohoProjects.documents.ALL',
        'ZohoProjects.users.ALL',
        'ZohoProjects.clients.ALL',
        'ZohoProjects.tags.ALL',
        'ZohoProjects.status.READ',
        'ZohoProjects.status.CREATE',
        'ZohoProjects.activities.READ',
        'ZohoProjects.search.READ',
        'ZohoProjects.custom_fields.ALL',
        // People
        'ZOHOPEOPLE.forms.ALL',
        'ZOHOPEOPLE.employee.ALL',
        'ZOHOPEOPLE.leave.ALL',
        'ZOHOPEOPLE.attendance.ALL',
        'ZOHOPEOPLE.timetracker.ALL',
        'ZOHOPEOPLE.dashboard.ALL',
        'ZOHOPEOPLE.automation.ALL',
        // Books
        'ZohoBooks.fullaccess.all',
        // Expense
        'ZohoExpense.fullaccess.ALL',
      ].join(','),
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const config = this.zohoConfig

    if (!config.clientId || !config.clientSecret) {
      this.outputError('CONFIG_MISSING', 'Client ID and secret not configured. Run "zoho auth setup" first.')
      this.exit(3)
    }

    const redirectUri = `http://localhost:${flags.port}/callback`
    const scopes = flags.scopes.split(',').map((s) => s.trim())

    const authUrl = buildAuthorizationUrl({
      clientId: config.clientId,
      region: config.region,
      redirectUri,
      scopes,
    })

    const { server, codePromise } = await startCallbackServer(flags.port)

    process.stderr.write(`Opening browser for authorization...\n`)
    process.stderr.write(`If browser doesn't open, visit:\n${authUrl}\n\n`)

    const { default: open } = await import('open')
    await open(authUrl)

    try {
      const { code } = await codePromise
      const tokens = await exchangeCodeForTokens(config.region, {
        code,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri,
      })
      await saveTokens(undefined, tokens)
      this.outputSuccess({ message: 'Authentication successful', scope: tokens.scope })
    } finally {
      server.close()
    }
  }
}
