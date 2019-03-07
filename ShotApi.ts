import * as puppeteer from 'puppeteer'

import Config from './Config'
import { Session } from './Session'

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
}

export default ShotApi
