'use strict';

angular.module('edAssistApp').controller('updateAppointmentConfirmationController', ['$scope', '$stateParams', '$state', '$location', '$anchorScroll', 'constants', function ($scope, $stateParams, $state, $location, $anchorScroll, constants) {
	var vm = this;
	vm.updateStatus = $stateParams.updateStatus;
	$location.hash('confirmationHeader');
	$anchorScroll();

	vm.routeToEmploymentEducation = function() {
		$state.go(constants.routes.employmentEducation).then(function() {
			$location.hash('appointmentHeader');
			$anchorScroll();
		});
	};

}]);