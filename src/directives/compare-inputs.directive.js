'use strict';

angular.module('edAssistApp').directive('compareInputs', [function () {
	return {
		scope: {
			otherInputValue: '=compareInputs'
		},
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {
			ngModel.$validators.compareInputs = function (inputValue) {
				return inputValue === scope.otherInputValue;
			};
			scope.$watch('otherInputValue', function () {
				ngModel.$validate();
			});
		}
	};
}]);