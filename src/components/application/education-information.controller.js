'use strict';

angular.module('edAssistApp').controller('educationInformationController',
	['$scope', '$q', '$state', '$stateParams', '$location', 'constants', 'contentConstants', 'applicationService', 'programService', 'participantService', 'storageService', 'educationProgramService', 'educationProvidersService', 'generalContentService',
	function ($scope, $q, $state, $stateParams, $location, constants, contentConstants, applicationService, programService, participantService, storageService, educationProgramService, educationProvidersService, generalContentService) {

	var vm = this;
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	var stepViewData = {
		stepNumber: 2,
		formName: 'educationInfoForm',
		stepHeader: 'APPLICATION.EDUCATION_INFORMATION.HEADER',
		submitButtonName: 'GENERAL.CONTINUE',
		applicationId: $stateParams.applicationId,
		participantId: $stateParams.participantId
	};

	var degreeInformation = vm.degreeInformation = {};
	var participantId = $stateParams.participantId;
	var applicationId = $stateParams.applicationId;
	var masterEducationProfile = {};
	var oldProgramId;

	vm.certificateTypeId = constants.certifications.programTypeID;

	var getDefaultContent = function () {
		return generalContentService.findByName(contentConstants.component.applicationStep2, contentConstants.name.step2Intro, clientId, contentConstants.program.clientDefault).then(function (response) {
			if (_.size(response) > 0) {
				vm.step2Intro = _.first(response.plain()).data;
			}
		});
	};

	var getProgramContent = function () {
		return generalContentService.findByComponent(contentConstants.component.applicationStep2, clientId, contentConstants.program.clientDefault, false).then(function (response) {
			if (_.size(response) > 0) {
				vm.educationInfocontent = response.plain();
				vm.programInformation = _.result(_.find(vm.educationInfocontent, {'name' : 'programInformation'}), 'data');
				vm.educationProvider = _.result(_.find(vm.educationInfocontent, {'name' : 'educationProvider'}), 'data');
				vm.degree = _.result(_.find(vm.educationInfocontent, {'name' : 'degree'}), 'data');
				vm.examProvider = _.result(_.find(vm.educationInfocontent, {'name' : 'examProvider'}), 'data');
			}
		});
	};

	var setApplicationData = function () {
		return {
			studentID: _.get(vm, 'educationProfile.studentID'),
			courseOfStudyID: _.get(vm, 'educationProfile.fieldOfStudyID'),
			degreeObjectiveID: _.get(vm, 'educationProfile.degreeID'),
			educationalProvider: _.get(vm, 'educationProfile.providerID'),
			reimburseTuitionApp: {
				otherCourseOfStudy: _.get(vm, 'educationProfile.otherCourseOfStudy'),
				certificationStartDate: _.get(vm, 'educationProfile.certificationStartDate'),
				certificationEndDate: _.get(vm, 'educationProfile.certificationEndDate')
			},
			applicationSourceID: {
				applicationSourceID: '4',
				applicationSourceDesc: 'Web'
			},
			benefitPeriodID: {
				programID: _.get(vm, 'educationProfile.programID')
			},
			participantID: {
				participantId: participantId
			}
		};
	};

	var updateApplication = function (application) {
		_.set(application, 'studentID', vm.educationProfile.studentID);
		_.set(application, 'courseOfStudyID', vm.educationProfile.fieldOfStudyID);
		_.set(application, 'reimburseTuitionApp.otherCourseOfStudy', vm.educationProfile.otherCourseOfStudy);
		_.set(application, 'degreeObjectiveID', vm.educationProfile.degreeID);
		_.set(application, 'educationalProvider', vm.educationProfile.providerID);
		_.set(application, 'certificationStartDate', vm.certificationStartDate);
		_.set(application, 'certificationEndDate', vm.certificationEndDate);

		return application;
	};

	var updateEducationProfile = function (application) {
		_.set(vm, 'educationProfile', application.participantID.currentEducationProfile);
		_.set(vm, 'educationProfile.degreeID', application.degreeObjectiveID);
		_.set(vm, 'educationProfile.fieldOfStudyID', application.courseOfStudyID);
		_.set(vm, 'educationProfile.otherCourseOfStudy', application.reimburseTuitionApp.otherCourseOfStudy);
		_.set(vm, 'educationProfile.programID', application.benefitPeriodID.programID);
		_.set(vm, 'educationProfile.providerID', application.educationalProvider);
		_.set(vm, 'educationProfile.studentID', application.studentID);
		_.set(vm, 'educationProfile.certificationStartDate', application.certificationStartDate);
		_.set(vm, 'educationProfile.certificationEndDate', application.certificationEndDate);
	};

	var updateModel = function () {
		if ($scope.application) {
			updateEducationProfile($scope.application);
		} else {
			applicationService.getTuitionApplication(vm.applicationId).then(function (response) {
				$scope.updateApplicationScope('status', 'applicationLoaded');
				updateEducationProfile(response);
				$scope.updateApplicationScope('application', response);
			}, function (errorResponse) {
				$scope.updateApplicationScope('status', 'error');
				$scope.updateApplicationScope('errorMessage', _.get(errorResponse, 'data.message'));
			});
		}
	};

	var handleProgramChangeLoading = function (promiseArray) {
		// all sections after program selection will show the spinner and reload on each program selection
		$q.all(promiseArray).then(function (response) {
			$scope.updateApplicationScope('status', '');

			vm.status = '';
			if (applicationId) {
				updateModel();
			}
		}, function (errorResponse) {
			vm.status = 'error';
			$scope.updateApplicationScope('status', 'error');
			$scope.updateApplicationScope('errorMessage', _.get(errorResponse, 'data.message'));
		});
	};

	var getProgramData = function (newProgramId) {
		generalContentService.findByComponent(contentConstants.component.applicationStep2, clientId, newProgramId, false).then(function (response) {
			vm.content = response.plain();
		});

		var degreeObjectivesPromise = programService.getDegreeObjectives(newProgramId).then(function (response) {
			degreeInformation.degreeObjectives = response.plain();
		});
		var fieldsOfStudyPromise = programService.getFieldsOfStudy(newProgramId).then(function (response) {
			degreeInformation.fieldsOfStudy = response.plain();
		});
		var programAccredPromise = programService.getProgram(newProgramId).then(function (response) {
			_.set(vm, 'educationProfile.programID.programAccreditingBodyCollection', _.get(response, 'programAccreditingBodyCollection'));
			_.set(vm, 'educationProfile.programTypeID', _.get(response, 'programTypeID'));
		});
		handleProgramChangeLoading([degreeObjectivesPromise, fieldsOfStudyPromise, programAccredPromise]);
	};

	var retrieveProgramDependentData = function (newProgramId, oldProgramId) {
		if (newProgramId) {
			// $scope.updateApplicationScope('status', 'loading');
			vm.status = 'loading';
			getProgramData(newProgramId);

			if (oldProgramId && newProgramId !== oldProgramId && _.get(vm, 'participantProgramData.programs')) {
				vm.educationProfile = _.omit(vm.educationProfile, ['degreeID', 'fieldOfStudyID']);
			}
		}
	};

	var showConfirmModal = function ($event) {
		if (applicationId) {
			$event.preventDefault();
			$event.stopPropagation();
			vm.programModalFunctions = {};
			vm.programModalFunctions.confirmChangeProgram = function () {
				vm.status = 'deleting';
				applicationService.deleteApplication(applicationId).then(function (response) {
					vm.showChangeProgram = 'hide';
					// As we delete the application, we need to update the URL so data doesn't gets updated again.
					// This will transition to the same state but without the applicationId
					$state.transitionTo(constants.routes.educationInformation, {
						location: true,
						inherit: true,
						relative: $state.$current,
						notify: false,
						newSelectedProgramId: vm.educationProfile.programID.programID
					});
				}, function (errorResponse) {
					vm.status = 'error';
					vm.message = _.get(errorResponse, 'data.message');
				});
			};
			vm.programModalFunctions.cancelChangeProgram = function () {
				vm.educationProfile.programID.programID = oldProgramId;
				vm.showChangeProgram = 'hide';
			};
			vm.showChangeProgram = 'show';
		} else {
			retrieveProgramDependentData(vm.educationProfile.programID.programID, oldProgramId);
		}
	};

	var programDataPromise = educationProgramService.getAvailableProgramData(participantId).then(function (response) {
		_.set(vm, 'participantProgramData.status', 'success');
		_.set(vm, 'participantProgramData.programs', response);
		if (applicationId) {
			updateModel();
			oldProgramId = angular.copy(vm.educationProfile.programID.programID);
			retrieveProgramDependentData(oldProgramId);
		}

		// If there's only one program, pre-select it.
		if (_.size(response) === 1) {
			var programId = _.get(response, '[0].programID');
			_.set(vm, 'educationProfile.programID.programID', programId);
			programService.getProgram(programId).then(function (response) {
				_.set(vm, 'educationProfile.programID.programAccreditingBodyCollection', _.get(response, 'programAccreditingBodyCollection'));
			});
		}
	}, function (errorResponse) {
		_.set(vm, 'participantProgramData.status', '');
	});

	var getEducationProfile = function () {
		$scope.handleSaveOrLoadStatus([programDataPromise]);
		return participantService.getCurrentEducationalProfile(participantId).then(function (response) {
			var selectedProgramId = $stateParams.newSelectedProgramId;
			// we need to wait for programDataPromise to be resolved to get the list of programs to pre-select the program properly
			masterEducationProfile = response.clone();
			vm.educationProfile = response;

			if (selectedProgramId) {
				// If there's a previously selected program start with radio checked.
				_.set(vm, 'educationProfile.programID.programID', selectedProgramId);
			}

			// If there is no previously existing provider data, start with provider search open.
			var showSearch = !_.get(vm, 'educationProfile.providerID');
			educationProvidersService.setEditing(showSearch);

			programDataPromise.then(function () {
				if (_.get(response, 'programID.programID')) {
					retrieveProgramDependentData(_.get(response, 'programID.programID'));
				}
				_.set(vm, 'application.educationalProvider', response.providerID);
			});
		});
	};

	var attachProviderSearchCancelEvent = function () {
		$scope.$on('cancelSearch', function () {
			_.set(vm, 'educationProfile.providerID', masterEducationProfile.providerID);
		});
	};

	var submitEducationForm = function (educationForm) {
		educationForm.$setSubmitted();
		if (educationForm.$valid) {
			if (_.isEmpty(vm.educationProfile.providerID)) {
				vm.educationProfile.providerModalState = 'show';
			} else {
				//This block help to unassign the existing otherCourseOfStudy text value
				if (vm.educationProfile.fieldOfStudyID.courseOfStudyID !== 55) {
					vm.educationProfile.otherCourseOfStudy = null;
				}
 				$scope.updateApplicationScope('status', 'submitting');
				var app;
				var appCreationPromise;
				if (applicationId) {
					app = updateApplication($scope.application);
					appCreationPromise = app.save().then(function (response) {
						participantService.updateCurrentEducationalProfile(vm.educationProfile, participantId);
						$state.go(constants.routes.courses, {applicationId: applicationId});
					});
				} else {
					app = setApplicationData();
					appCreationPromise = applicationService.createTuitionApplication(app).then(function (response) {
						// save() will post or put accordingly
						vm.educationProfile.save();
						$scope.updateApplicationScope('application', response);
						$state.go(constants.routes.courses, {applicationId: response.applicationID});
						educationForm.$setPristine();
					});

				}
				$scope.handleSaveOrLoadStatus([appCreationPromise]);
			}
		}
	};

	var setInitialViewModel = function () {
		$scope.updateApplicationScope('stepViewData', stepViewData);
		$scope.focusOnFirstFormElement();
		$scope.updateApplicationScope('submitChildForm', submitEducationForm);
		vm.educationProfile = {programID: {}};
		vm.showConfirmModal = showConfirmModal;
	};

	var init = function () {
		$scope.updateApplicationScope('status', 'loading');
		vm.status = 'loading';
		getDefaultContent();
		getProgramContent();
		attachProviderSearchCancelEvent();
		setInitialViewModel();
		if (!applicationId) {
			getEducationProfile();
		}
	};

	init();
}]);
