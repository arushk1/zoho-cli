import { createServer, type Server } from 'node:http'

export interface CallbackResult {
  code: string
}

export function startCallbackServer(port: number): Promise<{ server: Server; codePromise: Promise<CallbackResult> }> {
  return new Promise((resolveStart, rejectStart) => {
    let resolveCode: (result: CallbackResult) => void
    let rejectCode: (error: Error) => void

    const codePromise = new Promise<CallbackResult>((resolve, reject) => {
      resolveCode = resolve
      rejectCode = reject
    })

    const server = createServer((req, res) => {
      const url = new URL(req.url ?? '/', `http://localhost:${port}`)

      if (url.pathname === '/callback') {
        const code = url.searchParams.get('code')
        const error = url.searchParams.get('error')

        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html' })
          res.end('<html><body><h1>Authorization Failed</h1><p>You can close this window.</p></body></html>')
          rejectCode(new Error(`OAuth error: ${error}`))
          return
        }

        if (code) {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end('<html><body><h1>Authorization Successful</h1><p>You can close this window.</p></body></html>')
          resolveCode({ code })
          return
        }

        res.writeHead(400, { 'Content-Type': 'text/html' })
        res.end('<html><body><h1>Missing Code</h1><p>Authorization callback missing code parameter.</p></body></html>')
        rejectCode(new Error('OAuth callback received without code parameter'))
        return
      }

      res.writeHead(404)
      res.end()
    })

    server.on('error', (err) => {
      rejectStart(err)
    })

    server.listen(port, () => {
      resolveStart({ server, codePromise })
    })
  })
}
