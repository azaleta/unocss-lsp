import type { CodeAction, CodeActionParams } from 'vscode-languageserver'

export async function onCodeAction(_params: CodeActionParams): Promise<CodeAction[]> {
  console.log('onCodeAction')
  return []
}
