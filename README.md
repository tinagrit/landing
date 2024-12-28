# Landing page
This repository includes front-end code for the landing page of my personal website. See it live at [tinagrit.com](https://tinagrit.com).

## Structure

### Main HTML page
- [`/dev.html`](/dev.html)
  - refers to the active development.
- [`/prod.html`](/prod.html)
  - refers to the version that is live on the main website, at [tinagrit.com](https://tinagrit.com).

### All assets
- All of the required assets, including JavaScript, CSS, and images, are stored in the [`/template/landing_assets/`](/template/landing_assets/) folder.
- All files to be mentioned in this section are children of this folder.

### JavaScript
- [`script.js`](/template/landing_assets/script.js)
  - is the script used in development by [`/dev.html`](/dev.html). It contains detailed comments and hasn't been minified.
- [`script.min.js`](/template/landing_assets/script.min.js)
  - is the script used in production by [`/prod.html`](/prod.html). It is minified and sometimes obfuscated.

### CSS
- [`styles.css`](/template/landing_assets/styles.css)
  - is the stylesheet used in development by [`/dev.html`](/dev.html). It is not yet well-commented but that is planned to be done in the future.
- [`styles.min.css`](/template/landing_assets/styles.min.css)
  - is the stylesheet used in production by [`/prod.html`](/prod.html). It is minified.

### Favicon
- The [`images/favicon/`](/template/landing_assets/images/favicon/) folder contains all assets related to the favicon.
  - [`images/favicon/favicon-32x32.png`](/template/landing_assets/images/favicon/favicon-32x32.png) and [`images/favicon/favicon-16x16.png`](/template/landing_assets/images/favicon/favicon-16x16.png) are two main favicons used by both [`/dev.html`](/dev.html) and [`/prod.html`](/prod.html)

### Images and Icons
- All images and icons are stored in the [`images/avif/`](/template/landing_assets/images/avif/) in AVIF format.
  - Exception: the banner image used in the `<meta>` tag is stored at [`images/metaimg.png`](/template/landing_assets/images/metaimg.png).
- All icons are adjusted to be exactly double the size that they are shown on the webpage.
- The credits of where the icons are downloaded from are listed at [`images/credits.html`](/template/landing_assets/images/credits.html). This is also available in production at the same path.