'use strict';

(function() {
  var fs = require('fs');

  function Foo(){
    this.scan = function(path, action) {
      fs.readdir(path, function(error, files) {
        if (error) throw error;
        files.forEach(function(name) {
          action(name);
        });
      });
      return this;
    }
  };
  Foo.create = function() {return new Foo();};
  module.exports = Foo;
})();