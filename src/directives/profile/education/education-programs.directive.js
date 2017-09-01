'use strict';

angular.module('edAssistApp').directive('educationPrograms', function () {

	return {
		restrict: 'EA',
		scope : {
			model: '='
		},
		templateUrl: 'src/directives/profile/education/education-programs.html',
		controllerAs : 'educationProgramsCtrl',
		controller : function ($scope) {
			var vm = this;
			vm.educationProgramModals = {};
			vm.changeProgramsModalState = function (modalID) {
				var selectedModal = _.get(vm.educationProgramModals, modalID);

				if (selectedModal) {
					if (selectedModal === 'show') {
						vm.educationProgramModals[modalID] = 'hide';
						return;
					}
					else {
						vm.educationProgramModals[modalID] = 'show';
						return;
					}
				}
				else {
					vm.educationProgramModals[modalID] = 'show';
					return;
				}
			};
		}
	};
});
