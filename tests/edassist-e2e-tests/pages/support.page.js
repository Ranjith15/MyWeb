var SupportPage = function() {

	this.header = element(by.xpath('//h1[contains(., "Support")]'));

	this.benefitsHeader = element(by.xpath('//h2[contains(., "Using Your Tuition Benefits")]'));
	this.policyDocs = element.all(by.repeater('supportCtrl.policyDocuments'));

	this.additionalQuestionsHeader = element(by.xpath('//h2[contains(., "Additional Questions")]'));
};

module.exports = SupportPage;