import { describe, it, expect } from 'vitest'
import ClientsList from '../../../src/commands/people/timetracker/clients/list.js'
import ClientsGet from '../../../src/commands/people/timetracker/clients/get.js'
import ClientsAdd from '../../../src/commands/people/timetracker/clients/add.js'
import ClientsUpdate from '../../../src/commands/people/timetracker/clients/update.js'
import ClientsDelete from '../../../src/commands/people/timetracker/clients/delete.js'

describe('people timetracker clients list', () => {
  it('has correct command id', () => {
    expect(ClientsList.id).toBe('people timetracker clients list')
  })

  it('has a summary', () => {
    expect(ClientsList.summary).toBeTruthy()
  })
})

describe('people timetracker clients get', () => {
  it('has correct command id', () => {
    expect(ClientsGet.id).toBe('people timetracker clients get')
  })

  it('has a summary', () => {
    expect(ClientsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ClientsGet.args.id.required).toBe(true)
  })
})

describe('people timetracker clients add', () => {
  it('has correct command id', () => {
    expect(ClientsAdd.id).toBe('people timetracker clients add')
  })

  it('has a summary', () => {
    expect(ClientsAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(ClientsAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ClientsAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker clients update', () => {
  it('has correct command id', () => {
    expect(ClientsUpdate.id).toBe('people timetracker clients update')
  })

  it('has a summary', () => {
    expect(ClientsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ClientsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(ClientsUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ClientsUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker clients delete', () => {
  it('has correct command id', () => {
    expect(ClientsDelete.id).toBe('people timetracker clients delete')
  })

  it('has a summary', () => {
    expect(ClientsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ClientsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(ClientsDelete.flags['dry-run']).toBeDefined()
  })
})
