'use strict';

angular.module('edAssistApp').directive('supportingDocumentation', ['programService', 'applicationService', 'participantService', 'storageService', 'gradeService', 'constants', function (programService, applicationService, participantService, storageService, gradeService, constants) {

	return {
		restrict: 'EA',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/submitted-application/templates/supporting-documentation.template.html',
		controllerAs: 'supportingDocsCtrl',
		controller : function ($scope) {
			var vm = this;
			vm.model = $scope.model;
			vm.programId = vm.model.programId;
			vm.applicationId = vm.model.applicationId;
			vm.application = {};
			vm.model.setUploaderUrl(vm.model.uploadUrl);
			
			vm.participantId = storageService.get('user.userDetails.participantId');
			
			vm.statuses = {
				docTypesStatus : 'loading',
				coursesStatus : 'loading',
				gradeStatus : 'loading',
				applicationStatus : 'loading',
				uploadStatus : ''
			};

			$scope.$on('supportedDocumentsLoaded', function (event, data) {
				vm.statuses.docTypesStatus = data.docTypeStatus;
				vm.model.documentTypes = data.documentTypes;
			});

			vm.errorMessage = '';
			vm.selectedDocumentType = '';
			vm.documentComments = '';
			vm.grades = [];
			vm.originalApplicationCourses = [];
			vm.applicationCourses = [];

			if (vm.applicationId) {
				applicationService.getApplicationCourses(vm.applicationId).then(function (response) {
					if (response.length > 0) {
						vm.originalApplicationCourses = response;
						vm.applicationCourses = _.cloneDeep(vm.originalApplicationCourses);
					}
					vm.statuses.coursesStatus = 'success';
				}, function (errorResponse) {
					vm.applicationCourses = [];
					vm.originalApplicationCourses = [];

					vm.statuses.coursesStatus = 'error';
				});

				gradeService.getGradeTypes().then(function (response) {
					vm.grades = response;
					vm.statuses.gradeStatus = 'success';
				}, function (errorResponse) {
					vm.statuses.gradeStatus = 'error';
				});

				applicationService.getTuitionApplication(vm.applicationId).then(function (response) {
					vm.application = response;
					vm.statuses.applicationStatus = 'success';
				}, function (errorResponse) {
					vm.statuses.applicationStatus = 'error';
				});
			}

			vm.clearAll = function () {
				vm.model.resetUploader(function () {vm.clearForm(); });
			};
			vm.clearForm = function () {
				vm.selectedDocumentType = '';
				vm.applicationCourses = _.cloneDeep(vm.originalApplicationCourses);
				vm.documentComments = '';
				vm.statuses.uploadStatus = '';
				$scope.supportDocumentationForm.$setPristine();
				$scope.supportDocumentationForm.$setUntouched();
				$scope.supportDocumentationForm.$submitted = false;
			};

			vm.save = function (detailsForm) {
				$scope.supportDocumentationForm.$submitted = true;
				if (detailsForm.$invalid)
				{
					return;
				}
				var queue = _.get(vm.model.uploader, 'queue');
				if (queue && queue.length > 0) {
					vm.coursesData = [];
					if (vm.isGradesSelected()) {
						vm.coursesData = vm.tryBuildCourses();
						if (!vm.coursesData)
						{
							vm.statuses.uploadStatus = 'error';
							return;
						}
					}
					else {
						vm.coursesData = {
							'courseId' : '',
							'gradeId' : '',
							'studentID' : ''
						};
					}

					var formData = [];
					formData.push({
						'documentType' : vm.selectedDocumentType.documentName,
						'applicationComment' : vm.documentComments
					});
					if (vm.coursesData) {
						$.merge(formData, vm.coursesData);
					}
					vm.model.startUpload(formData);
				}
				else {
					vm.statuses.uploadStatus = 'error';
				}
			};

			vm.saveContentDocument = function () {
				var queue = _.get(vm.model.uploader, 'queue');
				if (queue && queue.length > 0) {
					var formData = [];
					formData.push({
						'id' : vm.model.id,
						'fileId' : vm.model.fileId
					});
					vm.model.startUpload(formData);
				}
			};

			vm.tryBuildCourses = function () {
				var courseIds = [];
				var	gradeIds = [];
				var studentID = _.get(vm.application, 'studentID');
				var formData = [];

				_.forEach(vm.applicationCourses, function (course) {
					if (course.grades.gradeID) {
						courseIds.push(course.applicationCoursesID);
						gradeIds.push(course.grades.gradeID);
					}
				});

				if (courseIds.length > 0 && gradeIds.length > 0) {
					formData.push({'courseId' : courseIds.join(',')});
					formData.push({'gradeId' : gradeIds.join(',')});
					if (studentID) {
						formData.push({'studentID' : studentID});
					}
					return formData;
				}
				else
				{
					return false;
				}
			};

			vm.isGradesSelected = function () {
				return vm.selectedDocumentType.defaultDocumentsID === constants.documentTypes.grades;
			};

			vm.model.uploader.onSuccessItem = function (fileItem, response, status, headers) {
				vm.statuses.uploadStatus = 'success';
				vm.model.handleUploadComplete(function () {vm.clearForm(); });
			};

			vm.model.uploader.onErrorItem = function (fileItem, response, status, headers) {
				vm.statuses.uploadStatus = 'error';
				fileItem.isUploaded = false;
			};
		}
	};
}]);