'use strict';

(function() {
  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  var fs = require('fs');
  
  var File = {
    // Public API
    readContents: function(file) {
      fs.readFile(file, 'utf-8', function(error, data) {
        if (error) throw error;
        var info = {
          file: file,
          data: data
        };
        fireAndForget(emitter, 'readFileContentsDone', info);
      });
    },

    // Plumbing
    on: function(event, action) { emitter.on(event, action); },
  };

  function fireAndForget(emitter, eventName, info) {
    emitter.emit(eventName, info);
    emitter.removeAllListeners();
  };

  module.exports = File;
})();
