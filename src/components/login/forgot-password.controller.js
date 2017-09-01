'use strict';

angular.module('edAssistApp').controller('forgotPasswordController',
	['$scope', '$state', '$stateParams', 'userService', 'storageService', 'contentConstants',
	function ($scope, $state, $stateParams, userService, storageService, contentConstants) {

	var vm = this;

	vm.logoPath = $stateParams.logoPath;
	
	if ($stateParams.contentName === contentConstants.name.createPassword) {
		vm.content = 'CREATE_PASSWORD.HELP_TEXT';
	} else {
		vm.content = 'FORGOT_PASSWORD.HELP_TEXT';
	}

	$scope.submitForgotPwd = function (isvalid) {
		if (isvalid) {
			vm.status = 'submitting';
			this.formData.clientId = storageService.get('client.clientLoginDetails.clientId');

			userService.resetPassword(this.formData).then(function (response) {
				vm.status = 'success';
			}, function (errorResponse) {
				vm.status = 'error';
				vm.statusCode = _.get(errorResponse, 'status');
				vm.message = _.get(errorResponse, 'data.message');
			});
		}
	};
}]);
