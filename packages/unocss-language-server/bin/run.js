#!/usr/bin/env node
/* eslint-disable no-console */
const server = require('../dist/index')
const pkg = require('../package')

const args = process.argv

const start = args.find(s => s === 'start')
const version = args.find(s => s === '-v' || s === '--version')
const help = args.find(s => s === '-h' || s === '--help')

if (start) {
  server.listen()
}
else if (version) {
  console.log(`Unocss Language Server Version: ${pkg.version}`)
}
else if (help) {
  console.log(`
Usage:
  unocss-language-server start
  unocss-language-server -h | --help
  unocss-language-server -v | --version
  `)
}
else {
  const command = args.join(' ')
  console.error(`Unknown command '${command}'. Run [unocss-language-server -h] for help.`)
}
