export default class Config {
  private static current: Config

  readonly basePath: string
  readonly baseUrl: string
  readonly shotFiles: string

  private constructor (deserialized: any) {
    this.basePath = process.cwd() + '/' + deserialized.basePath
    this.baseUrl = deserialized.baseUrl
    this.shotFiles = deserialized.shotFiles
  }

  static getCurrent (): Config {
    if (!this.current) {
      this.current = this.fromFile(process.cwd() + '/.shtrexel.config.js')
    }
    return this.current
  }

  static fromFile(path: string): Config {
    return new Config(require(path))
  }
}
