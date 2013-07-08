'use strict';

var assert = require('assert');
var util = require('util');
var Foo = require('../../lib/foo');

describe('Foo', function(){
  var foo;

  beforeEach(function() {
    foo = Foo.create();
  });

  it('should be able to be created', function(){
    assert(foo !== null);
  });

  it('should scan', function(){
    var listener = function(name) {
      console.log('name: ' + name);
    };

    foo.scan('.', listener);
  });
});
