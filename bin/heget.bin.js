#!/usr/bin/env node

'use strict';

var util = require('util');
var File = require('../lib/file');
var Heget = require('../index');
var heget;

var SUBLIME_DIR_WINDOWS = '/Users/keermel/SkyDrive/data/Sublime Text 2/';
var SUBLIME_DIR_OSX = '/Users/Hawk/SkyDrive/data/Sublime Text 2/';
var REPORT_DIR_WINDOWS = SUBLIME_DIR_WINDOWS;
var REPORT_DIR_OSX = SUBLIME_DIR_OSX;

try {
  var isWin = !!process.platform.match(/^win/);
  console.log('isWin: ' + isWin);

  var sublimeDirectory = isWin ? SUBLIME_DIR_WINDOWS : SUBLIME_DIR_OSX;
  var reportDirectory = isWin ? REPORT_DIR_WINDOWS : REPORT_DIR_OSX;

  var spec = {
    snippetsDirectory: sublimeDirectory + '/Packages/User',
    reportDirectory: reportDirectory
  }
  heget = Heget.create(spec);
  heget.scan();
}
catch(err) {
  console.log(err.stack);
  process.exit(1);
}

