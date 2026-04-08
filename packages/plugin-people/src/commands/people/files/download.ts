import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFilesDownload extends PeopleBaseCommand<typeof PeopleFilesDownload> {
  static id = 'people files download'
  static summary = 'Download a file'
  static examples = ['zoho people files download 12345']

  static args = {
    id: Args.string({ description: 'File ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const { data } = await this.apiClient.get('/people/api/files/downloadFile', { params: { fileId: args.id } })
      this.outputSuccess(data, { action: 'files.download' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
