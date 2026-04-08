import { describe, it, expect } from 'vitest'
import FilesList from '../../../src/commands/people/files/list.js'
import FilesUpload from '../../../src/commands/people/files/upload.js'
import FilesDownload from '../../../src/commands/people/files/download.js'
import FilesDelete from '../../../src/commands/people/files/delete.js'
import FilesAddFolder from '../../../src/commands/people/files/add-folder.js'

describe('people files list', () => {
  it('has correct command id', () => {
    expect(FilesList.id).toBe('people files list')
  })

  it('has a summary', () => {
    expect(FilesList.summary).toBeTruthy()
  })

  it('supports --file-type flag', () => {
    expect(FilesList.flags['file-type']).toBeDefined()
  })

  it('supports --employee flag', () => {
    expect(FilesList.flags.employee).toBeDefined()
  })
})

describe('people files upload', () => {
  it('has correct command id', () => {
    expect(FilesUpload.id).toBe('people files upload')
  })

  it('has a summary', () => {
    expect(FilesUpload.summary).toBeTruthy()
  })

  it('requires --file flag', () => {
    expect(FilesUpload.flags.file.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(FilesUpload.flags['dry-run']).toBeDefined()
  })
})

describe('people files download', () => {
  it('has correct command id', () => {
    expect(FilesDownload.id).toBe('people files download')
  })

  it('has a summary', () => {
    expect(FilesDownload.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(FilesDownload.args.id.required).toBe(true)
  })
})

describe('people files delete', () => {
  it('has correct command id', () => {
    expect(FilesDelete.id).toBe('people files delete')
  })

  it('has a summary', () => {
    expect(FilesDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(FilesDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(FilesDelete.flags['dry-run']).toBeDefined()
  })
})

describe('people files add-folder', () => {
  it('has correct command id', () => {
    expect(FilesAddFolder.id).toBe('people files add-folder')
  })

  it('has a summary', () => {
    expect(FilesAddFolder.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(FilesAddFolder.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(FilesAddFolder.flags['dry-run']).toBeDefined()
  })
})
