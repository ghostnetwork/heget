'use strict';

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');
var util = require('util');
var parser = require('xml2js').parseString;

(function() {
  function Heget(spec) {
    var pathToScan = spec.snippetsDirectory;
    this.pathToScan = pathToScan;

    var reportDirectory = spec.reportDirectory;

    this.scan = function() {
      var self = this;
      console.log('scanning ' + this.pathToScan);
      console.log('reportDirectory: ' + reportDirectory);

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
    };
  };

  function verifyPathExists(pathToScan, action) {
    fs.exists(pathToScan, function(exists) {
      if (exists) {
        action();
      } 
      else {
        throw new Error(pathToScan + ' does not exist');
      };
    });
  };

  function scanDirectory(pathToScan, action) {
    fs.readdir(pathToScan, function(error, files) {
      if (error) throw error;
      action(files);
    });
  };

  function filterListOfFilesForSnippets(files, resultHandler) {
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

    resultHandler(files);
  }

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

  Heget.create = function(spec) {
    return new Heget(spec);
  };

  var report = '';
  var reportFile = 'snippets.txt';
  var snippetExtension = '.sublime-snippet';

  module.exports = Heget;
})();


