'use strict';

angular.module('edAssistApp').directive('studentId', ['constants', function (constants) {

	return {
		restrict: 'EA',
		scope: {
			model : '='
		},
		templateUrl: 'src/directives/application/templates/student-id.html',
		controllerAs: 'studentIdCtrl',
		require: '^form',
		link: function ($scope, $element, $attrs, form) {
			//TODO: These should not be scope function, declare specific for controller
			$scope.form = form;
			$scope.studentIdRegex = constants.patterns.studentId;
			$scope.studentIdModalState = 'hide';

			$scope.toggleStudentIdModal = function () {
				$scope.studentIdModalState = 'show';
			};
		}
	};
}]);
