const path = require('path');

const urlToFilename = (url) => {
  let cleaned = cleanURL(url);
  return path.resolve(stringToDirPath(cleaned, './webFiles'),'index.html');
};

const cleanURL = (url) => {
  // Splitting by www
  let splitted = url.split('www.');
  if(splitted.length === 1){
    splitted = url.split('//');
  }
  if(splitted.length === 1){
    return splitted[0];
  }
  return splitted[1];
};

const stringToDirPath = (string, folder) => {
  return path.resolve(__dirname,folder,string);
};

module.exports = {
  urlToFilename: urlToFilename,
  cleanURL: cleanURL,
  stringToDirPath: stringToDirPath
};