'use strict';

angular.module('edAssistApp').directive('scheduleAppointmentSubnav', 
	['$rootScope', '$location', '$window', 
	function ($rootScope, $location, $window) {

	return {
		restrict: 'EA',
		scope: {
			data: '='
		},
		bindToController: true,
		templateUrl: 'src/directives/schedule-appointment-subnav/schedule-appointment-subnav.html',
		link: function ($scope, $element, $attrs) {
			// Cleanup
			$scope.$on('$destroy', function () {
				// Remove subNav css from body
				delete $rootScope.bodyClass;
			});
		},
		controller: function ($scope) {
		},
		controllerAs: 'scheduleAppointmentSubnavCtrl'
	};

}]);