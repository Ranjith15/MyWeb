'use strict';

angular.module('edAssistApp').directive('applicationSubnav', ['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {

	return {
		restrict: 'EA',
		scope: {
			data: '='
		},
		bindToController: true,
		templateUrl: 'src/directives/subnav/application-subnav.html',
		link: function ($scope, $element, $attrs) {
			// Set subNav class on body tag
			$rootScope.bodyClass = 'subNav';

			// Cleanup
			$scope.$on('$destroy', function () {
				// Remove subNav css from body
				delete $rootScope.bodyClass;
			});
		},
		controller: function ($scope) {
		},
		controllerAs: 'applicationSubnavCtrl'
	};

}]);