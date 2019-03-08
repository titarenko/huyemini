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
    const newDir = parsePath(newPath).dir
    await fs.mkdir(newDir, { recursive: true })
    try {
      await fs.rename(this.path, newPath)
    } catch (error) {
      if (error.code !== 'EXDEV') {
        throw error
      }
      await fs.copyFile(this.path, newPath)
      await fs.unlink(this.path)
    }
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
    return mismatchedPixels > 0
      ? Image.fromPng(differencePng)
      : null
  }

  private load (): Promise<PNG> {
    return new Promise((resolve, reject) => {
      createReadStream(this.path)
        .pipe(new PNG())
        .on('error', reject)
        .on('parsed', resolve)
    })
  }

  private static fromPng (png: PNG): Promise<Image> {
    const path = this.getRandomPath()
    return new Promise(resolve => {
      png
        .pack()
        .pipe(createWriteStream(path))
        .on('close', () => resolve(new Image(path)))
    })
  }

  static async fromBuffer (buffer: Buffer): Promise<Image> {
    const path = this.getRandomPath()
    await fs.writeFile(path, buffer)
    return new Image(path)
  }

  private static getRandomPath (): string {
    const time = new Date().getTime().toString()
    const random = Math.random().toString(36).substring(2)
    return `${tmpdir()}/shtrexel-${time}-${random}.png`
  }
}
