'use strict';

angular.module('edAssistApp').directive('profileRulesExceptions', function () {

	return {
		restrict: 'EA',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/profile/profile-rules-exceptions.html',
		controllerAs: 'profileRulesExceptionsCtrl',
		controller: function () {

		}
	};
});