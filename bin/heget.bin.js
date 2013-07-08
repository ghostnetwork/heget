#!/usr/bin/env node

'use strict';

var Heget = require('../index');
var heget;

try {
  heget = Heget.create('/Users/keermel/SkyDrive/data/Sublime Text 2/Packages/User');
  heget.scan();
}
catch(err) {
  console.log(err.stack);
  process.exit(1);
}

