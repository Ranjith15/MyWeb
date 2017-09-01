var ProfilePage = function() {
	this.userNameLabel = element(by.xpath('//label[contains(., "Username")]'));
	this.userName = element(by.xpath('(//label[contains(., "Username")]/../div)[1]'));
};

module.exports = ProfilePage;