import path from 'path'
import type { ExtensionContext } from 'vscode'
import { workspace } from 'vscode'
import type { ExecutableOptions, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'

const CLIENT_ID = 'unocss-vscode'
const CLIENT_NAME = 'UnoCSS VSCode'

const clients: Map<string, LanguageClient> = new Map()

// TBD
const serverRunOptions: ExecutableOptions = {

}

const serverDebugOptions = { execArgv: ['--nolazy', '--inspect=61009'] }

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join('dist', 'lspServer.js'))

  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: serverRunOptions,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        ...serverRunOptions,
        ...serverDebugOptions,
      },
    },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      {
        scheme: 'file',
        language: 'plaintext',
      },
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  }

  const client = new LanguageClient(CLIENT_ID, CLIENT_NAME, serverOptions, clientOptions)

  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  // context.subscriptions.push(client.start())
  client.start()
  console.log('Unocss client started')
  clients.set(CLIENT_ID, client)
}

export function deactivate(): Thenable<void> | undefined {
  const promises: Thenable<void>[] = []
  for (const client of clients.values())
    promises.push(client.stop())

  return Promise.all(promises).then(() => undefined)
}
