'use strict';

angular.module('edAssistApp').directive('applicationDocumentsTable', ['$state', 'constants', 'applicationService', function ($state, constants, applicationService) {

	return {
		restrict: 'EA',
		scope : {
			documents : '=',
			applicationId: '='
		},
		templateUrl: 'src/directives/submitted-application/templates/application-documents.template.html',
		controllerAs: 'applicationDocumentsCtrl',
		controller: function ($scope) {
			var vm = this;
			vm.uploadedDocuments = [];
			vm.status = 'loading';
			vm.applicationId = $scope.applicationId;

			var getApplicationDocuments = function () {
				applicationService.getApplicationDocuments($scope.applicationId).then(function (response) {
					vm.uploadedDocuments = response;
					vm.status = 'success';
					vm.showDocumentsTable = vm.uploadedDocuments.length;
				}, function (errorResponse) {
					vm.status = 'error';
				});
			};
			
			var initialize = function () {
				vm.uploadedDocuments = $scope.documents;
				vm.status = 'success';
				vm.showDocumentsTable = vm.uploadedDocuments.length;
			};
			
			vm.deleteDocument = function (appDoc) {
				//TODO IMPLEMENT DELETE FUNCTIONALITY ED-2094
				initialize();
			};

			vm.navigateToDocumentPage = function (appDoc) {
				var docType = _.get(appDoc, 'documentName');
				if (docType && docType === constants.documentTypes.gradesName) {
					//TODO NAVIGATE TO GRADES LIST SCREEN
					$state.go(constants.routes.home);
				}
				else {
					//TODO NAVIGATE TO DOCUMENT LIST SCREEN
					$state.go(constants.routes.home);
				}
			};

			$scope.$on('reloadApplicationDocuments', function (e) {
				$scope.$parent.msg = getApplicationDocuments();
			});

			initialize();
		},
	};
}]);