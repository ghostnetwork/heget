'use strict';

var assert = require('assert');
var util = require('util');
var File = require('../../lib/file');

describe('File', function(){

  var fileToRead = 'bin/settings.json';

  it('should be able to be loaded', function(){
    assert(File !== null);
  });

  describe('#readContents', function(){
  
    it('should receive an event when the contents of a file have finished being read', function(done){
      File.on('readFileContentsDone', function(info) {
        assert(info !== null);
        done();
      });

      File.readContents(fileToRead);
      // Test will timeout if the event handler isn't called
    });
  });
  
});
