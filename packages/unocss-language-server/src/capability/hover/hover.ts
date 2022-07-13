import type { Hover, TextDocumentPositionParams } from 'vscode-languageserver/node'

export async function onHover(params: TextDocumentPositionParams): Promise<Hover> {
  const pos = params.position
  const hoverStr = `${pos.line}:${pos.character}`

  console.log('onHover', hoverStr)
  return { contents: 'xxx' }
}
