var ApplicationReviewPage = function() {
  this.header = element(by.xpath('//div[@class="header"]/h2'));
  this.submitButton = element(by.xpath('//button[@type="submit"]'));
};

module.exports = ApplicationReviewPage;