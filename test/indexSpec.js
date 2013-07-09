'use strict';

var assert = require('assert');
var Heget = require('..');

var heget;
var spec = {};

describe('Heget', function(){

  beforeEach(function() {
    heget = new Heget(spec);
  });

  it('should not fail', function(){
    var clone = Heget.create(spec);
    assert(clone !== null);
  });

});
