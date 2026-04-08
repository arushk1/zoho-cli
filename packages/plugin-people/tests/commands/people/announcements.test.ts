import { describe, it, expect } from 'vitest'
import AnnouncementsGet from '../../../src/commands/people/announcements/get.js'
import AnnouncementsAdd from '../../../src/commands/people/announcements/add.js'
import AnnouncementsUpdate from '../../../src/commands/people/announcements/update.js'
import AnnouncementsDelete from '../../../src/commands/people/announcements/delete.js'
import AnnouncementsToggle from '../../../src/commands/people/announcements/toggle.js'

describe('people announcements get', () => {
  it('has correct command id', () => {
    expect(AnnouncementsGet.id).toBe('people announcements get')
  })

  it('has a summary', () => {
    expect(AnnouncementsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(AnnouncementsGet.args.id.required).toBe(true)
  })
})

describe('people announcements add', () => {
  it('has correct command id', () => {
    expect(AnnouncementsAdd.id).toBe('people announcements add')
  })

  it('has a summary', () => {
    expect(AnnouncementsAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(AnnouncementsAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AnnouncementsAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people announcements update', () => {
  it('has correct command id', () => {
    expect(AnnouncementsUpdate.id).toBe('people announcements update')
  })

  it('has a summary', () => {
    expect(AnnouncementsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(AnnouncementsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(AnnouncementsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AnnouncementsUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people announcements delete', () => {
  it('has correct command id', () => {
    expect(AnnouncementsDelete.id).toBe('people announcements delete')
  })

  it('has a summary', () => {
    expect(AnnouncementsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(AnnouncementsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AnnouncementsDelete.flags['dry-run']).toBeDefined()
  })
})

describe('people announcements toggle', () => {
  it('has correct command id', () => {
    expect(AnnouncementsToggle.id).toBe('people announcements toggle')
  })

  it('has a summary', () => {
    expect(AnnouncementsToggle.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(AnnouncementsToggle.args.id.required).toBe(true)
  })

  it('requires --enabled flag', () => {
    expect(AnnouncementsToggle.flags.enabled.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AnnouncementsToggle.flags['dry-run']).toBeDefined()
  })
})
