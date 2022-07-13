import type { DidChangeTextDocumentParams } from 'vscode-languageserver/node'

export async function onDidChangeTextDocument(_params: DidChangeTextDocumentParams) {
  console.log('onDidChangeTextDocument')
}
