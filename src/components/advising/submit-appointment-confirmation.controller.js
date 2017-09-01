'use strict';

angular.module('edAssistApp').controller('submitAppointmentConfirmationController', ['$scope', '$stateParams', '$state', '$location', '$anchorScroll', 'constants', function ($scope, $stateParams, $state, $location, $anchorScroll, constants) {
	var vm = this;
	vm.submissionStatus = $stateParams.submissionStatus;
	$location.hash('confirmationHeader');
	$anchorScroll();

	vm.routeToEmploymentEducation = function() {
		$state.go(constants.routes.employmentEducation).then(function() {
			$location.hash('appointmentHeader');
			$anchorScroll();
		});
	};

}]);