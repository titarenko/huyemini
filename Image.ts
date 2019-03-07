import { promises as fs } from 'fs'

import { PNG } from 'pngjs'
import * as pixelmatch from 'pixelmatch'

export default class Image {
  private path: string

  constructor(path: string) {
    this.path = path
  }

  async getDifference (another: Image): Promise<Image> {
    throw new Error('not implemented yet')
  }
}
