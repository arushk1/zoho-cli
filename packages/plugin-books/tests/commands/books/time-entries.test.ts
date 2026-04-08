import { describe, it, expect } from 'vitest'
import TimeEntriesList from '../../../src/commands/books/time-entries/list.js'
import TimeEntriesGet from '../../../src/commands/books/time-entries/get.js'
import TimeEntriesCreate from '../../../src/commands/books/time-entries/create.js'
import TimeEntriesUpdate from '../../../src/commands/books/time-entries/update.js'
import TimeEntriesDelete from '../../../src/commands/books/time-entries/delete.js'
import TimeEntriesStartTimer from '../../../src/commands/books/time-entries/start-timer.js'
import TimeEntriesStopTimer from '../../../src/commands/books/time-entries/stop-timer.js'
import TimeEntriesRunning from '../../../src/commands/books/time-entries/running.js'

describe('books time-entries list', () => {
  it('has correct command id', () => { expect(TimeEntriesList.id).toBe('books time-entries list') })
  it('supports --project-id flag', () => { expect(TimeEntriesList.flags['project-id']).toBeDefined() })
  it('supports --page flag', () => { expect(TimeEntriesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(TimeEntriesList.flags['per-page']).toBeDefined() })
})

describe('books time-entries get', () => {
  it('has correct command id', () => { expect(TimeEntriesGet.id).toBe('books time-entries get') })
  it('requires id arg', () => { expect(TimeEntriesGet.args.id.required).toBe(true) })
})

describe('books time-entries create', () => {
  it('has correct command id', () => { expect(TimeEntriesCreate.id).toBe('books time-entries create') })
  it('requires --data flag', () => { expect(TimeEntriesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TimeEntriesCreate.flags['dry-run']).toBeDefined() })
})

describe('books time-entries update', () => {
  it('has correct command id', () => { expect(TimeEntriesUpdate.id).toBe('books time-entries update') })
  it('requires id arg', () => { expect(TimeEntriesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(TimeEntriesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TimeEntriesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books time-entries delete', () => {
  it('has correct command id', () => { expect(TimeEntriesDelete.id).toBe('books time-entries delete') })
  it('requires id arg', () => { expect(TimeEntriesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TimeEntriesDelete.flags['dry-run']).toBeDefined() })
})

describe('books time-entries start-timer', () => {
  it('has correct command id', () => { expect(TimeEntriesStartTimer.id).toBe('books time-entries start-timer') })
  it('requires id arg', () => { expect(TimeEntriesStartTimer.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TimeEntriesStartTimer.flags['dry-run']).toBeDefined() })
})

describe('books time-entries stop-timer', () => {
  it('has correct command id', () => { expect(TimeEntriesStopTimer.id).toBe('books time-entries stop-timer') })
  it('supports --dry-run flag', () => { expect(TimeEntriesStopTimer.flags['dry-run']).toBeDefined() })
})

describe('books time-entries running', () => {
  it('has correct command id', () => { expect(TimeEntriesRunning.id).toBe('books time-entries running') })
})
