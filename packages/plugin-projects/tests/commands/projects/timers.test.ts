import { describe, it, expect } from 'vitest'
import TimersList from '../../../src/commands/projects/timers/list.js'
import TimersStart from '../../../src/commands/projects/timers/start.js'
import TimersPause from '../../../src/commands/projects/timers/pause.js'
import TimersResume from '../../../src/commands/projects/timers/resume.js'
import TimersStop from '../../../src/commands/projects/timers/stop.js'

describe('projects timers list', () => {
  it('has correct command metadata', () => {
    expect(TimersList.id).toBe('projects timers list')
  })

  it('has a summary', () => {
    expect(TimersList.summary).toBeTruthy()
  })
})

describe('projects timers start', () => {
  it('has correct command metadata', () => {
    expect(TimersStart.id).toBe('projects timers start')
  })

  it('has a summary', () => {
    expect(TimersStart.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TimersStart.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimersStart.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimersStart.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects timers pause', () => {
  it('has correct command metadata', () => {
    expect(TimersPause.id).toBe('projects timers pause')
  })

  it('has a summary', () => {
    expect(TimersPause.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimersPause.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimersPause.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimersPause.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects timers resume', () => {
  it('has correct command metadata', () => {
    expect(TimersResume.id).toBe('projects timers resume')
  })

  it('has a summary', () => {
    expect(TimersResume.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimersResume.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimersResume.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimersResume.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects timers stop', () => {
  it('has correct command metadata', () => {
    expect(TimersStop.id).toBe('projects timers stop')
  })

  it('has a summary', () => {
    expect(TimersStop.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TimersStop.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TimersStop.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TimersStop.flags['dry-run'] as any).default).toBe(false)
  })
})
