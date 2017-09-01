'use strict';

angular.module('edAssistApp').directive('submittedAppointment', function () {

	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/advising/templates/submitted-appointment.template.html'
	};
});