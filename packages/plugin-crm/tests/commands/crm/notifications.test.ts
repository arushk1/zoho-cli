import { describe, it, expect } from 'vitest'
import CrmNotificationsList from '../../../src/commands/crm/notifications/list.js'
import CrmNotificationsEnable from '../../../src/commands/crm/notifications/enable.js'
import CrmNotificationsDisable from '../../../src/commands/crm/notifications/disable.js'

describe('crm notifications list', () => {
  it('has correct command id', () => {
    expect(CrmNotificationsList.id).toBe('crm notifications list')
  })

  it('has a summary', () => {
    expect(CrmNotificationsList.summary).toBeDefined()
    expect(typeof CrmNotificationsList.summary).toBe('string')
    expect(CrmNotificationsList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmNotificationsList.examples).toBeDefined()
    expect(CrmNotificationsList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmNotificationsList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmNotificationsList.flags ?? {}).length).toBe(0)
  })
})

describe('crm notifications enable', () => {
  it('has correct command id', () => {
    expect(CrmNotificationsEnable.id).toBe('crm notifications enable')
  })

  it('has a summary', () => {
    expect(CrmNotificationsEnable.summary).toBeDefined()
    expect(typeof CrmNotificationsEnable.summary).toBe('string')
    expect(CrmNotificationsEnable.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmNotificationsEnable.examples).toBeDefined()
    expect(CrmNotificationsEnable.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmNotificationsEnable.args ?? {}).length).toBe(0)
  })

  it('requires --data flag with notification config JSON', () => {
    expect(CrmNotificationsEnable.flags.data).toBeDefined()
    expect(CrmNotificationsEnable.flags.data.required).toBe(true)
    expect((CrmNotificationsEnable.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(CrmNotificationsEnable.flags['dry-run']).toBeDefined()
    expect((CrmNotificationsEnable.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('crm notifications disable', () => {
  it('has correct command id', () => {
    expect(CrmNotificationsDisable.id).toBe('crm notifications disable')
  })

  it('has a summary', () => {
    expect(CrmNotificationsDisable.summary).toBeDefined()
    expect(typeof CrmNotificationsDisable.summary).toBe('string')
    expect(CrmNotificationsDisable.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmNotificationsDisable.examples).toBeDefined()
    expect(CrmNotificationsDisable.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmNotificationsDisable.args ?? {}).length).toBe(0)
  })

  it('requires --channel-ids flag', () => {
    expect(CrmNotificationsDisable.flags['channel-ids']).toBeDefined()
    expect(CrmNotificationsDisable.flags['channel-ids'].required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(CrmNotificationsDisable.flags['dry-run']).toBeDefined()
    expect((CrmNotificationsDisable.flags['dry-run'] as any).default).toBe(false)
  })
})
