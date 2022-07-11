import type { InitializeParams, InitializeResult } from 'vscode-languageserver/node'
import { ProposedFeatures, TextDocumentSyncKind, TextDocuments, createConnection } from 'vscode-languageserver/node'

import { TextDocument } from 'vscode-languageserver-textdocument'
const connection = createConnection(ProposedFeatures.all)

const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

/**
 * Connection
*/
connection.onInitialize((_params: InitializeParams) => {
  connection.console.log('onInitialize')
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: true,
      },
    },
  }

  return result
})

connection.onInitialized(() => {
  // The server is initialized, so show the connection status
  connection.console.log('onInitialized')
})

connection.onDidChangeWatchedFiles((_change) => {
  // Monitored files have change in VS Code
  connection.console.log('We received a file change event')
})

/**
 * Document
*/
// Only keep settings for open documents
documents.onDidClose((e) => {
  console.log('onDidClose', e.document.uri)
})

documents.onDidChangeContent((change) => {
  console.log('onDidChangeContent', change.document.uri)
})

documents.listen(connection)
connection.listen()
