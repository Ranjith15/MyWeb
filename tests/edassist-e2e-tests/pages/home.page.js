var HomePage = function() {
	this.path = '/home';

	this.newApplicationButton = element(by.binding('HOME.APPLICATION.NEW_APPLICATION'));
	this.clientDocHeader = element(by.xpath('//h3[contains(., "Using Your Tuition Benefits")]'));
	this.clientDocuments = element.all(by.repeater('homeCtrl.policyDocuments'));
	this.teamActivityHeader = element(by.xpath('//h3[contains(.,"Your Team Application Activity")]'));
	this.participantApps = element.all(by.repeater('teamApplicationCtrl.applications'));
};

module.exports = HomePage;