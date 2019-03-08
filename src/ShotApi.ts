import * as puppeteer from 'puppeteer'

import Config from './Config'
import Session from './Session'
import Image from './Image'

class ShotApi {
  private config: Config
  private session: Session
  private queue: Promise<any>

  constructor (config: Config, session: Session) {
    this.config = config
    this.session = session
    this.queue = Promise.resolve()
  }

  goTo (relativeUrl: string): ShotApi {
    this.queue = this.queue.then(async () => {
      const page = await this.session.getPage()
      await page.goto(this.config.baseUrl + relativeUrl, { waitUntil: 'networkidle0' })
    })
    return this
  }

  evaluate (fn: puppeteer.EvaluateFn, ...args: puppeteer.SerializableOrJSHandle[]): ShotApi {
    this.queue = this.queue.then(async () => {
      const page = await this.session.getPage()
      await page.evaluate(fn, ...args)
    })
    return this
  }

  async takeScreenshot (selector: string): Promise<Image> {
    await this.queue
    const page = await this.session.getPage()
    const serializedRect = await page.evaluate(selector => {
      const element = document.querySelector(selector)
      return element && JSON.stringify(element.getBoundingClientRect())
    }, selector)
    const rect = serializedRect && JSON.parse(serializedRect)
    if (!rect) {
      throw new Error(`cannot get boundaries of element by selector "${selector}"`)
    }
    const buffer = await page.screenshot({ clip: rect })
    return Image.fromBuffer(buffer)
  }
}

export default ShotApi
