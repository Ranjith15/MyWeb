'use strict';

angular.module('edAssistApp').directive('profileContact', function () {

	return {
		restrict: 'EA',
		scope: {
			model: '=ngModel'
		},
		require: '^form',
		templateUrl: 'src/directives/profile/profile-contact.html',
		link: function (scope, element, attrs, form) {
			scope.form = form;
			scope.global = scope.$parent.global;
		},
		controllerAs: 'profileContactCtrl',
		controller: function ($scope, storageService) {
			var vm = this;
			vm.showAddressButtonsYN = storageService.get('client.clientLoginDetails.showAddressButtonsYN');
			var isOtherPhoneRequired = function () {
				var preferredPhone = _.get($scope, 'model.preferredPhone');
				return preferredPhone && ((preferredPhone.toLowerCase() === 'work' && !$scope.model.workAddress.phone) || (preferredPhone.toLowerCase() === 'home' && !$scope.model.homeAddress.phone));
			};
			$scope.$watch('model.preferredPhone', function () {
				if (isOtherPhoneRequired()) {
					$scope.model.preferredPhone = '';
				}
			});
		}
	};
});