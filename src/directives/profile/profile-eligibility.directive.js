'use strict';

angular.module('edAssistApp').directive('profileEligibility', function () {

	return {
		restrict: 'EA',
        scope: {
            model: '='
        },
		templateUrl: 'src/directives/profile/profile-eligibility.html',
		controllerAs: 'profileEligibilityCtrl',
		controller: function () {

		}
	};
});