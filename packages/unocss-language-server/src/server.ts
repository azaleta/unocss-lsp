import { TextDocuments } from 'vscode-languageserver/node'
import type { Connection, InitializeParams, ServerCapabilities } from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { version } from '../package.json'
import type { UnocssCapability } from './capability'
import { getCapabilities, unocssCapabilities } from './capability'

export class UnocssServer {
  private initialized = false
  private connection: Connection
  private initializeParams: InitializeParams | undefined
  private documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)
  private unocssLspCapabilities: UnocssCapability

  public static initialize(
    connection: Connection,
  ) {
    return new UnocssServer(connection)
  }

  public register(params: InitializeParams) {
    this.connection.console.log('register')
    this.initializeParams = params
    this.documents.listen(this.connection)
    // Unocss LSP handler
    this.connection.onCodeAction(unocssCapabilities.onCodeAction)
    this.connection.onHover(unocssCapabilities.onHover)

    this.documents.onDidOpen((event) => {
      this.connection.console.log(event.document.getText())
    })

    this.documents.onDidClose((close) => {
      this.connection.sendDiagnostics({ uri: close.document.uri, diagnostics: [] })
    })
  }

  public serverCapabilities = (): ServerCapabilities => getCapabilities()

  public version = () => version

  public listen = () => this.connection.listen()

  private constructor(
    connection: Connection,
  ) {
    this.connection = connection
    this.unocssLspCapabilities = unocssCapabilities
  }
}
