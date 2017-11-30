# Angular statisfy
This library generates static HTML from an existing Angular application.
The generated HTML can be used to serve spiders and crawlers in order to
improve SEO.

## Support
Statisfy is tested on Angular 4 and 5 but should work on other versions.

## Serve static files to spiders

### Apache
Using Apache, you can serve the static files to spiders using the following
partial `.htaccess` file.

```apacheconfig
RewriteEngine On

# Remove trailing /
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Rewrite spiders to static html
RewriteCond %{HTTP_USER_AGENT} (googlebot|bingbot|msnbot|yahoo|Baidu|aolbuild|facebookexternalhit|iaskspider|DuckDuckBot|Applebot|Almaden|iarchive|archive.org_bot) [NC]
RewriteCond %{DOCUMENT_ROOT}/static%{REQUEST_URI}.html -f
RewriteRule ^(.*)$ /static/$1.html [L]

# Rewrite spiders to static index.html
RewriteCond %{HTTP_USER_AGENT} (googlebot|bingbot|msnbot|yahoo|Baidu|aolbuild|facebookexternalhit|iaskspider|DuckDuckBot|Applebot|Almaden|iarchive|archive.org_bot) [NC]
RewriteCond %{REQUEST_URI} "^/$"
RewriteRule ^ /static/index.html [L]

# If an existing asset or directory is requested, serve it
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use the Angular app entry point
RewriteRule ^ /index.html
```
