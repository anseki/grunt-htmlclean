# grunt-htmlclean

This [Grunt](http://gruntjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

* [gulp](http://gulpjs.com/) plugin: [gulp-htmlclean](https://github.com/anseki/gulp-htmlclean)

Simple and lightweight cleaner that just removes whitespaces, comments, etc. to minify HTML.  
This differs from others in that this removes whitespaces, line-breaks, etc. as much as possible.

[HtmlCompressor](http://code.google.com/p/htmlcompressor/), [HTMLMinifier](https://github.com/kangax/html-minifier) and others are better choice if you want to control details of editing.  
Those configuring are a little pain in the neck for me. And the results was not what I need. So, I wrote htmlclean. This removes unneeded whitespaces, line-breaks, comments, etc. That's all.

## Removing
htmlclean removes the following texts.

+ The leading whitespaces, tabs and line-breaks, and the trailing whitespaces, tabs and line-breaks.
+ The unneeded whitespaces, tabs and line-breaks between HTML tags.
+ The more than two whitespaces, tabs and line-breaks (suppressed to one space).
+ HTML comments.

The more than two whitespaces (even if those are divided by HTML tags) in a line are suppressed.

**Example:**

Before

```html
<p>The <strong> clean <span> <em> HTML is here. </em> </span> </strong> </p>
```

After

```html
<p>The <strong>clean <span><em>HTML is here.</em></span></strong></p>
```

The whitespace that was right side of `<strong>` was removed, and the left side was kept.  
The both side whitespaces of `<em>` were removed.

## Protecting
The following texts are protected (excluded from removing).

+ The texts in `textarea`, `script` and `style` elements, and text nodes in `pre` elements.
+ The quoted texts in tag attribute.
+ The texts in SSI tags (PHP, JSP, ASP/ASP.NET and Apache SSI).
+ IE conditional comments. e.g. `<!--[if lt IE 7]>`
+ The texts between `<!--[htmlclean-protect]-->` and `<!--[/htmlclean-protect]-->`.
+ The texts that is matched by `protect` option (see "Options").

## More Informations
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

## History
 * 2015-02-13			v2.3.0			Update package.json for htmlclean v2.3.0.
 * 2014-09-16			v2.2.0			Update package.json for htmlclean v2.2.0.
 * 2013-08-27			v0.1.0			Initial release.
