'use strict';

angular.module('edAssistApp').directive('submittedContactInformation', function () {

	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/advising/templates/submitted-contact-information.template.html'
	};
});