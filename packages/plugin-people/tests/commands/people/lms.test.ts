import { describe, it, expect } from 'vitest'
import LmsEnroll from '../../../src/commands/people/lms/enroll.js'
import LmsUnenroll from '../../../src/commands/people/lms/unenroll.js'
import LmsCategories from '../../../src/commands/people/lms/categories.js'

describe('people lms enroll', () => {
  it('has correct command id', () => {
    expect(LmsEnroll.id).toBe('people lms enroll')
  })

  it('has a summary', () => {
    expect(LmsEnroll.summary).toBeTruthy()
  })

  it('requires courseId arg', () => {
    expect(LmsEnroll.args.courseId.required).toBe(true)
  })

  it('requires --employees flag', () => {
    expect(LmsEnroll.flags.employees.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(LmsEnroll.flags['dry-run']).toBeDefined()
  })
})

describe('people lms unenroll', () => {
  it('has correct command id', () => {
    expect(LmsUnenroll.id).toBe('people lms unenroll')
  })

  it('has a summary', () => {
    expect(LmsUnenroll.summary).toBeTruthy()
  })

  it('requires courseId arg', () => {
    expect(LmsUnenroll.args.courseId.required).toBe(true)
  })

  it('requires --batch flag', () => {
    expect(LmsUnenroll.flags.batch.required).toBe(true)
  })

  it('requires --employees flag', () => {
    expect(LmsUnenroll.flags.employees.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(LmsUnenroll.flags['dry-run']).toBeDefined()
  })
})

describe('people lms categories', () => {
  it('has correct command id', () => {
    expect(LmsCategories.id).toBe('people lms categories')
  })

  it('has a summary', () => {
    expect(LmsCategories.summary).toBeTruthy()
  })
})
