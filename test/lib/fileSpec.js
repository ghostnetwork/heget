'use strict';

var assert = require('assert');
var util = require('util');
var File = require('../../lib/file');

describe('File', function(){

  var fileToRead = 'bin/spec.json';

  it('should be able to be loaded', function(){
    assert(File !== null);
  });

  describe('#readContents', function(){
  
    it('should be able to read the contents of a file', function(done){
      File.on('fileContentsAvailable', function(info) {
        assert(info !== null);
        done();
      });

      File.readContents(fileToRead);
    });
  });
  
});
