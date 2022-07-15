import { TextDocuments } from 'vscode-languageserver/node'
import type { Connection, InitializeParams, ServerCapabilities } from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { version } from '../package.json'
import type { UnocssCapability } from './capability'
import { getCapabilities, unocssCapabilities } from './capability'
import type { ClientProject } from './types'

export class UnocssServer {
  private actived = false
  private connection: Connection
  private initializeParams!: InitializeParams
  private documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

  private projects: Map<string, ClientProject>

  private unocssLspCapabilities: UnocssCapability

  public static getInstance(
    connection: Connection,
  ) {
    return new UnocssServer(connection)
  }

  public initServer(params: InitializeParams) {
    this.connection.console.log('initServer')
    this.initializeParams = params
    this.documents.listen(this.connection)

    this.connection.console.log(params.workspaceFolders ? params.workspaceFolders.toString() : 'no workspace folders')
    // this.connection.console.log(JSON.stringify(params))

    // this.setProjects()

    // this.workspaceDidChange()

    // Unocss LSP handler

    this.connection.onCodeAction(unocssCapabilities.onCodeAction)
    this.connection.onHover(unocssCapabilities.onHover)

    this.documents.onDidOpen((event) => {
      this.connection.console.log(event.document.getText())
    })

    this.documents.onDidClose((close) => {
      this.connection.sendDiagnostics({ uri: close.document.uri, diagnostics: [] })
    })
    this.actived = true
  }

  public serverCapabilities = (): ServerCapabilities => this.actived ? getCapabilities() : {}

  public version = () => version

  public listen = () => this.connection.listen()

  private constructor(
    connection: Connection,
  ) {
    this.connection = connection
    this.unocssLspCapabilities = unocssCapabilities
    this.projects = new Map()
  }

  private setProjects() {

  }
}

