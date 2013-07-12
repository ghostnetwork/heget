'use strict';

(function() {
  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  var util = require('util');
  var File = require('./file');
  
  var Settings = {
    
    // Public API
    loadSettingsForPlatform: function() {

      loadSettings(this.settingsPath, function(settingsObject) {
        chooseSettingsForPlatform(settingsObject, function(settings) {
          emitter.emit('loadSettingsForPlatformDone', settings);
        });
      });
    },

    // Public properties
    settingsPath: 'bin/settings.json',

    // Plumbing
    on: function(event, action) { emitter.on(event, action); },
  };

  function loadSettings(settingsPath, action) {
    File.on('readFileContentsDone', function(settingsObject) {
      var settings = convertFromJsonToObject(settingsObject.data);
      action(settings);
    });
    File.readContents(settingsPath);
  };

  function convertFromJsonToObject(json) {
    return JSON.parse(json);
  }

  function chooseSettingsForPlatform(settingsObject, action) {
    // var isWin = !!process.platform.match(/^win/);
    // var settings = isWin ? settingsObject.platform.windows : settingsObject.platform.osx;
    var platform = process.platform;
    console.log('process.platform: ' + platform);

    var settings = settingsObject.platform.osx

    switch(platform) {
      case "win32": settings = settingsObject.platform.windows; break;
      case "linux": settings = settingsObject.platform.linux; break;
      case "darwin": settings = settingsObject.platform.osx; break;
      default: break;
    }

    action(settings);
  };

  module.exports = Settings;
})();
