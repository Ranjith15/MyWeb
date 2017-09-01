'use strict';

angular.module('edAssistApp').directive('submittedEmploymentEducation', function () {

	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/advising/templates/submitted-employment-education.template.html'
	};
});