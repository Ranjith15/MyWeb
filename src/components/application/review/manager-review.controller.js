'use strict';

angular.module('edAssistApp').controller('managerReviewController', 
	['$scope', '$stateParams', 'submittedApplication', 'applicationSnapShot', 'storageService', 'applicationService', 'generalContentService', 'contentConstants', 
	function ($scope, $stateParams, submittedApplication, applicationSnapShot, storageService, applicationService, generalContentService, contentConstants) {

	var vm = this;

	vm.applicationSnapShot = applicationSnapShot;
	vm.submittedApplication = submittedApplication;
	vm.applicationId = $stateParams.applicationId;
	vm.status = 'loading';

	generalContentService.findByComponent(contentConstants.component.managerReview, storageService.get('client.clientLoginDetails.clientId'), 'clientDefault', false).then(function (response) {
		vm.content = response.plain();
		vm.reviewContent = _.result(_.find(vm.content, {'name' : 'reviewIntro'}), 'data');
		vm.changeAppStatus = _.result(_.find(vm.content, {'name' : 'chgAppStatus'}), 'data');
		vm.reassignApprovalIntro = _.result(_.find(vm.content, {'name' : 'reassignApprovalIntro'}), 'data');
	});

	applicationService.getTuitionApplication(vm.applicationId).then(function (response) {
		vm.status = 'applicationLoaded';
		vm.application = applicationService.assignParticipantPrefs(response.plain());

		// Get program details
		var programId = _.get(response, 'benefitPeriodID.programID.programID');
		// Load detailed program data. 
		generalContentService.getProgramsData(programId).then(function (res) {
			var programData = _.head(res.plain());
			vm.application.programDescription = _.get(programData, 'programDescription');
		});
	}, function (errorResponse) {
		vm.status = 'error';
	});
}]);