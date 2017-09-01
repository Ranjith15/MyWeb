'use strict';

angular.module('edAssistApp').directive('selectDropdown', [ function () {
	return {
		restrict: 'EA',
		scope: {},
		bindToController: {
			label: '@',
			name: '@',
			value: '=?',
			onchange: '&?',
			options: '=',
			optValue: '@',
			optFilter: '@',
			displayValue: '@',
			trackBy: '@',
			required: '=?',
			model: '=',
			isError: '=?',
			isShowHelp: '=?',
			helpText: '@'
		},
		templateUrl: 'src/directives/ui/select-dropdown.template.html',
		controllerAs: 'selectDropdownCtrl',
		controller: function ($scope) {
			var vm = this;

			$scope.otherSort = function(opt) {
				return opt[vm.displayValue] === 'Other';
			};
		}
	};
}]);
