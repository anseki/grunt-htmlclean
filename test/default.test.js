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
  CONTENTS = ['content-1.html', 'content-2.html']
    .map(fileName => require('fs').readFileSync(
      path.join(FIXTURES_DIR_PATH, fileName), {encoding: 'utf8'}))
    .join(grunt.util.linefeed),
  RES_METHOD = `${CONTENTS}<htmlclean>`,
  OUTPUT_PATH = 'path/to/output',
  LIB_NAME = 'htmlclean';

function resetAll() {
  htmlclean.resetHistory();
  grunt.file.write.resetHistory();
}

function runTask(done, options, files) {
  let error;
  grunt.initConfig({
    [LIB_NAME]: {
      test: {
        options,
        files: files || [{
          src: `${FIXTURES_DIR_PATH}/*.html`,
          dest: OUTPUT_PATH
        }]
      }
    }
  });
  grunt.task.options({done: () => { done(error); }});
  grunt.task.options({error: err => { error = err; }});
  grunt.task.run('default');
  grunt.task.start({asyncDone: true});
}

grunt.registerTask('default', [`${LIB_NAME}:test`]);
sinon.stub(grunt.file, 'write');

describe('implements a basic flow as file based plugin', () => {
  const OPTS = {p1: 'v1', p2: 'v2'};

  it('should accept contents from all source files', done => {
    resetAll();
    runTask(
      () => {
        expect(htmlclean.calledOnceWithExactly(CONTENTS, OPTS)).to.be.true;
        expect(grunt.file.write.calledOnceWithExactly(OUTPUT_PATH, RES_METHOD)).to.be.true;

        done();
      },
      OPTS
    );
  });

  it('should skip process if no file is input', done => {
    resetAll();
    runTask(
      () => {
        expect(htmlclean.notCalled).to.be.true;
        expect(grunt.file.write.notCalled).to.be.true;

        done();
      },
      OPTS,
      [{
        src: `${FIXTURES_DIR_PATH}/*.txt`,
        dest: OUTPUT_PATH
      }]
    );
  });

});
