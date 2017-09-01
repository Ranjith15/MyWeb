'use strict';

angular.module('edAssistApp').controller('supportController', ['$scope', '$sce', 'vhdService', 'generalContentService', 'storageService', 'contentConstants', function ($scope, $sce, vhdService, generalContentService, storageService, contentConstants) {

	var vm = this;
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	var participantId = storageService.get('user.userDetails.participantId');
	
	vm.supportTicketHistory = [];
	vm.status = 'submitting';
	vm.contactUsStatus = 'submitting';
	vm.historyStatus = 'loading';
	vm.isVhdEnabled = storageService.get('client.clientLoginDetails.crmIntegration');
	
	generalContentService.getEligiblePolicyDocuments(clientId, participantId).then(function (documentResponse) {
		vm.status = 'success';
		vm.policyDocuments = documentResponse;
	}, function (errorResponse) {
		vm.status = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	});

	generalContentService.findByName(contentConstants.component.contactUs, contentConstants.name.contactUs, clientId, '', false).then(function (response) {
		vm.contactUsStatus = 'success';
		if (!_.isEmpty(response)) {
			vm.contactUsContent = $sce.trustAsHtml(_.result(_.find(response, {'name': contentConstants.name.contactUs}), 'data'));
		}
	}, function (errorResponse) {
		vm.contactUsStatus = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	});

	vm.loadSupportTickets = function () {
		vm.historyStatus = 'loading';
		vhdService.getParticipantSupportTicketHistory().then(function (response) {
			vm.historyStatus = 'success';
			vm.supportTicketHistory = response;
		}, function (errorResponse) {
			vm.historyStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	vm.loadSupportTickets();

	vm.ticketSearchClick = function(ticketSearchData) {
		var clientId = storageService.get('client.clientLoginDetails.clientId');
		vm.historyStatus = 'loading';
		vhdService.searchTickets(ticketSearchData.ticketNumber, null, ticketSearchData.id, null, ticketSearchData.statusId, ticketSearchData.createdFrom, ticketSearchData.createdTo, ticketSearchData.firstName, ticketSearchData.lastName, clientId).then(function(response){
			vm.historyStatus = 'success';
			vm.supportTicketHistory = response;
		}, function (errorResponse) {
			vm.historyStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	vm.clearTicketSearch = function() {
		vm.loadSupportTickets();
	};
}]);