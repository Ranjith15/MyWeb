'use strict';

angular.module('edAssistApp').directive('submittedProfile', function () {

	return {
		restrict: 'E',
		scope: {
			preferredAddress: '=',
			preferredPhone: '=',
			preferredEmail: '='
		},
		templateUrl: 'src/directives/submitted-application/templates/submitted-profile.template.html'
	};
});