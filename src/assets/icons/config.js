var path = require( 'path' );

module.exports = {
  // CSS filenames
  datasvgcss: 'icons.data.svg.css',
  datapngcss: 'icons.data.png.css',
  urlpngcss: 'icons.fallback.css',

  // preview HTML filename
  previewhtml: 'preview.html',

  // grunticon loader code snippet filename
  loadersnippet: 'grunticon.loader.js',

  // Include loader code for SVG markup embedding
  enhanceSVG: true,

  // Make markup embedding work across domains (if CSS hosted externally)
  corsEmbed: false,

  // prefix for CSS classnames
  cssprefix: '.icon-',

  defaultWidth: '60px',
  defaultHeight: '60px',

  template: path.join( __dirname, 'default-css.hbs' ),
  previewTemplate: path.join( __dirname, 'preview.hbs' ),
};