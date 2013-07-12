#!/usr/bin/env node

'use strict';

var util = require('util');
var File = require('../lib/file');
var Heget = require('../index');
var Settings = require('../lib/settings');

try {
  var heget;

  Settings.on('loadSettingsForPlatformDone', function(settings) {
    heget = Heget.create(settings);
    heget.scan();
  });

  Settings.loadSettingsForPlatform('bin/settings.json');
}
catch(err) {
  console.log(err.stack);
  process.exit(1);
}

