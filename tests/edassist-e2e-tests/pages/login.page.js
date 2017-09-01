var LoginPage = function(){

	this.userName = element(by.id('userName'));
	this.password = element(by.id('loginPassword'));
	this.loginButton = $('button[type="submit"]');

	this.login = function(username, password) {
		this.userName.sendKeys(username);
		this.password.sendKeys(password);
		this.loginButton.click();
	};
};

module.exports = LoginPage;