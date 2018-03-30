// To load plugin (i.e. `loadTasks`) whithin `proxyquire`, this file was separated.

'use strict';

function quiet() { return this; } // eslint-disable-line no-invalid-this

if (!global.grunt) { // Because the code will be re-executed by `proxyquire`.
  global.grunt = require('grunt');
  // global.grunt.option('verbose', true);

  // Disable output
  ['write', 'writeln', 'writetableln', 'writelns', 'writeflags', 'warn', 'error', 'ok',
    'errorlns', 'oklns', 'success', 'fail', 'header', 'subhead', 'debug']
    .forEach(methodName => { global.grunt.log[methodName] = quiet; });

  global.grunt.loadTasks(require('path').resolve(__dirname, '../tasks'));
}
module.exports = global.grunt;
