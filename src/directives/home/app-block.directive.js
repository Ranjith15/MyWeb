'use strict';

angular.module('edAssistApp').directive('appBlock', ['storageService', 'utilService', function (storageService, utilService) {

	return {
		restrict: 'EA',
		replace: true,
		scope: {
			statusCode: '=',
			isSupervisor: '=',
			view: '=',
			colLeftClass: '@',
			colRightClass: '@'
		},
		transclude: {
			'labelSlot': 'blockLabel',
			'leftSlot': 'blockLeft',
			'rightSlot': 'blockRight'
		},
		templateUrl: 'src/directives/home/templates/app-block.template.html',
		controllerAs: 'appBlockCtrl',
		controller: function ($scope) {

			var vm = this;

			vm.status = utilService.getAppStatus($scope.statusCode);
			vm.appView = $scope.view;
			vm.isSupervisor = $scope.isSupervisor;
		}
	};
}]);