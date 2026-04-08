import { readFile, writeFile, unlink, mkdir, chmod } from 'node:fs/promises'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { z } from 'zod'

const TOKEN_FILE = 'tokens.json'

const tokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number(),
  scope: z.string().default(''),
  tokenType: z.string().default('Zoho-oauthtoken'),
})

export type TokenData = z.infer<typeof tokenSchema>

function defaultConfigDir(): string {
  return join(homedir(), '.zoho-cli')
}

export async function loadTokens(configDir?: string): Promise<TokenData | null> {
  const dir = configDir ?? defaultConfigDir()
  try {
    const raw = await readFile(join(dir, TOKEN_FILE), 'utf-8')
    const parsed = JSON.parse(raw)
    const result = tokenSchema.safeParse(parsed)
    if (!result.success) {
      return null
    }
    return result.data
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }
    throw error
  }
}

export async function saveTokens(configDir: string | undefined, tokens: TokenData): Promise<void> {
  const dir = configDir ?? defaultConfigDir()
  await mkdir(dir, { recursive: true })
  const filePath = join(dir, TOKEN_FILE)
  await writeFile(filePath, JSON.stringify(tokens, null, 2) + '\n')
  await chmod(filePath, 0o600)
}

export async function clearTokens(configDir?: string): Promise<void> {
  const dir = configDir ?? defaultConfigDir()
  try {
    await unlink(join(dir, TOKEN_FILE))
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }
}

export function isTokenExpired(tokens: TokenData): boolean {
  return Date.now() >= tokens.expiresAt - 60_000
}
