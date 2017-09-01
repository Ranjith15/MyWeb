'use strict';

angular.module('edAssistApp').directive('applicationSubnavStep', function () {

	return {
		restrict: 'A',
		scope: {
			step: '@',
			model: '='
		},
		transclude: true,
		replace: true,
		templateUrl: 'src/directives/subnav/application-subnav-step.html',
		controllerAs: 'applicationSubnavStepCtrl',
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