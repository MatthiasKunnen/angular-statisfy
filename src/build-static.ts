import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

export namespace Statisfy {

    export interface StatisfyConfigInterface {

        /**
         * The directory to place the generated files in.
         */
        directory?: string;

        /**
         * An absolute URL pointing to the host to statisfy.
         */
        host: string;

        /**
         * An array of routes to statisfy.
         */
        routes: string[];

        /**
         * Use this to disable the sandbox setting of puppeteer. This can be useful when
         * encountering errors in a docker environment.
         * @default true
         */
        sandBox?: boolean;

        /**
         * The amount of times to try statisfying a page before continuing to the next.
         * @default 3
         */
        tries?: number;

        /**
         * Enable verbose mode.
         * @default true
         */
        verbose?: boolean;
    }

    export function generateStaticHtml(config: StatisfyConfigInterface) {

        const puppeteerArgs: Array<string> = [];

        if (config.sandBox === false) {
            puppeteerArgs.push(...[
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]);
        }

        const tries = config.tries || 3;

        (async () => {
            const browser = await puppeteer.launch({args: puppeteerArgs});

            for (const route of config.routes) {
                const fullRoute = config.host + route;

                if (config.verbose !== false) {
                    console.log(`Statisfying ${fullRoute}`);
                }

                let html: any;
                let success = false;
                let tryCounter = 0;

                while (!success && tryCounter++ <= tries) {
                    try {
                        const page = await browser.newPage();
                        await page.goto(fullRoute);
                        html = await page.evaluate(() => document.documentElement.outerHTML);
                        await page.close();
                        success = true;
                    } catch (e) {
                        if (config.verbose !== false) {
                            console.warn(`Could not evaluate ${fullRoute} in`
                                + ` try ${tryCounter}.`);
                            console.warn(`Error: ${e}`);
                        }
                    }
                }

                if (!success) {
                    console.error(`Could not evaluate ${fullRoute} in ${tryCounter} tries.`);
                    continue;
                }

                const dom = cheerio.load(html);
                dom('script').each((index, item) => {
                    if ('src' in item.attribs && !item.attribs.src.startsWith('http')) {
                        dom(item).remove();
                    }
                });

                dom('base').attr('href', config.host);

                const editedDom = dom.html();
                writeFile(
                    `${config.directory}/${route ? route : 'index'}.html`,
                    editedDom,
                    err => {
                        if (err) {
                            console.error(err);
                        }
                    },
                );
            }

            await browser.close();
        })();
    }

    function writeFile(filePath: string, contents: any, cb: (err) => void) {
        mkdirp(path.dirname(filePath), err => {
            if (err) {
                return cb(err);
            }

            fs.writeFile(filePath, contents, cb);
        });
    }
}
