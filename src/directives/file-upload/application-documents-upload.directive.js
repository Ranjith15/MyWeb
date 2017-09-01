'use strict';

angular.module('edAssistApp').directive('fileUpload', ['storageService', function (storageService) {
	return {
		restrict: 'AE',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/file-upload/templates/application-documents-upload.html',
		controllerAs: 'uploadDocumentsCtrl',
		controller : function ($scope, FileUploader, $timeout) {
			var vm = this;
			vm.model = $scope.model;
			vm.model.uploader = new FileUploader({autoUpload : false, withCredentials : true});
			var token = storageService.get('session.tokens.sessionToken');
			$scope.model.uploader.headers = {'X-AUTH-TOKEN': token, 'source': 'web'};
			vm.uploader = $scope.model.uploader;

			$scope.model.setUploaderUrl = function (url) {
				vm.uploader.url = url;
			};
			
			$scope.model.resetUploader = function (callback) {
				$scope.model.uploader.clearQueue();
				$scope.model.uploader.file = '';
				callback();
			};

			$scope.model.handleUploadComplete = function (callback) {
				$scope.model.refreshApplicationDocuments();
				$scope.model.resetUploader(callback);
			};

			$scope.model.startUpload = function (formData) {
				$scope.model.formData = formData;
				$scope.model.uploader.uploadAll();
			};

			vm.getProgressWidth = function () {
				return $scope.model.uploader.progress + '%';
			};

			vm.getFileName = function () {
				if ($scope.model.uploader.queue.length > 0) {
					return $scope.model.uploader.queue[0]._file.name;
				}
				return '';
			};

			vm.isFileSelected = function () {
				if ($scope.model.uploader.queue.length > 0) {
					return true;
				}
				return false;
			};

			vm.uploader.onBeforeUploadItem = function (item) {
				item.formData = $scope.model.formData;
			};
		}
	};
}]);