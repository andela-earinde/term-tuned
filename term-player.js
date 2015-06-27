var widgets = require('./term-widgets.js');

widgets.fm.on('cd', function() {
  console.log(arguments[0]);
});