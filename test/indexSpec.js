'use strict';

var assert = require('assert');
var Heget = require('..');

var heget;

heget = new Heget();

describe('Heget', function(){

  it('should not fail', function(){
    var clone = Heget.create();
    assert(clone !== null);
  });

});
