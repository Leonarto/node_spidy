const expect = require('chai').expect;

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
  
});