'use strict';

angular.module('edAssistApp').controller('scheduleAppointmentController', ['$scope', '$state', 'constants', '$location', '$anchorScroll', function ($scope, $state, constants, $location, $anchorScroll) {
	var vm = this;
	$scope.updateAdvisingScope = function (path, data) {
		_.set($scope, path, data);
	};
	$scope.handleSaveOrLoadStatus = function (promise) {
		promise.then(function (response) {
			$scope[$scope.stepViewData.formName].$setPristine();
			$scope.focusOnFirstFormElement();
			$scope.status = '';
		}, function (errorResponse) {
			$scope.status = 'error';
			$scope.errorMessage = _.get(errorResponse, 'data.message');
		});
	};
	$scope.focusOnFirstFormElement = function () {
		$scope.$broadcast('formFocus', $scope.stepViewData.formName);
	};
	$scope.scrollToAppointmentTile = function() {
		$location.hash('appointmentHeader');
		$anchorScroll();
	};
	vm.confirmCancel = function () {
		vm.appData = {};
		vm.appData.cancelAppointmentRequest = function () {
			vm.showCancel = 'hide';
			$state.go(constants.routes.employmentEducation, {}, {reload : true}).then(function() {
				$scope.scrollToAppointmentTile();
			});
		};
		vm.showCancel = 'show';
	};
}]);