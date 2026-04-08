import { describe, it, expect } from 'vitest'
import TimerStart from '../../../src/commands/people/timetracker/timer/start.js'
import TimerPause from '../../../src/commands/people/timetracker/timer/pause.js'
import TimerCurrent from '../../../src/commands/people/timetracker/timer/current.js'
import TimerComments from '../../../src/commands/people/timetracker/timer/comments.js'

describe('people timetracker timer start', () => {
  it('has correct command id', () => {
    expect(TimerStart.id).toBe('people timetracker timer start')
  })

  it('has a summary', () => {
    expect(TimerStart.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TimerStart.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimerStart.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker timer pause', () => {
  it('has correct command id', () => {
    expect(TimerPause.id).toBe('people timetracker timer pause')
  })

  it('has a summary', () => {
    expect(TimerPause.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimerPause.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimerPause.flags['dry-run']).toBeDefined()
  })
})

describe('people timetracker timer current', () => {
  it('has correct command id', () => {
    expect(TimerCurrent.id).toBe('people timetracker timer current')
  })

  it('has a summary', () => {
    expect(TimerCurrent.summary).toBeTruthy()
  })
})

describe('people timetracker timer comments', () => {
  it('has correct command id', () => {
    expect(TimerComments.id).toBe('people timetracker timer comments')
  })

  it('has a summary', () => {
    expect(TimerComments.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimerComments.args.id.required).toBe(true)
  })
})
