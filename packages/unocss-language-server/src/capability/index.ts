import type { CodeAction, CodeActionParams, Hover, ServerCapabilities, TextDocumentPositionParams } from 'vscode-languageserver/node'
import { TextDocumentSyncKind } from 'vscode-languageserver/node'
import { onCodeAction } from './code/codeAction'
import { onHover } from './hover/hover'

export interface UnocssCapability {
  onCodeAction: (params: CodeActionParams) => Promise<CodeAction[]>
  onHover: (params: TextDocumentPositionParams) => Promise<Hover>

}

export const unocssCapabilities: UnocssCapability = {
  onCodeAction,
  onHover,
}

export function getCapabilities(): ServerCapabilities {
  return {
    codeActionProvider: true,
    hoverProvider: true,
    textDocumentSync: {
      openClose: true,
      change: TextDocumentSyncKind.Full,
    },
  }
}
