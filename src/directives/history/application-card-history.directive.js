'use strict';

angular.module('edAssistApp').directive('applicationHistory', ['applicationStatuses', '$state', 'constants', 'storageService', 'utilService', function (applicationStatuses, $state, constants, storageService, utilService) {
	return {
		restrict: 'EA',
		scope: {
			app: '='
		},
		templateUrl: 'src/directives/history/templates/application-card.template.html',
		controllerAs: 'applicationCardCtrl',
		controller: function ($scope) {
			var vm = this;
			var statuses = applicationStatuses.mappings;
			var participantId = storageService.get('user.userDetails.participantId');
			var isSupervisor = utilService.isSupervisor();
			vm.viewMore = true;

			function getStatus(statusCode) {
				var status = statuses[statusCode];
				if (!status) {
					status = statuses['default'];
				}
				return status;
			}

			function fullAppEnabled(app) {
				if (isSupervisor && app.applicationStatus.applicationStatusID === constants.applicationStatus.forwardedToSupervisor && participantId !== app.participantId) {
					app.isFullAppEnabled = false;
				} else {
					app.isFullAppEnabled = true;
				}
				return app;
			}

			vm.app = fullAppEnabled($scope.app);
			vm.status = getStatus(vm.app.applicationStatus.applicationStatusID);
			vm.appView = $scope.view;

			vm.loadMoreDetails = function() {
				vm.viewMore = !vm.viewMore;
			};

			vm.navigateToFullApp = function () {
				if (!vm.app.isFullAppEnabled) {
					$state.go(constants.routes.managerReview, {applicationId: vm.app.applicationID});
				} else if (vm.app.applicationStatus.applicationStatusID === constants.applicationStatus.saved) {
					$state.go(constants.routes.summary, {applicationId: vm.app.applicationID});
				} else {
					$state.go(constants.routes.submittedApplication, {applicationId: vm.app.applicationID});
				}
			};
		}
	};
}]);