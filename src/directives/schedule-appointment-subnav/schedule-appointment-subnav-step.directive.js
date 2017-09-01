'use strict';

angular.module('edAssistApp').directive('scheduleAppointmentSubnavStep', function () {

	return {
		restrict: 'A',
		scope: {
			step: '@',
			model: '='
		},
		transclude: true,
		replace: true,
		templateUrl: 'src/directives/schedule-appointment-subnav/schedule-appointment-subnav-step.html',
		controllerAs: 'scheduleAppointmentSubnavStepCtrl',
		controller: function ($scope) {
			var vm = this;
			vm.step = $scope.step;

			$scope.$watch(function (scope) {
				vm.complete = scope.model.stepNumber > $scope.step;
				vm.current = scope.model.stepNumber === Number($scope.step);
			});
		}
	};

});