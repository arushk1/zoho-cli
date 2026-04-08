import { describe, it, expect } from 'vitest'
import OnboardingAddCandidate from '../../../src/commands/people/onboarding/add-candidate.js'
import OnboardingUpdateCandidate from '../../../src/commands/people/onboarding/update-candidate.js'
import OnboardingTrigger from '../../../src/commands/people/onboarding/trigger.js'

describe('people onboarding add-candidate', () => {
  it('has correct command id', () => {
    expect(OnboardingAddCandidate.id).toBe('people onboarding add-candidate')
  })

  it('has a summary', () => {
    expect(OnboardingAddCandidate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(OnboardingAddCandidate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(OnboardingAddCandidate.flags['dry-run']).toBeDefined()
  })
})

describe('people onboarding update-candidate', () => {
  it('has correct command id', () => {
    expect(OnboardingUpdateCandidate.id).toBe('people onboarding update-candidate')
  })

  it('has a summary', () => {
    expect(OnboardingUpdateCandidate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(OnboardingUpdateCandidate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(OnboardingUpdateCandidate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(OnboardingUpdateCandidate.flags['dry-run']).toBeDefined()
  })
})

describe('people onboarding trigger', () => {
  it('has correct command id', () => {
    expect(OnboardingTrigger.id).toBe('people onboarding trigger')
  })

  it('has a summary', () => {
    expect(OnboardingTrigger.summary).toBeTruthy()
  })

  it('requires userId arg', () => {
    expect(OnboardingTrigger.args.userId.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(OnboardingTrigger.flags['dry-run']).toBeDefined()
  })
})
