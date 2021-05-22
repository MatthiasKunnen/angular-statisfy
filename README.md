# Angular statisfy
[![npm version](https://img.shields.io/npm/v/angular-statisfy.svg?style=for-the-badge)](https://www.npmjs.com/package/angular-statisfy)
[![Build Status](https://img.shields.io/github/workflow/status/MatthiasKunnen/angular-statisfy/Main?label=Build&logo=github&style=for-the-badge)
](https://github.com/MatthiasKunnen/angular-statisfy/actions)
[![License](https://img.shields.io/npm/l/angular-statisfy?style=for-the-badge&color=green)
](https://github.com/MatthiasKunnen/angular-statisfy/blob/master/LICENSE)

This library renders your application, strips the script tags, and returns the static HTML for a given URL.
The generated HTML can be used to serve spiders and crawlers in order to improve SEO.

Originally made for Angular but works for any single page applications or website.

## Install
Install the library using `yarn add angular-statisfy`.

## Usage

The default usage of statisfy can be found in the code below.

```typescript
import {launch} from 'puppeteer';

import {generateStaticHtml} from './generate-static';

(async () => {
    const browser = await launch({
        args: ['--no-sandbox'],
    });

    const html = await generateStaticHtml('https://bookingworldspeakers.com', browser);

    await browser.close();
})().catch(console.error);
```
