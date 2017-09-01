'use strict';

angular.module('edAssistApp').directive('applicationDocumentDownload', ['fileContentService', 'applicationService', 'FileSaver', 'Blob', function (fileContentService, applicationService, FileSaver, Blob) {

	return {
		restrict: 'E',
		scope : {
			content: '=',
			appId: '='
		},
		template: '<a href="" ng-click="applicationDocumentDownloadCtrl.retrieveDocument(content)" title="{{ \'ADA.DOWNLOAD_DOC\' | translate }}" aria-label="{{content.documentName}} {{ \'ADA.DOWNLOAD_DOC_LOCAL\' | translate }}" role="alert"> {{content.documentName}}</a>',
		controllerAs : 'applicationDocumentDownloadCtrl',
		controller: function ($scope) {
			var vm = this;
			vm.retrieveDocument = function (content) {
				var applicationID = $scope.appId;
				if (content && applicationID) {
					applicationService.getApplicationDocumentFile(String(applicationID), String(content.applicationDocumentID)).then(function (response) {
						fileContentService.downloadDocument(response, content.documentName);
					}, function (errorResponse) {
						$scope.retrieveStatus = 'error';
					});
				} else {
					$scope.retrieveStatus = 'error';
				}
			};
		}
	};
}]);