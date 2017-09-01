'use strict';

angular.module('edAssistApp').directive('supportUpload', ['storageService', 'vhdService', function (storageService, vhdService) {
	return {
		restrict: 'AE',
		scope: {
			model: '=',
			mode: '@',
			ticket: '@'
		},
		templateUrl: 'src/directives/file-upload/templates/support-documents-upload.html',
		controllerAs: 'uploadSupportDocumentsCtrl',
		controller : function ($scope, FileUploader, $timeout) {
			var vm = this;
			vm.mode = $scope.mode;
			vm.ticket = $scope.ticket;
			vm.model = $scope.model.fileUploadModel;
			vm.model.uploader = new FileUploader({autoUpload : false, withCredentials : true});
			var token = storageService.get('session.tokens.sessionToken');
			vm.model.uploader.headers = {'X-AUTH-TOKEN': token, 'source': 'web'};
			vm.uploader = vm.model.uploader;
			vm.uploader.url = vhdService.getSubmitSupportDocumentsURL();
			
			vm.model.resetUploader = function (callback) {
				vm.model.uploader.clearQueue();
				vm.model.uploader.file = '';
				callback();
			};

			vm.model.handleUploadComplete = function (callback) {
				vm.model.resetUploader(callback);
			};

			vm.model.startUpload = function (formData) {
				vm.model.formData = formData;
				vm.model.uploader.uploadAll();
			};

			vm.getProgressWidth = function () {
				return vm.model.uploader.progress + '%';
			};

			vm.getFileName = function () {
				if (vm.model.uploader.queue.length > 0) {
					return vm.model.uploader.queue[0]._file.name;
				}
				return '';
			};

			vm.isFileSelected = function () {
				if (vm.model.uploader.queue.length > 0) {
					return true;
				}
				return false;
			};

			vm.uploader.onBeforeUploadItem = function (item) {
				item.formData = vm.model.formData;
			};
			vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
				if (vm.mode === 'create') {
					$scope.model.createStatus = 'success';
					vm.model.handleUploadComplete(function () {$scope.model.submitTicketSuccess(); });
				} else {
					$scope.model.editStatus = 'success';
					vm.model.handleUploadComplete(function () {$scope.model.editTicketSuccess(vm.ticket); });
				}
			};

			vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
				if (vm.mode === 'create') {
					$scope.model.createStatus = 'error';
				} else {
					$scope.model.editStatus = 'error';
				}
				$scope.model.message = 'There was a problem uploading your file. Please try again.';
				fileItem.isUploaded = false;
			};

			vm.uploader.filters.push({
				name : 'fileTypeFilter',
				fn: function (item) {
					var type = '|' + item.name.slice(item.name.lastIndexOf('.') + 1) + '|';
					type = angular.lowercase(type);
					if ('|jpg|png|jpeg|bmp|gif|doc|docx|xls|xlsx|ppt|pptx|pdf|'.indexOf(type) !== -1) {
						$scope.model.fileTypeInValid = false;
						return true;
					}
					return false;
				}
			});

			vm.uploader.filters.push({
				name : 'fileSizeFilter',
				fn: function (item) {
					var fileSize = item.size;
					if (fileSize < 3145728) {
						$scope.model.fileSizeInValid = false;
						return true;
					} 
					return false;
				}
			});
			
			vm.uploader.onWhenAddingFileFailed = function (item, filter, options) {
				$scope.model.fileTypeInValid = false;
				$scope.model.fileSizeInValid = false;
				if (filter.name === 'fileTypeFilter') {
					$scope.model.fileTypeInValid = true;
				}
				if (filter.name === 'fileSizeFilter') {
					$scope.model.fileSizeInValid = true;
				}
				if (vm.uploader.queue.length > 0) {
					vm.uploader.clearQueue();
				}
			};
		}
	};
}]);