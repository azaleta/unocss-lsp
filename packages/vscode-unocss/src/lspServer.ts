import type { InitializeParams, InitializeResult } from 'vscode-languageserver/node'
import { ProposedFeatures, createConnection } from 'vscode-languageserver/node'
// import UnocssServer from '../../unocss-language-server/src/server'
import { UnocssServer } from '../../unocss-language-server/src/server'

const connection = createConnection(ProposedFeatures.all)

const server = UnocssServer.getInstance(connection)

connection.onInitialize((params: InitializeParams): InitializeResult => {
  connection.console.info('Unocss LanguageServer initializing...')
  server.initServer(params)
  connection.console.info(`Initialized server v${server.version()} for ${params.workspaceFolders}`)

  return {
    capabilities: server.serverCapabilities(),
  }
})

connection.onInitialized(() => {
  // connection.console.log(`Initialized server v${server.version()}`)
  // server.listen()
})

server.listen()

process.on('unhandledRejection', (reason: any) => {
  connection.console.error(`Unhandled Rejection : ${reason}`)
})

// connection.onHover((_p) => {
//   connection.console.log('onHover')
//   return null
// })

// connection.onRequest((p) => {
//   connection.console.log(p)
// })

