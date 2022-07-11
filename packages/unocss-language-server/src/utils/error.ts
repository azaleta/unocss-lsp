export function formatError(message: string, err: any): string {
  if (err)
    return `${message}: ${toString(err)}`
  return message
}

function toString(err: any): string {
  if (err instanceof Error)
    return `${(<Error>err).message}\n${(<Error>err).stack}`
  else if (typeof err === 'string')
    return err
  else
    return err.toString()
}
