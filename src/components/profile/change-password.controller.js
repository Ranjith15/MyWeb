'use strict';

angular.module('edAssistApp').controller('changePasswordController',
	['$scope', '$sce', '$state', '$stateParams', 'userService', 'generalContentService', 'storageService', 'constants', 'contentConstants',
	function ($scope, $sce, $state, $stateParams, userService, generalContentService, storageService, constants, contentConstants) {
	
	var vm = this;
	vm.userId = $stateParams.userId;
	
	generalContentService.findByName(contentConstants.component.changePassword, contentConstants.name.changePassword, 'global', '', true).then(function (response) {
			vm.changePasswordContent = $sce.trustAsHtml(_.first(response.plain()).data);
		});

	$scope.submitChangePasswordForm = function () {
		vm.status = 'submitting';
		userService.changePasword(vm.userId, this.formData).then(function (response) {
			vm.status = 'success';
			storageService.set('user.userDetails.resetPassword', 0);
			$state.go(constants.routes.home);
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};
}]);