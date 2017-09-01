var NavBarPage = function() {
	var dropdown = $('.dropdown-menu');

	this.navBar = element(by.id('edassist-navbar'));
	this.NewApplicationButton = element(by.linkText('New Application'));
	this.home = $('a[href="#/home"]');
	this.history = $('a[ui-sref="history"]');
	this.academicResources = $('a[ui-sref="academicResources"]');
	this.support = $('a[ui-sref="support"]');
	this.user = element(by.binding('global.userData.firstName'));
	this.nameDropdown = $('.dropdown-toggle');
	this.profile = dropdown.$('a[ui-sref="profile"]');
	this.logout = dropdown.$('a[ng-click="global.logOut()"]');

	this.logOut = function (){
		browser.actions().mouseMove(this.nameDropdown).perform();
		this.logout.click();
	};
};

module.exports = NavBarPage;