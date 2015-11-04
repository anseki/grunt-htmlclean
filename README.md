# grunt-htmlclean

This [Grunt](http://gruntjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

* [gulp](http://gulpjs.com/) plugin: [gulp-htmlclean](https://github.com/anseki/gulp-htmlclean)

**If you want to just clean files, [Command Line Tool](https://github.com/anseki/htmlclean) is easy way.**

Simple and safety cleaner without changing the structure to minify HTML/SVG.

## Removing

htmlclean removes the following texts.

+ The leading whitespaces, tabs and line-breaks, and the trailing whitespaces, tabs and line-breaks.
+ The unneeded whitespaces, tabs and line-breaks between HTML/SVG tags.
+ The more than two whitespaces, tabs and line-breaks (suppressed to one space).
+ HTML/SVG comments.
+ The unneeded whitespaces, tabs and line-breaks, meaningless zeros, numbers, signs, etc. in the path data of SVG (e.g. `d` attribute of `path` element).

For example, the more than two whitespaces (even if those are divided by HTML/SVG tags) in a line are suppressed:

* Before

```html
<p>The <strong> clean <span> <em> HTML is here. </em> </span> </strong> </p>
```

* After

```html
<p>The <strong>clean <span><em>HTML is here.</em></span></strong></p>
```

The whitespace that was right side of `<strong>` was removed, and the left side was kept.  
The both side whitespaces of `<em>` were removed.

For example, in a case of this SVG file, 4,784 bytes were reduced:

<img src="https://cdn.rawgit.com/anseki/grunt-htmlclean/master/Ghostscript_Tiger.svg" width="300" height="300">

## Protecting

The following texts are protected (excluded from [Removing](#removing)).

+ The texts in `textarea`, `script` and `style` elements, and the text nodes in `pre` elements.
+ The quoted texts in the tag attributes.
+ The texts in the SSI tags (PHP, JSP, ASP/ASP.NET and Apache SSI).
+ IE conditional comments. e.g. `<!--[if lt IE 7]>`
+ The texts between `<!--[htmlclean-protect]-->` and `<!--[/htmlclean-protect]-->`.
+ The texts that is matched by the [`protect`](#protect) option.

## More Information

See [htmlclean](https://github.com/anseki/htmlclean).

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

## The "htmlclean" task

### Overview

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

See [htmlclean](https://github.com/anseki/htmlclean) for options and more information.

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
