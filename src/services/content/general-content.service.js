'use strict';

angular.module('edAssistApp').factory('generalContentService', ['$sce', 'Restangular', 'participantService', function ($sce, Restangular, participantService) {

	var generalContentService = {
		api: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
		}).service('content'),

		findByComponent: function (component, client, program, textOnly, signedDate) {
			return generalContentService.api.one('general').one('components').getList(component, {client: client, program: program, textOnly: textOnly, signedDate: signedDate});
		},
		getAgreements: function (component, client, program, textOnly, signedDate) {
			var agreementObject = {};
			var _this = this;
			return this.findByComponent(component, client, 'clientDefault', textOnly, signedDate).then(function (response) {
				var agreementProgramContent;
				var allContent = response;
				return _this.findByComponent(component, client, program, textOnly, signedDate).then(function(programResponse) {
					agreementProgramContent = programResponse;
					_.forEach(agreementProgramContent, function (value) {
						var index = _.findIndex(allContent, function (content) {
							return content.name === value.name;
						});
						if (index >= 0) {
							allContent.splice(index, 1);
							allContent.push(value);
						} else {
							allContent.push(value);
						}
					});
					var agreementContent = [];
					var agreementTitle1 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement1Title'}), 'data'));
					var agreementText1 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement1Text'}), 'data'));
					var agreementVerification1 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement1Verification'}), 'data'));
					if (agreementTitle1) {
						agreementContent.push({'title': agreementTitle1, 'text': agreementText1, 'verification': agreementVerification1, 'name': 'agreementCheck1'});
					}
					var agreementTitle2 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement2Title'}), 'data'));
					var agreementText2 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement2Text'}), 'data'));
					var agreementVerification2 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement2Verification'}), 'data'));
					if (agreementTitle2) {
						agreementContent.push({'title': agreementTitle2, 'text': agreementText2, 'verification': agreementVerification2, 'name': 'agreementCheck2'});
					}
					var agreementTitle3 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement3Title'}), 'data'));
					var agreementText3 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement3Text'}), 'data'));
					var agreementVerification3 = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreement3Verification'}), 'data'));
					if (agreementTitle3) {
						agreementContent.push({'title': agreementTitle3, 'text': agreementText3, 'verification': agreementVerification3, 'name': 'agreementCheck3'});
					}
					agreementObject.step4Intro = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'step4Intro'}), 'data'));
					agreementObject.applGrantsScholars = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'applGrantsScholars'}), 'data'));
					agreementObject.agreementSignIntstruction = $sce.trustAsHtml(_.result(_.find(allContent, {'name': 'agreementSignatureInstr'}), 'data'));
					agreementObject.agreementsList = agreementContent;
					return agreementObject;
				});
			});
		},
		findByName: function (component, name, client, program, textOnly, cascade) {
			return generalContentService.api.one('general').one('components').one(component).one('names').one(name).get({client: client, program: program, textOnly: textOnly, cascade: cascade});
		},
		getLoginContent: function (client) {
			return generalContentService.api.one('general').one('login').one(client).get();
		},
		findByClient: function(client) {
			return generalContentService.api.one('general').get({client: client});
		},
		getEligiblePolicyDocuments: function (clientId, participantId) {
			return participantService.getParticipantEligibility(participantId).then(function (programResponse) {
				var programs = programResponse.programs.map(function (elem) {
					return elem.programID;
				}).join(',');
				programs += ',clientDefault';
				return generalContentService.findByName('clientDocuments', 'programResources', clientId, programs);
			}, function (errorResponse) {
				return generalContentService.findByName('clientDocuments', 'programResources', clientId, 'clientDefault');
			});
		},
		getProgramsData: function (programIds) {
			return generalContentService.api.one('general').one('search').getList('program-details', {commaSeparatedProgramIds: programIds});
		},
		getProviderDocs: function (providerId) {
			return generalContentService.api.one().getList('provider-documents', { educationalProviderId : providerId });
		},
		updateContent: function (content) {
			return generalContentService.api.one('general').one(content.id).customPUT(content);
		},
		addContent: function (content) {
			if (!content.program) {
				content.program = '';
			}
			return generalContentService.api.one('general').customPOST(content);
		},
		deleteContent: function (id) {
			return generalContentService.api.one('general').one(id).remove();
		}
	};
	return generalContentService;
}]);