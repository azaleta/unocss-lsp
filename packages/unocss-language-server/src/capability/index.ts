import type { CodeAction, CodeActionParams, ServerCapabilities } from 'vscode-languageserver'
import { onCodeAction } from './code/codeAction'

export interface UnocssCapability {
  onCodeAction: (params: CodeActionParams) => Promise<CodeAction[]>
}

export const unocssCapabilities: UnocssCapability = {
  onCodeAction,
}

export function getCapabilities(): ServerCapabilities {
  return {
    codeActionProvider: true,
  }
}
