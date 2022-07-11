import type { InitializeParams, InitializeResult } from 'vscode-languageserver/node'
import { StreamMessageReader, StreamMessageWriter, createConnection } from 'vscode-languageserver/node'
import { version } from '../package.json'
import UnocssServer from './server'

export function listen() {
  const connection = createConnection(
    new StreamMessageReader(process.stdin),
    new StreamMessageWriter(process.stdout),
  )

  connection.onInitialize(
    async (params: InitializeParams): Promise<InitializeResult> => {
      connection.console.log(`Initialized server v${version} for ${params.workspaceFolders}`)

      const server = UnocssServer.initialize(connection, params)

      server.register()

      return {
        capabilities: server.serverCapabilities(),
      }
    },
  )

  connection.listen()
}
