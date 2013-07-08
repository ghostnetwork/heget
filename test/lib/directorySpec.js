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
