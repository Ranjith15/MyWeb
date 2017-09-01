'use strict';

angular.module('edAssistApp').controller('logoutController', ['$stateParams', function ($stateParams) {
	var vm = this;
	vm.ssoLogOffEnabled = $stateParams.ssoLogOffEnabled;
}]);