import { describe, it, expect } from 'vitest'
import CoursesList from '../../../src/commands/people/lms/courses/list.js'
import CoursesMy from '../../../src/commands/people/lms/courses/my.js'
import CoursesGet from '../../../src/commands/people/lms/courses/get.js'
import CoursesCreate from '../../../src/commands/people/lms/courses/create.js'
import CoursesUpdate from '../../../src/commands/people/lms/courses/update.js'
import CoursesDelete from '../../../src/commands/people/lms/courses/delete.js'

describe('people lms courses list', () => {
  it('has correct command id', () => {
    expect(CoursesList.id).toBe('people lms courses list')
  })

  it('has a summary', () => {
    expect(CoursesList.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(CoursesList.flags.page).toBeDefined()
  })
})

describe('people lms courses my', () => {
  it('has correct command id', () => {
    expect(CoursesMy.id).toBe('people lms courses my')
  })

  it('has a summary', () => {
    expect(CoursesMy.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(CoursesMy.flags.page).toBeDefined()
  })
})

describe('people lms courses get', () => {
  it('has correct command id', () => {
    expect(CoursesGet.id).toBe('people lms courses get')
  })

  it('has a summary', () => {
    expect(CoursesGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(CoursesGet.args.id.required).toBe(true)
  })
})

describe('people lms courses create', () => {
  it('has correct command id', () => {
    expect(CoursesCreate.id).toBe('people lms courses create')
  })

  it('has a summary', () => {
    expect(CoursesCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(CoursesCreate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CoursesCreate.flags['dry-run']).toBeDefined()
  })
})

describe('people lms courses update', () => {
  it('has correct command id', () => {
    expect(CoursesUpdate.id).toBe('people lms courses update')
  })

  it('has a summary', () => {
    expect(CoursesUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(CoursesUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CoursesUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CoursesUpdate.flags['dry-run']).toBeDefined()
  })
})

describe('people lms courses delete', () => {
  it('has correct command id', () => {
    expect(CoursesDelete.id).toBe('people lms courses delete')
  })

  it('has a summary', () => {
    expect(CoursesDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(CoursesDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CoursesDelete.flags['dry-run']).toBeDefined()
  })
})
