var ApplicationContactInfoPage = function() {
  this.header = element(by.xpath('//div[@class="header"]/h2'));
  this.continueButton = element(by.xpath('//button[@type="submit"]'));
};

module.exports = ApplicationContactInfoPage;