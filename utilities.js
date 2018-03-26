const path = require('path');

function urlToFilename(url){
  let cleaned = cleanURL(url);
  return path.resolve(stringToDirPath(cleaned, './webFiles'),'index.html');
}

function cleanURL(url){
  // Splitting by www
  let splitted = url.split('www.');
  if(splitted.length === 1){
    splitted = url.split('//');
  }
  if(splitted.length === 1){
    return splitted[0];
  }
  return splitted[1];
}

function stringToDirPath(string, folder){
  return path.resolve(__dirname,folder,string);
}


function getPageLinks(url, body){
  let linksArray = body.match(/(href="|href=').*?("|')/g);
  if(linksArray === null) return [];
  return linksArray.map((link) => {
    let cleanedLink = link.replace(/(href="|href='|"|')/g, '');
    if(cleanedLink.indexOf('http') === -1 && cleanedLink.indexOf('www') === -1){
      return getDomainIndexPath(url)+cleanedLink;
    }
    return cleanedLink;
  });
}

function getDomainIndexPath(url){
  //TODO: make it to give domain first index path
  return url;
}

module.exports = {
  urlToFilename: urlToFilename,
  cleanURL: cleanURL,
  stringToDirPath: stringToDirPath,
  getPageLinks: getPageLinks,
};