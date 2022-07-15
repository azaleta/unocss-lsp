import path from 'path'
import type { ExtensionContext } from 'vscode'
import { workspace } from 'vscode'
import type { ExecutableOptions, LanguageClientOptions, MessageSignature, ServerOptions } from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'

const CLIENT_ID = 'unocss-lsp'
const CLIENT_NAME = 'UnocssLSP'

const clients: Map<string, LanguageClient> = new Map()

// TBD
const serverRunOptions: ExecutableOptions = {

}

const serverDebugOptions = { execArgv: ['--nolazy', '--inspect=61009'] }

export function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration('unocss-lsp')
  const disabled = config.get<boolean>('disable', false)
  if (disabled)
    return

  // const projectPath = workspace.workspaceFolders?.[0].uri.fsPath
  // if (!projectPath)
  //   return

  const serverModule = context.asAbsolutePath(path.join('dist', 'lspServer.js'))
  // const serverModule = context.asAbsolutePath(path.join('dist', '_lspServer.js'))

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
    diagnosticCollectionName: 'unocss',
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  }

  // const client = new LanguageClient(CLIENT_ID, CLIENT_NAME, serverOptions, clientOptions)
  const client = new DebugLanguageClient(CLIENT_ID, CLIENT_NAME, serverOptions, clientOptions)

  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  client.start().catch(error => client.error('Starting the server failed.', error, 'force'))
  // console.log('Unocss client started')
  // client.sendRequest('ssss')
  clients.set(CLIENT_ID, client)
}

export function deactivate(): Thenable<void> | undefined {
  const promises: Thenable<void>[] = []
  for (const client of clients.values())
    promises.push(client.stop())

  return Promise.all(promises).then(() => undefined)
}

// for debug use only
class DebugLanguageClient extends LanguageClient {
  public async sendRequest<R>(type: string | MessageSignature, ...params: any[]): Promise<R> {
    let res
    console.log('--------------------------------------------------')
    if (typeof type == 'string') {
      console.log(type)
      console.log(params)
      res = await super.sendRequest<R>(type, ...params)
    }
    else {
      console.log(type.method)
      console.log(params)
      res = await super.sendRequest<R>(type.method, ...params)
    }
    console.log('--->')
    console.log(res)
    return res
  }
}
