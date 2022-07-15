import type { InitializeParams, InitializeResult } from 'vscode-languageserver/node'
import { StreamMessageReader, StreamMessageWriter, createConnection } from 'vscode-languageserver/node'
import { version } from '../package.json'
import { UnocssServer } from './server'

export function listen() {
  const connection = createConnection(
    new StreamMessageReader(process.stdin),
    new StreamMessageWriter(process.stdout),
  )
  const server = UnocssServer.getInstance(connection)

  connection.onInitialize(
    async (params: InitializeParams): Promise<InitializeResult> => {
      connection.console.log(`Initialized server v${version} for ${params.workspaceFolders}`)
      server.initServer(params)
      // server.listen()

      return {
        capabilities: server.serverCapabilities(),
      }
    },
  )

  server.listen()
}
