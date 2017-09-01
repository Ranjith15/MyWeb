var TestUtils = function() {
  this.chooseSelector = function (selectorId, selectionText) {
    var selector = element(by.id(selectorId));
    selector.click();
    selector.sendKeys(selectionText);
    selector.sendKeys(protractor.Key.ENTER);
  };
};

module.exports = TestUtils;