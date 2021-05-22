import {Browser} from 'puppeteer';

/**
 * Generates the static HTML for the given URL and removes the script tags.
 */
export async function generateStaticHtml(url: string, browser: Browser): Promise<string> {
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.evaluate(() => {
        document.querySelectorAll('script').forEach(node => {
            node.remove();
        });

        return document.documentElement.outerHTML;
    });
    await page.close();

    return html;
}
