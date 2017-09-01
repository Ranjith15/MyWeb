'use strict';
var moment = require('moment');

var LoginPage = require('../pages/login.page.js');
var NavBarPage = require('../pages/navbar.page.js');
var ProfilePage = require('../pages/profile.page.js');
var HomePage = require('../pages/home.page.js');
var HistoryPage = require('../pages/history.page.js');
var SupportPage = require('../pages/support.page.js');

var ApplicationContactInfoPage = require('../pages/application/contactInfo.page.js');
var ApplicationEducationInfoPage = require('../pages/application/educationInfo.page.js');
var ApplicationCoursesPage = require('../pages/application/courses.page.js');
var ApplicationAgreementPage = require('../pages/application/agreement.page.js');
var ApplicationReviewPage = require('../pages/application/review.page.js');
var ApplicationSubissionConfirmationPage = require('../pages/application/confirmation.page.js');

describe('TAM 5.0 Smoke Participant Test', function() {
	var PARTICIPANT_USER = browser.params.participant.user;
	var PARTICIPANT_PASSWORD = browser.params.participant.password;

	var loginPage = new LoginPage();
	var navBarPage = new NavBarPage();
	var profilePage = new ProfilePage();
	var homePage = new HomePage();
	var historyPage = new HistoryPage();
	var supportPage = new SupportPage();

	var appContactInfoPage = new ApplicationContactInfoPage();
	var appEducationInfoPage = new ApplicationEducationInfoPage();
	var appCoursesPage = new ApplicationCoursesPage();
	var appAgreementpage = new ApplicationAgreementPage();
	var appReviewPage = new ApplicationReviewPage();
	var appSubmitConfirmationPage = new ApplicationSubissionConfirmationPage();

	beforeAll(function() {
		isAngularSite(true);
		browser.get('/#/login');
	});

	afterAll(function() {
		navBarPage.logOut();
		browser.executeScript('window.sessionStorage.clear();'); 	//clear session if you need
		browser.executeScript('window.localStorage.clear();'); 		//clear cache
	});

	describe('Login to TAM', function() {

		it('User is logged in successfully and lands on Home page', function() {
			loginPage.login(PARTICIPANT_USER, PARTICIPANT_PASSWORD);
			expect(browser.getCurrentUrl()).toContain(homePage.path);
		});

		it('Navigation Pane is displayed with all correct links', function() {
			expect(navBarPage.navBar.isDisplayed()).toBe(true);
			expect(navBarPage.NewApplicationButton.isDisplayed()).toBe(true);
			expect(navBarPage.home.isDisplayed()).toBe(true);
			expect(navBarPage.support.isDisplayed()).toBe(true);
		});
	});

	describe('Verify Home page content', function() {

		it('New Application button is displayed', function() {
			expect(homePage.newApplicationButton.isDisplayed()).toBe(true);
		});

		it('Client Specific documents are displayed', function() {
			expect(homePage.clientDocHeader.isDisplayed()).toBe(true);
			expect(homePage.clientDocuments.count()).toBeGreaterThan(0);
		});

	});

	describe('Click on New Application button', function() {

		beforeAll(function() {
			homePage.newApplicationButton.click();
		});

		it('should open a new application and land on Contact Information page', function() {
			expect(appContactInfoPage.header.getText()).toBe('Contact Information');
		});

		it('should continue to the Education Info page after clicking Continue button', function () {
			appContactInfoPage.continueButton.click();
			expect(appEducationInfoPage.header.getText()).toBe('Education Information');
		});

		it('should continue to the Courses page after choosing the degree information and clicking the Continue button', function () {
			appEducationInfoPage.continueButton.click();
			expect(appCoursesPage.header.getText()).toBe('Courses');
		});

		it('should display Course tax questions', function () {
			appCoursesPage.getImproveSkillCheckbox('N').click();
			appCoursesPage.getMinEducationRequirementsCheckbox('N').click();
			appCoursesPage.getQualifyForNewTradeCheckbox('N').click();
		});

		it('should display an added Course, given that any displayed tax questions are filled out', function () {
			var courseNumber = 'CourseNumber';
			var courseName = 'CourseName';

			appCoursesPage.courseNumberInput.sendKeys(courseNumber);
			appCoursesPage.courseNameInput.sendKeys(courseName);
			appCoursesPage.tuitionAmountInput.sendKeys('0');
			appCoursesPage.creditHoursInput.sendKeys('0');

			appCoursesPage.chooseInstructionType('Classroom');
			appCoursesPage.setCourseExpensesCheckbox('No').click();

			appCoursesPage.addCourseButton.click();

			expect(appCoursesPage.courseList.count()).toBe(1);
			expect(appCoursesPage.getCourseTitle(appCoursesPage.courseList.first())).toBe(courseNumber + ' - ' + courseName);
		});

		it('should continue to the Agreement page after filling out the course duration and clicking the Continue button', function () {
			var dateFormat = 'MM/DD/YYYY';
			var today = moment().format(dateFormat);
			var oneWeekLater = moment().add(7, 'days').format(dateFormat);

			appCoursesPage.courseStart.sendKeys(today);
			appCoursesPage.courseEnd.sendKeys(oneWeekLater);

			appCoursesPage.continueButton.click();
			expect(appAgreementpage.header.getText()).toBe('Agreement');
		});

		it('should display the agreement clauses', function () {
			appAgreementpage.agreeParticipant.click();
			appAgreementpage.agreeFERPA.click();
		});

		it('should continue to the Review Application page after agreeing to all displayed clauses, signing the form,' +
			' and clicking the Continue button', function () {
			appAgreementpage.sign(appAgreementpage.fullName.getText());

			appAgreementpage.continueButton.click();
			expect(appReviewPage.header.getText()).toBe('Review and Submit Your Application');
		});

		it('should successfully submit the application', function () {
			appReviewPage.submitButton.click();
			expect(appSubmitConfirmationPage.successIcon.isDisplayed()).toBe(true);
		});

		it('should return to the Home page after clicking the return button', function () {
			appSubmitConfirmationPage.returnButton.click();
			expect(browser.getCurrentUrl()).toContain(homePage.path);
		});
	});

	describe('Go to Profile page', function() {

		it('Username is displayed on the Profile page', function() {
			browser.actions().mouseMove(navBarPage.nameDropdown).perform();
			navBarPage.profile.click();
			expect(profilePage.userNameLabel.isDisplayed()).toBe(true);
			expect(profilePage.userName.getText()).toBe(PARTICIPANT_USER);
		});
	});

	describe('Go to History page', function() {

		it('Previous applications are displayed', function() {
			navBarPage.history.click();
			expect(historyPage.appHistoryHeader.isDisplayed()).toBe(true);
			expect(historyPage.userApplications.count()).toBeGreaterThan(0);
		});

		it('View All Applications button is displayed', function() {
			expect(historyPage.viewAllApplicationsButton.isDisplayed()).toBe(true);
		});
	});

	describe('Go to Support page', function () {
		beforeAll(function () {
			navBarPage.support.click();
		});

		it('should display the header', function () {
			expect(supportPage.header.isDisplayed()).toBe(true);
		});

		it('should display the benefits section', function () {
		    expect(supportPage.benefitsHeader.isDisplayed()).toBe(true);
				expect(supportPage.policyDocs.count()).toBeGreaterThan(0);
		});

		it('should display the additional questions section', function () {
		    expect(supportPage.additionalQuestionsHeader.isDisplayed()).toBe(true);
		});
	});

});