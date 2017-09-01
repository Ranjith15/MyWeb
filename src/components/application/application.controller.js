'use strict';

angular.module('edAssistApp').controller('applicationController', ['$scope', '$q', '$translate', '$state', 'applicationService', 'constants', function ($scope, $q, $translate, $state, applicationService, constants) {
	var vm = this;
	$scope.updateApplicationScope = function (path, data) {
		_.set($scope, path, data);
	};

	$scope.handleSaveOrLoadStatus = function (promiseArray) {
		$q.all(promiseArray).then(function (response) {
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

	$scope.confirmDelete = function () {
		var applicationId = $scope.stepViewData.applicationId;
		if (applicationId) {
			vm.appData = {
				model: {applicationId: applicationId},
				modalHeader: $translate.instant('MODALS.DELETE_APPLICATION.DELETE_QUESTION'),
				modalBody: $translate.instant('MODALS.DELETE_APPLICATION.DELETE_TEXT'),
				modalSaveText: $translate.instant('MODALS.DELETE_APPLICATION.BTN_DELETE'),
				modalCancelText: $translate.instant('MODALS.DELETE_APPLICATION.BTN_SAVE'),
				onDeleteClicked: function(model) {
					vm.status = 'deleting';
					applicationService.api.one(model.applicationId).one('delete').remove().then(function (response) {
						vm.showDelete = 'hide';
						$state.go(constants.routes.home);
					}, function (errorResponse) {
						vm.status = 'error';
						vm.message = _.get(errorResponse, 'data.message');
					});
				},
				onSaveForLater: function(model) {
					vm.showDelete = 'hide';
					$state.go(constants.routes.home);
				}
			};
			vm.showDelete = 'show';
		} else {
			$state.go(constants.routes.home);
		}
	};
	
}]);