var Utils = require('../../utils/utils.js');

var ApplicationEducationInfoPage = function() {
  var utils = new Utils();

  this.header = element(by.xpath('//div[@class="header"]/h2'));
  this.continueButton = element(by.xpath('//button[@type="submit"]'));

  this.chooseEducationProgram = function (selectionText) {
    utils.chooseSelector('degreeObjective', selectionText);
  };

  this.chooseFieldOfStudy = function (selectionText){
    utils.chooseSelector('fieldOfStudy', selectionText);
  };
};

module.exports = ApplicationEducationInfoPage;