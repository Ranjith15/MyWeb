'use strict';

angular.module('edAssistApp').directive('documentDownload', ['fileContentService', function (fileContentService) {

	return {
		restrict: 'E',
		scope : {
			content: '=',
		},
		template: '<a href="" ng-click="documentDownloadCtrl.retrieveDocument(content.fileId, content.fileName)" aria-label="{{content.fileName}}" title="Click to Download Document"><strong>{{content.fileName}}</strong></a>',
		controllerAs : 'documentDownloadCtrl',
		controller: function ($scope) {
			var vm = this;
			$scope.$on('reloadSupportDocuments', function (e, contentList) {
				if (contentList) {
					var updatedContent =  _.find(contentList, {'id' : $scope.content.id});
					if (updatedContent) {
						$scope.content.fileId = updatedContent.fileId;
						$scope.content.fileName = updatedContent.fileName;
					}
				}
				$scope.$parent.msg = vm.loadSupportDocuments();
			});
			vm.loadSupportDocuments = function () {
				vm.retrieveDocument = fileContentService.retrieveFileContent;
			};
			vm.loadSupportDocuments();
		}
	};
}]);