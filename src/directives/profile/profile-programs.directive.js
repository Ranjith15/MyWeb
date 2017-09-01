'use strict';

angular.module('edAssistApp').directive('profilePrograms', function () {

	return {
		restrict: 'EA',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/profile/profile-programs.html',
		controllerAs: 'profileProgramsCtrl',
		controller: function ($scope) {
			var vm = this;
			vm.rule = _.first($scope.model.rules);
		}
	};
});