'use strict';

(function() {
  var EventEmitter = require('events').EventEmitter;
  var fs = require('fs');
  var util = require('util');
  util.inherits(Directory, EventEmitter);

  function Directory(){
    this.exists = function(path, action) {
      fs.exists(path, action);
    };

    this.scan = function(path, action) {
      var self = this;
      fs.readdir(path, function(error, files) {
        if (error) throw error;
        files.forEach(function(name) {
          action(name);
        });
        self.emit('didScan', files);
      });
      return this;
    };
  };

  Directory.create = function() {return new Directory();};
  module.exports = Directory;
})();

/*
'use strict';

(function() {
  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  var fs = require('fs');
  
  var Directory = {
    
    // Public API
    scan: function(path, action) {
      fs.readdir(path, function(error, files) {
        if (error) throw error;
        files.forEach(function(name) {
          action(name);
        });

        emitter.emit('didScan', files);
        emitter.removeAllListeners('didScan');
      });

      return this;
    },

    // Public properties
    get files() {return this._files;},

    // Private properties
    _files: [],

    // Plumbing
    on: function(event, action) { emitter.on(event, action);},
  };

  function privateFunction(argument) {
    return 'did something with ' + argument;
  }

  module.exports = Directory;
})();
*/