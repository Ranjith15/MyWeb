'use strict';

angular.module('edAssistApp').directive('providerInformation', ['$translate', '$sce', 'educationProvidersService', 'storageService', 'generalContentService', 'constants', function ($translate, $sce, educationProvidersService, storageService, generalContentService, constants) {

	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/profile/education/provider-information.html',
		controllerAs: 'providerInformationCtrl',
		controller: function ($scope, $element, $attrs) {
			var vm = this;
			vm.title = $scope.title;
			vm.isLoading = false;
			vm.isEditing = educationProvidersService.isEditing();
			vm.programDataModal = '';
			var showModal = 'show';

			$scope.$watch('model.educationProfile', function (newValue, oldValue) {
				vm.educationProfile = newValue;
			});

			$scope.$watch('model.educationProfile.providerID', function (newValue, oldValue) {
				vm.educationProvider = newValue;
				if (_.get(vm, 'educationProvider.educationalProviderId')) {
					vm.loadProviderDocs();
				}
			});

			vm.editEducation = function () {
				if (vm.educationProfile.programID.programID) {
					educationProvidersService.setEditing(true);
				} else {
					vm.programDataModal = showModal;
				}
			};

			var onEditChange = function () {
				return educationProvidersService.isEditing();
			};

			var updateEditingValue = function (newValue, oldValue) {
				if (newValue !== oldValue) {
					vm.isEditing = newValue;
				}
			};

			$scope.$watch(onEditChange, updateEditingValue);

			vm.loadProviderDocs = function () {
				generalContentService.getProviderDocs(vm.educationProvider.educationalProviderId).then(function (response) {
					vm.status = 'success';
					vm.providerDocuments = response;
					_.each(vm.providerDocuments, function (doc) {
						_.set(doc, 'name', $translate.instant('EDUCATION.PROVIDER.IN_NETWORK_LINK'));
					});
				}, function (errorResponse) {
					vm.status = 'error';
					vm.message = _.get(errorResponse, 'data.message');
				});
			};

			vm.getContentHtml = function (contentName) {
				return $sce.trustAsHtml(_.result(_.find($scope.model.content, {'name' : contentName}), 'data'));
			};

		}
	};
}]);
