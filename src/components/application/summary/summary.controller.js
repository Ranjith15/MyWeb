'use strict';

angular.module('edAssistApp').controller('summaryController',
	['$q', '$scope', '$state', '$stateParams', 'storageService', 'participantService', 'applicationService', 'utilService', 'submittedApplication', 'applicationSnapShot', 'constants', 'contentConstants', 'generalContentService',
	function ($q, $scope, $state, $stateParams, storageService, participantService, applicationService, utilService, submittedApplication, applicationSnapShot, constants, contentConstants, generalContentService) {

	var vm = this;
	var clientId = storageService.get('client.clientLoginDetails.clientId');

	$scope.updateApplicationScope('status', 'loading');

	vm.userDetails = storageService.get('user.userDetails');
	vm.applicationId = $stateParams.applicationId;
	vm.submittedApplication = submittedApplication;
	vm.applicationSnapShot = applicationSnapShot;
	vm.preferredAddress = utilService.getPreferredAddress(submittedApplication.participant, submittedApplication.participant.preferredAddress);
	vm.preferredPhone = utilService.getPreferredPhone(submittedApplication.participant);
	vm.preferredEmail = utilService.getPreferredEmail(submittedApplication.participant);
	
	var stepViewData = {
		stepNumber: 5,
		stepHeader: 'APPLICATION.SUMMARY.HEADER',
		submitButtonName: 'APPLICATION.SUMMARY.SUBMIT_APPLICATION',
		applicationId: $stateParams.applicationId
	};

	$scope.updateApplicationScope('stepViewData', stepViewData);

	generalContentService.findByName(contentConstants.component.reviewAndSubmit, contentConstants.name.intro, clientId, contentConstants.program.clientDefault, false).then(function (response) {
		vm.intro = _.get(response, '[0].data');
	});

	applicationService.getTuitionApplication(vm.applicationId).then(function (response) {
		vm.application = applicationService.assignParticipantPrefs(response.plain());
		vm.participantId = vm.application.participantID.participantId;
		$scope.updateApplicationScope('status', 'applicationLoaded');
		$scope.updateApplicationScope('application', response);

		// Get program details
		var programId = _.get(response, 'benefitPeriodID.programID.programID');

		if (programId) {
			// Load detailed program data. 
			var programsDataPromise = generalContentService.getProgramsData(programId).then(function (res) {
				var programData = _.head(res.plain());
				response.programDescription = _.get(programData, 'programDescription');
			});
			$scope.handleSaveOrLoadStatus([programsDataPromise]);
		}
	}, function (errorResponse) {
		$scope.updateApplicationScope('status', 'error');
		$scope.updateApplicationScope('errorMessage', _.get(errorResponse, 'data.message'));
	});

	var submitApplication = function () {
		$scope.updateApplicationScope('status', 'loading');
		applicationService.submitApplication(vm.applicationId).then(function (response) {
			response.rules = applicationService.filterParticipantRules(response.rules);
			$state.go(constants.routes.submissionConfirmation, {programId: vm.application.benefitPeriodID.programID.programID, applicationStatus: response});
		}, function (errorResponse) {
			$scope.updateApplicationScope('status', 'errorIncompleteApplication');
			var incompleteStatus = _.get(errorResponse, 'data.message');
			if (incompleteStatus === 'INCOMPLETE_APPLICATION_AGREEMENTS') {
				$scope.updateApplicationScope('statusIncompleteSection', 'errorIncompleteApplicationAgreements');
			}
			if (incompleteStatus === 'INCOMPLETE_APPLICATION_COURSES') {
				$scope.updateApplicationScope('statusIncompleteSection', 'errorIncompleteApplicationCourses');
			}
		});
	};

	$scope.updateApplicationScope('submitChildForm', submitApplication);

	vm.isCurrentParticipantApplication = function () {
		if (vm.application) {
			if (vm.participantId === vm.userDetails.participantId) {
				return true;
			}
		}
		return false;
	};
}]);