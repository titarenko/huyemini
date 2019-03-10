import { Page, BoundingBox } from 'puppeteer';
export default function getBbox(page: Page, selector: string): Promise<BoundingBox | null>;
