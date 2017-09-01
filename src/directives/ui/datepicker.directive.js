'use strict';

angular.module('edAssistApp').directive('datepicker', [ function () {
	return {
		scope: true,
		bindToController: {
			label: '@',
			name: '@',
			onchange: '&?',
			isShowHelp: '=?',
			errorText: '@',
			model: '=',
			required: '=?'
		},
		templateUrl: 'src/directives/ui/datepicker.template.html',
		controllerAs: 'datePickerCtrl',
		controller: function () {
      var vm = this;
			vm.isDialogOpen = false;

      vm.openDialog = function() {
				vm.isDialogOpen = true;
			};
		}
	};
}]);
