export interface ClientProject {
  // root path of project
  folder: string
  // enable or disable: if the project don't contain any unocss config , it will be disable
  enable: boolean
  // unocss config (only need when enable is true)
  config?: UnocssConfig
  // documentSelector(only need when enable is true)
  documentSelector?: string[]
}

type UnocssConfig = string
