'use strict';

angular.module('edAssistApp').directive('participantActionBlock', 
	['storageService', 'applicationStatuses', 
	function (storageService, applicationStatuses) {

	var participantActionBlockCtrl = ['$scope', '$state', 'utilService', 'constants', function ($scope, $state, utilService, constants) {
		var vm = this;
		vm.constants = constants;
		vm.statuses = applicationStatuses.mappings;
		vm.isVhdEnabled = storageService.get('client.clientLoginDetails.crmIntegration');

		vm.getApplicationStatus = function(statusCode) {
			return  utilService.getAppStatus(statusCode);
		};

		vm.appClicked = function (application, participantId) {
			if (application.applicationStatus.applicationStatusID === constants.applicationStatus.forwardedToSupervisor) {
				$state.go(constants.routes.managerReview, {applicationId: application.applicationID});
			} else if (application.applicationStatus.applicationStatusID === constants.applicationStatus.saved) {
				$state.go(constants.routes.summary, {applicationId: application.applicationID});
			} else {
				$state.go(constants.routes.submittedApplication, {applicationId: application.applicationID});
			}
		};

		vm.participantApplicationHistory = function (participantId) {
			$state.go(constants.routes.history, {participantId: participantId, fromClientAdmin: true});
		};
	}];

	var participantActionBlockDirective = {
		restrict: 'EA',
		replace: true,
		scope: {
			participant: '=',
			onTicketClick: '&'
		},
		templateUrl: 'src/directives/client-admin/templates/participant-action-block.template.html',
		controllerAs: 'participantActionBlockCtrl',
		controller: participantActionBlockCtrl
	};

	return participantActionBlockDirective;
}]);