'use strict';

angular.module('edAssistApp').controller('contactInformationController',
	['$scope', '$state', '$stateParams', 'constants', 'contentConstants', 'participantService', 'storageService', 'generalContentService',
	function ($scope, $state, $stateParams, constants, contentConstants, participantService, storageService, generalContentService) {

	var vm = this;
	vm.status = 'submitting';
	vm.userDetails = storageService.get('user.userDetails');
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	var applicationId = $stateParams.applicationId;
	var participantId = $stateParams.participantId;

	var stepViewData = {
		stepNumber: 1,
		formName: 'contactInfoForm',
		stepHeader: 'APPLICATION.CONTACT_INFORMATION.HEADER',
		submitButtonName: 'GENERAL.CONTINUE',
		applicationId: $stateParams.applicationId,
		participantId: $stateParams.participantId
	};
	$scope.updateApplicationScope('stepViewData', stepViewData);

	generalContentService.findByName(contentConstants.component.applicationStep1, contentConstants.name.step1Intro, clientId, contentConstants.program.clientDefault, false).then(function (response) {
		vm.step1Intro =  _.get(response.plain(), '[0].data');
	});

	var submitContactForm = function (form) {
		if (form.$valid) {
			$scope.updateApplicationScope('status', 'submitting');
			vm.profileData.put().then(function (response) {
				vm.profileData = response;
				form.$setPristine();
				if (applicationId) {
					$state.go(constants.routes.educationInformation, {applicationId: applicationId, participantId: participantId});
				} else {
					$state.go(constants.routes.educationInformation, {participantId: participantId});
				}
			}, function (errorResponse) {
				$scope.updateApplicationScope('status', 'error');
				$scope.updateApplicationScope('errorMessage', _.get(errorResponse, 'data.message'));
			});
		}
	};
	// the form tag is in the parent scope (application). We need to attach the sunmit function to the parent scope to be called.
	$scope.updateApplicationScope('submitChildForm', submitContactForm);

	$scope.updateApplicationScope('status', 'loading');
	var participantPromise = participantService.getParticipant(participantId).then(function (response) {
		vm.profileData = response;
	});
	$scope.handleSaveOrLoadStatus([participantPromise]);

}]);
