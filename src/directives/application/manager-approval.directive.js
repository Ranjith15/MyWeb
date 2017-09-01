'use strict';

angular.module('edAssistApp').directive('managerApproval', 
	['$state', 'constants', 'storageService', 'adminService', 'generalContentService', 'contentConstants',
	function ($state, constants, storageService, adminService, generalContentService, contentConstants) {
	
	return {
		restrict: 'EA',
		scope: {
			applicationId: '=',
			programId: '='
		},
		templateUrl: 'src/directives/application/templates/manager-approval.html',
		controllerAs: 'managerApprovalCtrl',
		controller: function ($scope) {
			var vm = this;
			var applicationId = $scope.applicationId;
			var userId = storageService.get('user.userDetails.userId');
			var clientId = storageService.get('client.clientLoginDetails.clientId');

			vm.showCommentBox = false;
			vm.isApproving = false;
			vm.approvalConfirmationIntro = null;
			vm.denialConfirmationIntro = null;

			var initialize = function () {
				generalContentService.findByComponent(contentConstants.component.managerReview, clientId, $scope.programId + ',clientDefault', false).then(function (response) {
					var content = response.plain();
					vm.approvalConfirmationIntro = _.result(_.find(content, {'name' : 'approvalConfirmationIntro'}), 'data');
					vm.denialConfirmationIntro = _.result(_.find(content, {'name' : 'denialConfirmationIntro'}), 'data');
				});
			};

			var updateApplicationStatus = function (statusCode, comment) {
				vm.updatingStatus = true;

				var approval = {
						applicationStatusCode: statusCode, 
						comment: comment
					};
				
				adminService.updateApplicationStatus(userId, applicationId, approval).then(function (response) {
						$state.go(constants.routes.home);
						vm.updatingStatus = false;
					}, function (errorResponse) {
						vm.updatingStatus = false;
						vm.status = 'error';
						vm.message = _.get(errorResponse, 'data.message');
					});
			};

			vm.approveApplication = function (comment) {
				updateApplicationStatus(constants.applicationStatus.approved, comment);
			};

			vm.denyApplication = function (comment) {
				updateApplicationStatus(constants.applicationStatus.denied, comment);
			};

			vm.resetForm = function (frm) {
				vm.showCommentBox = false;
				vm.approvalComment = '';
				vm.status = '';
				frm.$setPristine();
			};

			initialize();
		}
	};
}]);