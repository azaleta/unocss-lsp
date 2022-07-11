import { TextDocuments } from 'vscode-languageserver'
import type { ClientCapabilities, Connection, InitializeParams, ServerCapabilities } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { version } from '../package.json'
import type { UnocssCapability } from './capability'
import { getCapabilities, unocssCapabilities } from './capability'

export default class UnocssServer {
  private connection: Connection
  private clientCapabilities: ClientCapabilities
  private documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)
  private unocssLspCapabilities: UnocssCapability

  public static initialize(
    connection: Connection,
    { capabilities }: InitializeParams,
  ): UnocssServer {
    return new UnocssServer(connection, capabilities)
  }

  public register() {
    this.documents.listen(this.connection)
    // Unocss LSP handler
    this.connection.onCodeAction(unocssCapabilities.onCodeAction)
  }

  public serverCapabilities = (): ServerCapabilities => getCapabilities()

  public version = () => version

  private constructor(
    connection: Connection,
    capabilities: ClientCapabilities,
  ) {
    this.connection = connection
    this.clientCapabilities = capabilities
    this.unocssLspCapabilities = unocssCapabilities
  }
}
