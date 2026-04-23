import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsWorkspacesList extends BookingsBaseCommand<typeof BookingsWorkspacesList> {
  static id = 'bookings workspaces list'
  static summary = 'List all Zoho Bookings workspaces for this user'
  static examples = ['zoho bookings workspaces list --pretty']

  async run(): Promise<void> {
    try {
      const result = await this.bookingsGet<any>('workspaces')
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      this.outputSuccess(data, { action: 'workspaces.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
