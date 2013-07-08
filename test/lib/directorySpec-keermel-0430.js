'use strict';

var assert = require('assert');
var Directory = require('../../lib/directory');

describe('Directory', function(){
  var directory;

  beforeEach(function() {
    directory = Directory.create();
  });

  it('should be able to be created', function(){
    assert(directory !== null);
  });

  it('should be able to scan a directory', function(done){
    var numFilesScanned = 0;

    directory.on('didScan', function(files) {
      assert(files != null);
      assert(files.length > 0);
      assert(numFilesScanned > 0);
      done();
    });

    directory.scan('.', function(name) {
      numFilesScanned++;
    });
  });


  it('should know if a directory exists or not', function(){
    directory.exists('.', function(exists) {
      assert.ok(exists);
    });
  });
  
});

/*
'use strict';

var assert = require('assert');
var directory = require('../../lib/directory');

describe('directory', function(){

  it('should be able to scan', function(done){
    var numFiles = 0;

    directory.scan('.', function(name) {
      numFiles++;
    });

    var listener = function(files){
      assert(numFiles > 0);
      done();
    };
    directory.on('didScan', listener);
  });

  it('should emit an event when the scan is complete', function(done){
    directory.scan('.', function(name) {});

    var listener = function(files){
      assert(files.length > 0);
      done();
    };
    directory.on('didScan', listener);
  });

  it('should emit an event when the scan is complete', function(done){
    directory.scan('.', function(name) {});
    directory.on('didScan', function(files) {
      assert(files.length > 0);
      done();
    });
    
  });
  
});
*/