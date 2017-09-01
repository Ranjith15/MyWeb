'use strict';

angular.module('edAssistApp').controller('submissionConfirmationController', ['$scope', '$stateParams', 'generalContentService', 'storageService', 'contentConstants', function ($scope, $stateParams, generalContentService, storageService, contentConstants) {

	var vm = this;
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	vm.participantId = storageService.get('user.userDetails.participantId');

	vm.submissionResponse = $stateParams.applicationStatus;
	var programId = $stateParams.programId;
	vm.applicationStatus = vm.submissionResponse.applicationStatus.applicationStatus;
	vm.applicationNumber = vm.submissionResponse.applicationNumber;
	vm.applicationStatusId = vm.submissionResponse.applicationStatus.applicationStatusID;

	vm.submittedSuccesfully = function () {
		if (vm.applicationStatusId === 100 || vm.applicationStatusId === 120 || vm.applicationStatusId === 125) {
			return true;
		} else {
			return false;
		}
	};
	
	generalContentService.findByName(contentConstants.component.applicationStatus, _.toString(vm.applicationStatusId), clientId, programId).then(function (response) {
		vm.submittedText = _.first(response);
	});
}]);