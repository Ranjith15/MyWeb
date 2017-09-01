'use strict';
describe('TAM 5.0 Smoke Manager Test', function () {
  var SUPERVISOR_USER = browser.params.supervisor.user;

  var LoginPage = require('../pages/login.page.js');
  var NavBarPage = require('../pages/navbar.page.js');
  var ProfilePage = require('../pages/profile.page.js');
  var HomePage = require('../pages/home.page.js');

  var loginPage = new LoginPage();
  var navBarPage = new NavBarPage();
  var profilePage = new ProfilePage();
  var homePage = new HomePage();

  beforeAll(function () {
    isAngularSite(true);
    browser.get('/#/login');

    loginPage.login(SUPERVISOR_USER, browser.params.supervisor.password);
  });

  afterAll(function () {
    navBarPage.logOut();
    browser.executeScript('window.sessionStorage.clear();'); 	//clear session if you need
    browser.executeScript('window.localStorage.clear();'); 		//clear cache
  });

  describe('Go to Profile page', function () {
    beforeAll(function(){
      browser.actions().mouseMove(navBarPage.nameDropdown).perform();
      navBarPage.profile.click();
    });

    it('Username is displayed on the Profile page', function () {
      expect(profilePage.userNameLabel.isDisplayed()).toBe(true);
      expect(profilePage.userName.getText()).toBe(SUPERVISOR_USER);
    });
  });

   describe('Verify Home page content' ,function () {
    beforeAll(function (){
      navBarPage.home.click();
    });

    it('Team Activity should be displayed', function (){
      expect(homePage.teamActivityHeader.getText()).toBe('Your Team Application Activity');
      expect(homePage.participantApps.count()).toBeGreaterThan(0);
    });
  });
});
