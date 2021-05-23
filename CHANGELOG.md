# Changelog

## [2.0.0](https://github.com/MatthiasKunnen/angular-statisfy/compare/v1.2.1...v2.0.0) (2021-05-23)

### ⚠ BREAKING CHANGES

* Out with the old, in with the new. This new version is
wholly incompatible with v1. The new version simply exports a function
which given a URL and Puppeteer browser, renders the page and extracts
the HTML. This leaves the implementor free to handle the browser as
they need.

### Features

* rewrite library ([e503be0](https://github.com/MatthiasKunnen/angular-statisfy/commit/e503be0eda863b81e23588f341908617c37970fe))
