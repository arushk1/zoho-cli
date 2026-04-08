import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFilesList extends PeopleBaseCommand<typeof PeopleFilesList> {
  static id = 'people files list'
  static summary = 'List files'
  static examples = ['zoho people files list --filter-by my']

  static flags = {
    'file-type': Flags.string({ description: 'File type (0=HR, 1=Company)' }),
    employee: Flags.string({ description: 'Employee ID' }),
    'filter-by': Flags.string({ description: 'Filter scope', options: ['all', 'my', 'subordinates'] }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags['file-type']) params.fileType = flags['file-type']
      if (flags.employee) params.employeeId = flags.employee
      if (flags['filter-by']) params.filterBy = flags['filter-by']
      const { data } = await this.apiClient.get('/people/api/files/getAllFiles', { params })
      this.outputSuccess(this.extractResult(data), { action: 'files.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
