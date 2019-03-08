import * as puppeteer from 'puppeteer'

import Config from './Config'
import Session from './Session'
import Image from './Image'

class ShotApi {
  private config: Config
  private session: Session

  constructor (config: Config, session: Session) {
    this.config = config
    this.session = session
  }

  async goTo (relativeUrl: string): Promise<ShotApi> {
    const page = await this.session.getPage()
    await page.goto(this.config.baseUrl + relativeUrl, { waitUntil: 'networkidle0' })
    return this
  }

  async evaluate (fn: puppeteer.EvaluateFn, ...args: puppeteer.SerializableOrJSHandle[]): Promise<ShotApi> {
    const page = await this.session.getPage()
    await page.evaluate(fn, ...args)
    return this
  }

  async takeScreenshot (selector: string): Promise<Image> {
    const page = await this.session.getPage()
    const rect: puppeteer.BoundingBox = await page.evaluate(selector => {
      const element = document.querySelector(selector)
      return element
        ? element.getBoundingClientRect()
        : null
    }, selector)
    if (!rect) {
      throw new Error(`cannot get boundaries of element by selector "${selector}"`)
    }
    const buffer = await page.screenshot({ clip: rect })
    return Image.fromBuffer(buffer)
  }
}

export default ShotApi
