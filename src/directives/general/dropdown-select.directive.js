'use strict';

angular.module('edAssistApp').directive('dropdownSelect', [ function () {
	return {
		scope: {},
		bindToController: { 
			menu: '=data',
			onchange: '&?'
		},
		templateUrl: 'src/directives/general/dropdown-select.template.html',
		controllerAs: 'vm',
		controller: function () {
			var vm = this;
			vm.change = function(option) {
				var updated = (vm.menu.selected !== option.label);
				var callback = (typeof vm.onchange === 'function');
				if (updated) {
					vm.menu.selected = option;
					if (callback) {
						vm.onchange()(option);
					}
				}
			};
		}
	};
}]);