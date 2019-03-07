import { promises as fs, constants } from 'fs'

import Config from './Config'
import Image from './Image'

export default class Repository {
  private config: Config

  constructor (config: Config) {
    this.config = config
  }

  async loadReference (name: string): Promise<Image | null> {
    try {
      const path = `${this.config.basePath}/${name}/reference.png`
      await fs.access(path, constants.R_OK)
      return new Image(path)
    } catch (error) {
      return null
    }
  }

  async saveShot (name: string, shot: Image): Promise<void> {
  }

  async saveDifference (name: string, difference: Image): Promise<void> {
  }
}
