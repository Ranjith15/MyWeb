var ApplicationAgreementPage = function() {
  this.header = element(by.xpath('//div[@class="header"]/h2'));
  this.continueButton = element(by.xpath('//button[@type="submit"]'));
  this.fullName = element(by.xpath('//span[contains(., "Your Name:")]/strong'));

  this.agreeParticipant = element(by.xpath('//input[@type="checkbox" and @name="agreementCheck1"]/..'));
  this.agreeFERPA = element(by.xpath('//input[@type="checkbox" and @name="agreementCheck2"]/..'));

  this.sign = function(fullName) {
    element(by.id('signature')).sendKeys(fullName);
  };
};

module.exports = ApplicationAgreementPage;