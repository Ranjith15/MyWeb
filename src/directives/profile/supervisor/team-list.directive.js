'use strict';

angular.module('edAssistApp').directive('teamList', ['adminService', 'storageService', function (adminService, storageService) {

	return {
		restrict: 'EA',
		scope: {
			participantId : '='
		},
		templateUrl: 'src/directives/profile/supervisor/team-list.html',
		controllerAs: 'teamListCtrl',
		controller: function ($scope, $element, $attrs) {
			var vm = this;
			vm.supervisedParticipantStatus = 'loading';
			vm.recordsPerPage = 10;
			vm.viewAll = false;
			vm.limit = vm.recordsPerPage;

			adminService.getSupervisedParticipant($scope.participantId).then(function (response) {
				vm.supervisedParticipantStatus = 'success';
				vm.supervisedParticipants = response;
			}, function (errorResponse) {
				vm.supervisedParticipantStatus = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});

			vm.showAll = function () {
				vm.recordsPerPage = vm.supervisedParticipants.length;
			};
		}
	};
}]);