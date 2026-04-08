import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { configSchema, ENV_MAP, type ZohoConfig } from './schema.js'

const CONFIG_FILE = 'config.json'

export function defaultConfigDir(): string {
  return join(homedir(), '.zoho-cli')
}

export async function loadConfig(configDir?: string): Promise<ZohoConfig> {
  const dir = configDir ?? defaultConfigDir()
  const filePath = join(dir, CONFIG_FILE)
  try {
    const raw = await readFile(filePath, 'utf-8')
    return configSchema.parse(JSON.parse(raw))
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return configSchema.parse({})
    }
    throw error
  }
}

export async function saveConfig(
  configDir: string | undefined,
  partial: Partial<ZohoConfig>,
): Promise<ZohoConfig> {
  const dir = configDir ?? defaultConfigDir()
  await mkdir(dir, { recursive: true })
  const existing = await loadConfig(dir)
  const merged = configSchema.parse({ ...existing, ...partial })
  await writeFile(join(dir, CONFIG_FILE), JSON.stringify(merged, null, 2) + '\n')
  return merged
}

export async function getConfigValue(
  configDir: string | undefined,
  key: keyof ZohoConfig,
): Promise<ZohoConfig[keyof ZohoConfig] | undefined> {
  const config = await loadConfig(configDir)
  return config[key]
}

export async function resolveConfig(
  configDir: string | undefined,
  env: Record<string, string | undefined>,
): Promise<ZohoConfig> {
  const fileConfig = await loadConfig(configDir)
  const overrides: Record<string, unknown> = {}
  for (const [envKey, configKey] of Object.entries(ENV_MAP)) {
    if (env[envKey] !== undefined) {
      overrides[configKey] = env[envKey]
    }
  }
  return configSchema.parse({ ...fileConfig, ...overrides })
}
