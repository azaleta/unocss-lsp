import UnocssServer from '@uno-lsp/unocss-language-server'
import type { InitializeParams, InitializeResult } from 'vscode-languageserver/node'
import { ProposedFeatures, createConnection } from 'vscode-languageserver/node'

const connection = createConnection(ProposedFeatures.all)

connection.onInitialize((params: InitializeParams): InitializeResult => {
  connection.console.info('Unocss LanguageServer initializing...')
  const server = UnocssServer.initialize(connection, params)
  server.register()
  connection.console.log(`Initialized server v${server.version()} for ${params.workspaceFolders}`)

  return {
    capabilities: server.serverCapabilities(),
  }
})

process.on('unhandledRejection', (reason: any) => {
  connection.console.error(`Unhandled Rejection : ${reason}`)
})

connection.listen()

