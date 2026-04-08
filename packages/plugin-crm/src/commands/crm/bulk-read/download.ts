import { Args, Flags } from '@oclif/core'
import { writeFile } from 'node:fs/promises'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkReadDownload extends CrmBaseCommand<typeof CrmBulkReadDownload> {
  static id = 'crm bulk-read download'
  static summary = 'Download the result of a bulk read job'
  static examples = [
    'zoho crm bulk-read download 5437280000000328001 -o ./leads-export.csv',
  ]

  static args = {
    jobId: Args.string({ description: 'Bulk read job ID', required: true }),
  }

  static flags = {
    output: Flags.string({ description: 'Output file path', required: true, char: 'o' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const { data } = await this.apiClient.get(`/read/${args.jobId}/result`, {
        responseType: 'arraybuffer',
      })

      await writeFile(flags.output, Buffer.from(data as ArrayBuffer))

      this.outputSuccess({ file: flags.output }, {
        action: 'bulk-read-download',
      })
    } catch (error: any) {
      // When responseType is arraybuffer, error response data may need decoding
      if (error.response?.data instanceof ArrayBuffer || Buffer.isBuffer(error.response?.data)) {
        try {
          const text = Buffer.from(error.response.data).toString('utf8')
          const parsed = JSON.parse(text)
          error.response.data = parsed
        } catch {
          // ignore parse errors, let handleApiError handle it
        }
      }
      this.handleApiError(error)
    }
  }
}
