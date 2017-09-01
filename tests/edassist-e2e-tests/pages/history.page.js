var HistoryPage = function() {

	this.appHistoryHeader = element(by.xpath('//h2[contains(., "Your Application History")]'));
	this.userApplications = element.all(by.repeater('participantApplicationHistoryCtrl.applications'));
	this.viewAllApplicationsButton = this.appHistoryHeader.element(by.xpath('../..')).element(by.linkText('View All'));
};

module.exports = HistoryPage;