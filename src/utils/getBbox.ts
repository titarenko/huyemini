import { Page, BoundingBox } from 'puppeteer'

export default async function getBbox (page: Page, selector: string): Promise<BoundingBox | null> {
  const element = await page.$(selector)
  const initial = element && await element.boundingBox()
  if (!initial) {
    return null
  }
  const style = JSON.parse(await page.$eval(selector, el => JSON.stringify(getComputedStyle(el))))
  const shadow = getShadowBbox(initial, style)
  if (!shadow) {
    return initial
  }
  return shadow
}

function getShadowBbox (initial: BoundingBox, style: CSSStyleDeclaration): BoundingBox | null {
  const value = style.boxShadow
  if (!value) {
    return null
  }
  const shadows = value
    .split(',')
    .filter(it => !it.includes('inset'))
    .map(s => s.match(/[-+]?\d*\.?\d+px/g))
    .filter(Boolean)
    .map(s => (s as string[]).map(p => parseFloat(p)))
    .map(([x, y, blur, spread]) => ({ x, y, blur, spread }))
  if (!shadows.length) {
    return null
  }
  const box = shadows.reduce((bbox, { x, y, blur, spread }) => {
    const addendum = blur + spread
    return {
      left: Math.min(x - addendum, bbox.left),
      top: Math.min(y - addendum, bbox.top),
      right: Math.max(x + addendum, bbox.right),
      bottom: Math.max(y + addendum, bbox.bottom),
    }
  }, { left: 0, top: 0, right: 0, bottom: 0 })
  return {
    x: initial.x + box.left,
    y: initial.y + box.top,
    width: initial.width + box.right - box.left,
    height: initial.height + box.bottom - box.top,
  }
}

class Rect {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number

  constructor(r: { x: number, y: number, width: number, height: number }) {
    this.x = r.x
    this.y = r.y
    this.width = r.width
    this.height = r.height
  }

  get left () {
    return this.x
  }

  get top () {
    return this.y
  }

  get right () {
    return this.x + this.width
  }

  get bottom () {
    return this.y + this.height
  }

  extend (another: Rect): Rect {
    const x = Math.min(this.x, another.x)
    const y = Math.min(this.y, another.y)
    const right = Math.max(this.right, another.right)
    const bottom = Math.max(this.bottom, another.bottom)
    return new Rect({
      x,
      y,
      width: right - x,
      height: bottom - y,
    })
  }
}
