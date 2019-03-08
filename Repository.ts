import { promises as fs, constants } from 'fs'

import Config from './Config'
import Image from './Image'

export default class Repository {
  private config: Config
  private name: string

  constructor (config: Config, name: string) {
    this.config = config
    this.name = name
  }

  async loadImage (name: string): Promise<Image | null> {
    try {
      const path = `${this.config.basePath}/${this.name}/${name}`
      await fs.access(path, constants.R_OK)
      return new Image(path)
    } catch (error) {
      return null
    }
  }

  saveImage (name: string, image: Image): Promise<void> {
    return image.move(`${this.config.basePath}/shots/${this.name}/${name}`)
  }
}
