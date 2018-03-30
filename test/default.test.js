'use strict';

const expect = require('chai').expect,
  sinon = require('sinon'),
  proxyquire = require('proxyquire').noPreserveCache(),
  htmlclean = (htmlclean => {
    htmlclean['@global'] = htmlclean['@noCallThru'] = true;
    return htmlclean;
  })(sinon.spy(content => `${content}<htmlclean>`)),
  grunt = proxyquire('./init-grunt.js', {htmlclean}),
  path = require('path'),

  FIXTURES_DIR_PATH = path.resolve(__dirname, 'fixtures'),
  ALL_CONTENTS = ['content-1.html', 'content-2.html']
    .map(fileName => require('fs').readFileSync(
      path.join(FIXTURES_DIR_PATH, fileName), {encoding: 'utf8'}))
    .join(grunt.util.linefeed),
  OUTPUT_PATH = 'path/to/output';

function resetAll() {
  htmlclean.resetHistory();
  grunt.file.write.resetHistory();
}

function runTask(options, done, files) {
  grunt.initConfig({
    htmlclean: {
      test: {
        options,
        files: files || [{
          src: `${FIXTURES_DIR_PATH}/*.html`,
          dest: OUTPUT_PATH
        }]
      }
    }
  });
  grunt.task.options({done});
  grunt.task.run('default');
  grunt.task.start({asyncDone: true});
}

grunt.registerTask('default', ['htmlclean:test']);
sinon.stub(grunt.file, 'write');
sinon.stub(grunt, 'warn');

describe('implements a basic flow as file based plugin', () => {
  const OPTS = {p1: 'v1', p2: 'v1'};

  it('should skip process if no file is input', done => {
    resetAll();
    runTask(
      OPTS,
      () => {
        expect(htmlclean.notCalled).to.be.true;
        expect(grunt.file.write.notCalled).to.be.true;

        done();
      },
      [{
        src: `${FIXTURES_DIR_PATH}/*.txt`,
        dest: OUTPUT_PATH
      }]
    );
  });

  it('should accept contents from all source files', done => {
    resetAll();
    runTask(
      OPTS,
      () => {
        expect(htmlclean.calledOnceWithExactly(ALL_CONTENTS, OPTS)).to.be.true;
        expect(grunt.file.write.calledOnceWithExactly(
          OUTPUT_PATH, `${ALL_CONTENTS}<htmlclean>`)).to.be.true;

        done();
      }
    );
  });

});
