# grunt-htmlclean

[![npm](https://img.shields.io/npm/v/grunt-htmlclean.svg)](https://www.npmjs.com/package/grunt-htmlclean) [![GitHub issues](https://img.shields.io/github/issues/anseki/grunt-htmlclean.svg)](https://github.com/anseki/grunt-htmlclean/issues) [![David](https://img.shields.io/david/anseki/grunt-htmlclean.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This [Grunt](http://gruntjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

* [gulp](http://gulpjs.com/) plugin: [gulp-htmlclean](https://github.com/anseki/gulp-htmlclean)
* [webpack](https://webpack.js.org/) loader: [htmlclean-loader](https://github.com/anseki/htmlclean-loader)

**If you want to just clean files, [Command Line Tool](https://github.com/anseki/htmlclean-cli) is easy way.**

Simple and safety HTML/SVG cleaner to minify without changing its structure.  
See [htmlclean](https://github.com/anseki/htmlclean) for options and more information about htmlclean.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmlclean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmlclean');
```

## Usage

In your project's Gruntfile, add a section named `htmlclean` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  htmlclean: {
    options: {
      protect: /<\!--%fooTemplate\b.*?%-->/g,
      edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
    },
    deploy: {
      expand: true,
      cwd: 'develop/',
      src: '**/*.html',
      dest: 'public_html/'
    }
  }
});
```

See [htmlclean](https://github.com/anseki/htmlclean#options) for the options.

## Working with grunt-task-helper

For example, you want to clean only changed HTML files. Then [grunt-task-helper](https://github.com/anseki/grunt-task-helper) helps it. In this case, using `handlerByContent` Function instead of this plugin is better. Because grunt parses `files` components in every tasks(targets). `handlerByContent` can be included to one task with other handlers (e.g. select changed HTML files).  
See [grunt-task-helper](https://github.com/anseki/grunt-task-helper).

Example:

`Gruntfile.js`

```js
grunt.initConfig({
  taskHelper: {
    deploy: {
      options: {
        // Select files which are newer than `dest`.
        handlerByFile: 'newFile',
        // Clean the selected files.
        handlerByContent: require('grunt-htmlclean/node_modules/htmlclean')
        //handlerByContent: require('htmlclean') // If htmlclean is already installed. (Not grunt-htmlclean)
      },
      expand: true,
      cwd: 'develop/',
      src: '**/*.html',
      dest: 'public_html/'
    }
  }
});
```
