const { spider } = require('./spider');

const url1 = 'http://www.skillednetworks.cl';
const url2 = 'https://en.wikipedia.org/wiki/Web_crawler';

// Does not work Properly
const url3 = 'http://www.idmodels.com';
// Does not work Properly
const url4 = 'http://leon.cl/';

const url5 = 'http://www.zirotti.cl/';

const urls = [
    url1,
    url2,
    url3,
    url4,
    url5
];

for(let url of urls) {
  spider(url, 1,() => {
    console.log(url, 'spidered!!');
  });
}