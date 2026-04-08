import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFilesDelete extends PeopleBaseCommand<typeof PeopleFilesDelete> {
  static id = 'people files delete'
  static summary = 'Delete a file'
  static examples = ['zoho people files delete 12345']

  static args = {
    id: Args.string({ description: 'File ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/people/api/files/deleteFiles?deleteFileId=${args.id}` })
        return
      }
      const { data } = await this.apiClient.post('/people/api/files/deleteFiles', null, { params: { deleteFileId: args.id } })
      this.outputSuccess(this.extractResult(data) ?? { deleted: true }, { action: 'files.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
