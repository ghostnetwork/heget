'use strict';

var fs = require('fs');
var parser = require('xml2js').parseString;
var path = require('path');
var Q = require('q');
var util = require('util');

(function() {
  function Heget(spec) {
    var pathToScan = spec.snippetsDirectory;
    this.pathToScan = pathToScan;

    var reportDirectory = spec.reportDirectory;

    this.scan = function() {
      var self = this;
      // console.log('scanning ' + this.pathToScan);
      // console.log('reportDirectory: ' + reportDirectory);

      var result = Q.fcall(verifyPathExists(pathToScan));/*
        .then(function(exists) {
          console.log('exists: ' + exists);
        });*/
      console.log('result: ' + util.inspect(result));
      result.then(function(exists) {
        console.log('exists: ' + exists);
      });
      /*
      verifyPathExists(pathToScan, function() {
        scanDirectory(pathToScan, function(files) {
          filterListOfFilesForSnippets(files, function(result) {
            processFiles(pathToScan, result, function() {
              writeReport(reportDirectory, function() {
                console.log('done');
              });
            });
          });
        });
      });
      */
    };
  };

  function verifyPathExists(pathToScan) {
    var deferred = Q.defer();

    fs.exists(pathToScan, function(exists) {
      deferred.resolve(exists);
    });l

    return deferred.promise;
  };

  function scanDirectory(pathToScan) {
    fs.readdir(pathToScan, function(error, files) {
      var deferred = Q.defer();
      if (error) throw error;
      deferred.resolve(files);
      return deferred;
    });
  };

  function filterListOfFilesForSnippets(files) {
    var toBeRemoved = [];

    files.forEach(function(name) {
      var extension = path.extname(name);
      if (extension !== snippetExtension)
        toBeRemoved.push(name);
    });

    var result = [];
    for (var i = 0; i < toBeRemoved.length; i++) {
      var index = files.indexOf(toBeRemoved[i]);
      if (index >= 0) {
        files.splice(index, 1);
      }
    };

    return files;
  }

  /*
  function processFiles(folder, files, action) {
    var numFiles = files.length - 1;
    var counter = 0;

    files.forEach(function(name) {
      var filePath = folder + '/' + name;

      readContentsOfFile(filePath, function(file, data) {
        processFileContent(file, data);

        if (counter >= numFiles) {
          action();
        };

        counter++;
      });
    });
  };

  function readContentsOfFile(file, action) {
    fs.readFile(file, 'utf-8', function(error, data) {
      if (error) throw error;
      action(file, data);
      return;
    });
  };

  function processFileContent(file, xmlData) {
    parser(xmlData, function(error, snippet) {
      if (error) throw error;
      var filename = path.basename(file);
      addToReport(filename, snippet);
    });
  };

  function addToReport(file, data) {
    var snippet = data.snippet;
    var result = file + '\n';
    result = result + '  ';
    
    var snippetInfo = snippet.tabTrigger + ': ' + snippet.description;
    result = result + snippetInfo + '\n\n';

    report = report + result;
  };

  function writeReport(reportDirectory, action) {
    var reportPath = reportDirectory + reportFile;
    fs.writeFile(reportPath, report, 'utf-8', function(error) {
      if (error) throw error;
      action();
    });
  }
  */

  Heget.create = function(spec) {
    return new Heget(spec);
  };

  var report = '';
  var reportFile = 'snippets.txt';
  var snippetExtension = '.sublime-snippet';

  module.exports = Heget;
})();


