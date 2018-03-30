/*
 * grunt-htmlclean
 * https://github.com/anseki/grunt-htmlclean
 *
 * Copyright (c) 2018 anseki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var htmlclean = require('htmlclean');

  grunt.registerMultiTask('htmlclean', 'Simple and safety HTML/SVG cleaner to minify without changing its structure.', function() {
    var options = this.options();

    this.files.forEach(function(f) {
      // Concat specified files.
      var srcFiles = f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          }
          return true;
        }),
        content = srcFiles.length
          ? srcFiles.map(function(filepath) { return grunt.file.read(filepath); })
            .join(grunt.util.linefeed) :
          null;

      if (content == null) { return; }

      content = htmlclean(content, options);

      // Write the destination file.
      grunt.file.write(f.dest, content);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
