import puppeteer from 'puppeteer'

import Config from './Config'
import Session from './Session'
import Image from './Image'

import getBbox from './utils/getBbox'

type Action = (page: puppeteer.Page) => Promise<any>

class ShotApi {
  private config: Config
  private session: Session
  private queue: Promise<any>

  constructor (config: Config, session: Session) {
    this.config = config
    this.session = session
    this.queue = Promise.resolve()
  }

  private enqueue (action: Action): ShotApi {
    this.queue = this.queue.then(async () => action(await this.session.getPage()))
    return this
  }

  goTo (relativeUrl: string): ShotApi {
    return this.enqueue(page => page.goto(
      this.config.baseUrl + relativeUrl,
      { waitUntil: 'networkidle0' }
    ))
  }

  mouseDown (selector: string): ShotApi {
    return this.enqueue(async page => {
      const bbox = await getBbox(page, selector)
      if (bbox) {
        const x = bbox.x + bbox.width / 2
        const y = bbox.y + bbox.height / 2
        await page.mouse.move(x, y)
        await page.mouse.down()
      }
    })
  }

  hover (selector: string): ShotApi {
    return this.enqueue(async page => {
      await page.hover(selector)
    })
  }

  async takeScreenshot (selector: string): Promise<Image> {
    await this.queue
    const page = await this.session.getPage()
    const bbox = await getBbox(page, selector)
    if (!bbox) {
      throw new Error(`cannot get bbox of element by selector "${selector}"`)
    }
    const buffer = await page.screenshot({ clip: bbox })
    return Image.fromBuffer(buffer)
  }
}

export default ShotApi
