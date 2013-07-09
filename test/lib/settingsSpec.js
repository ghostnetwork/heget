'use strict';

var assert = require('assert');
var util = require('util');
var Settings = require('../../lib/settings');

describe('Settings', function(){

  it('should receive an event when loadSettings has finished', function(done){
    Settings.on('loadSettingsForPlatformDone', function(settings) {
      assert(settings != null);
      done();
    });

    Settings.loadSettingsForPlatform();
    assert(Settings != null);
  });
});
