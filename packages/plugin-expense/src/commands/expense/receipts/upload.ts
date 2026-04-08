import { Flags } from '@oclif/core'
import FormData from 'form-data'
import { createReadStream } from 'node:fs'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReceiptsUpload extends ExpenseBaseCommand<typeof ExpenseReceiptsUpload> {
  static id = 'expense receipts upload'
  static summary = 'Upload a receipt file and create an expense'

  static flags = {
    file: Flags.string({ description: 'Path to receipt file', required: true, char: 'f' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/expenses', file: flags.file })
        return
      }
      const orgId = await this.resolveOrgId()
      const form = new FormData()
      form.append('receipt', createReadStream(flags.file))
      const { data } = await this.apiClient.post<any>('/expenses', form, {
        headers: {
          ...form.getHeaders(),
          'X-com-zoho-expense-organizationid': orgId,
        },
      })
      this.outputSuccess(data.expense ?? data, { action: 'expense.receipts.upload' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
