var Utils = require('../../utils/utils.js');

var ApplicationCoursesPage = function () {
  var utils = new Utils();

  this.header = element(by.xpath('//div[@class="header"]/h2'));
  this.continueButton = element(by.xpath('//button[@type="submit"]'));

  this.courseStart = element(by.id('courseStartDate'));
  this.courseEnd = element(by.id('courseEndDate'));

  this.courseNumberInput = element(by.id('courseNumber'));
  this.courseNameInput = element(by.id('courseName'));
  this.tuitionAmountInput = element(by.id('tuitionAmount'));
  this.creditHoursInput = element(by.id('creditHours'));

  this.courseList = element.all(by.repeater('coursesCtrl.coursesAndCourseRelatedExpenses'));

  this.addCourseButton = element(by.xpath('//div[@class="panel-body"]//a[contains(., "Add Course")]'));

  function getCheckbox(yesNoValue, index) {
    var radioInputXpath = '//input[@type="radio" and @value="' + yesNoValue + '"])';
    return element(by.xpath('(//div[@class="panel-body"]' + radioInputXpath + '[' + index + ']/..'));
  }

  this.chooseInstructionType = function (selectionText) {
    utils.chooseSelector('instructionType', selectionText);
  };

  this.getImproveSkillCheckbox = function (yesNoValue) {
    return getCheckbox(yesNoValue, 1);
  };

  this.getMinEducationRequirementsCheckbox = function (yesNoValue) {
    return getCheckbox(yesNoValue, 2);
  };

  this.getQualifyForNewTradeCheckbox = function (yesNoValue) {
    return getCheckbox(yesNoValue, 3);
  };

  this.setCourseExpensesCheckbox = function (yesNoValue) {
    return element(by.xpath('(//div[@class="panel-body"]//input[@type="radio" and @value="' + yesNoValue + '"])/..'));
  };

  this.getCourseTitle = function (course) {
    return course.element(by.tagName('h4')).getText();
  };

};

module.exports = ApplicationCoursesPage;