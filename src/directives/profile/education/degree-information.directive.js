'use strict';

angular.module('edAssistApp').directive('degreeInformation', function () {

	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		require: '^form',
		controllerAs: 'degreeInformationCtrl',
		controller: function($scope) {
			var vm = this;

			vm.postNominalLettersModalState = 'hide';

			vm.showPostNominalLettersModal = function() {
				vm.postNominalLettersModalState = 'show';
			};
		},
		templateUrl: 'src/directives/profile/education/degree-information.html',
		link: function ($scope, $element, $attrs, form) {
			$scope.form = form;
		}
	};
});
