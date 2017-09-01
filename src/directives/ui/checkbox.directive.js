'use strict';

angular.module('edAssistApp').directive('checkbox', [ function () {
	return {
		scope: {},
		bindToController: {
			label: '@',
			name: '@',
			checked: '=?',
			onchange: '&?'
		},
		templateUrl: 'src/directives/ui/checkbox.template.html',
		controllerAs: 'checkboxCtrl',
		controller: function () {
		}
	};
}]);
