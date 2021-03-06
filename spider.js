const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if(err) {
      return callback(err);
    }
    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if(err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if(err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
}

function spider(url, nesting, callback) {
  const filename = utilities.urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, body) => {
    if(err) {
      if(err.code !== 'ENOENT') {
        return callback(err);
      }
      return download(url, filename, (err, body) => {
        if(err) {
          return callback(err);
        }
        spiderLinks(url, body, nesting, callback);
      });
    }
    spiderLinks(url, body, nesting, callback);
  });
}

function spiderLinks(currentUrl, body, nesting, callback) {
  if(nesting === 0) {
    return process.nextTick(callback);
  }
  const links = utilities.getPageLinks(currentUrl, body);
  function iterate(index) {
    if(index === links.length) {
      return callback();
    }
    spider(links[index], nesting - 1, err => {
      if(err) {
        return callback(err);
      }
      iterate(index + 1);
    });
  }
  iterate(0);
}

function spiderCaller(url, nesting, callback){
  spider(url, nesting, callback);
}

module.exports = {
  spider: spiderCaller,
  saveFile: saveFile,
  download: download
};