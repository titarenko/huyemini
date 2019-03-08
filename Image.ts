import { promises as fs, createReadStream, createWriteStream } from 'fs'
import { tmpdir } from 'os'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { parse as parsePath } from 'path'

export default class Image {
  private path: string

  constructor(path: string) {
    if (!path.endsWith('.png')) {
      path += '.png'
    }
    this.path = path
  }

  get name (): string {
    return parsePath(this.path).name
  }

  async move (newPath: string): Promise<void> {
    if (!newPath.endsWith('.png')) {
      newPath += '.png'
    }
    await fs.rename(this.path, newPath)
    this.path = newPath
  }

  /**
   * @param another image to compare current image to
   * @returns difference image or null if current image is identical to another one
   */
  async compareTo (another: Image): Promise<Image | null> {
    const [png, anotherPng] = await Promise.all([this.load(), another.load()])
    const differencePng = new PNG({ width: png.width, height: png.height })
    const mismatchedPixels = pixelmatch(
      png.data, anotherPng.data,
      differencePng.data, differencePng.width, differencePng.height,
      { threshold: 0.1 }
    )
    if (mismatchedPixels > 0) {
      const time = new Date().getTime().toString()
      const random = Math.random().toString(36).substring(2)
      const path = `${tmpdir()}/shtrexel-difference-${time}-${random}.png`
      return new Promise(resolve => {
        differencePng
          .pack()
          .pipe(createWriteStream(path))
          .on('close', () => resolve(new Image(path)))
      })
    } else {
      return null
    }
  }

  private load (): Promise<PNG> {
    return new Promise((resolve, reject) => {
      createReadStream(this.path)
        .pipe(new PNG())
        .on('error', reject)
        .on('parsed', resolve)
    })
  }
}
