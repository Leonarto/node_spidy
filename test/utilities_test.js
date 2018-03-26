const expect = require('chai').expect;
const fs = require('fs');

describe('Utilities', () => {
  
  describe('Clean URL', () => {
    const {cleanURL} = require('../utilities');
    let filename1 = cleanURL('http://www.skillednetworks.cl/home');
    let filename2 = cleanURL('http://skillednetworks.cl/home');
    let filename3 = cleanURL('https://skillednetworks.cl/home');
    let filename4 = cleanURL('skillednetworks.cl/home');
    
    it('cleanURL should be a function', () => {
      expect(cleanURL).to.be.a('function');
    });
    
    it('Should return a string', () => {
      expect(filename1).to.be.a('string');
    });
    
    it('Should not be an empty string', () => {
      expect(filename1).to.not.equal('');
    });
    
    it('Should remove from "www." and back', () => {
      let condition1 = filename1.indexOf('http') === -1;
      let condition2 = filename1.indexOf('www.') === -1;
      
      expect(condition1).to.be.true;
      expect(condition2).to.be.true;
    });
    
    it('Should leave from domain name and ahead', () => {
      expect(filename1).to.equal('skillednetworks.cl/home');
      expect(filename2).to.equal('skillednetworks.cl/home');
      expect(filename3).to.equal('skillednetworks.cl/home');
      expect(filename4).to.equal('skillednetworks.cl/home');
    });
  });
  
  describe('String to Dir Path', () => {
    const {stringToDirPath} = require('../utilities');
    let filename1 = stringToDirPath('http://www.skillednetworks.cl/home', 'webFiles');
    
    it('stringToDirPath should be a function', () => {
      expect(stringToDirPath).to.be.a('function');
    });
    it('Should return a string', () => {
      expect(filename1).to.be.a('string');
    });
    it('Should not be an empty string', () => {
      expect(filename1).to.not.equal('');
    });
  });
  
  describe('URL to filename', () => {
    const {urlToFilename} = require('../utilities');
    let filename1 = urlToFilename('http://www.skillednetworks.cl/home');
    
    it('urlToFilename should be a function', () => {
      expect(urlToFilename).to.be.a('function');
    });
    it('Should return a string', () => {
      expect(filename1).to.be.a('string');
    });
    it('Should not be an empty string', () => {
      expect(filename1).to.not.equal('');
    });
    it('Should contain index.html', () => {
      expect(filename1.indexOf('index.html') !== -1).to.be.true;
    });
  });
  
  describe('Get page string links', () => {
    const {getPageLinks} = require('../utilities');
    let subLinksArr = getPageLinks('http://www.zirotti.cl/', fs.readFileSync('./webFiles/zirotti.cl/index.html',"utf8"));
    let simpleSubLinkArr = getPageLinks('http://www.somepage.cl/', `
        <h1>Alguna página</h1>
        <p>con un link</p>
        <a href="https://www.google.cl">este link</a>
      `);
    let nonLinkBack = getPageLinks('http://www.somepage.cl/', `<h1>Hola</h1><p>Walala</p>`);
    let linkInsideSamePage = getPageLinks('http://www.somepage.cl/', `<h1>Hola</h1><p>Walala</p><a href="home">Home</a><a href="contact">Contact</a>`);
    
    it('stringToDirPath should be a function', () => {
      expect(getPageLinks).to.be.a('function');
    });
    it('Should return an array', () => {
      expect(subLinksArr).to.be.an('array');
      expect(nonLinkBack).to.be.an('array');
      expect(simpleSubLinkArr).to.be.an('array');
    });
    it('Should return an array with one link with this specific page', () => {
      expect(simpleSubLinkArr[0]).to.equal('https://www.google.cl');
    });
    it('Should return full page path from links of the same page', () => {
      expect(linkInsideSamePage[0]).to.equal('http://www.somepage.cl/home');
      expect(linkInsideSamePage[1]).to.equal('http://www.somepage.cl/contact');
    });
  });
  
});