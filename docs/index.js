// Load bootprint
require('bootprint')
  // Load bootprint-swagger
  .load(require('bootprint-openapi'))
  // Customize configuration, override any options
  .merge(require('./config.js'))
  // Specify build source and target
  .build('main.yaml', 'gh-pages')
  // Generate swagger-documentation into "target" directory
  .generate()
  .done(console.log)
