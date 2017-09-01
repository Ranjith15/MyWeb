'use strict';

angular.module('edAssistApp').controller('profileController',
	['$scope', '$q', '$state', '$stateParams', 'constants', 'utilService', 'participantService', 'storageService', 'educationProgramService', 'educationProvidersService', 'programService', 'generalContentService', 'contentConstants',
	function ($scope, $q, $state, $stateParams, constants, utilService, participantService, storageService, educationProgramService, educationProvidersService, programService, generalContentService, contentConstants) {

	var vm = this;
	vm.status = 'submitting';	
	vm.userDetails ={};
	vm.ssoEnabled = storageService.get('client.clientLoginDetails.ssoEnabled');
	vm.nonSsoOveride = storageService.get('session.nonSsoOverride');
	vm.profileData = {};
	vm.profileData.status = 'loading';
	vm.participantProgramData = {};
	vm.participantProgramData.status = 'loading';
	vm.participantProgramData.selectedProgram = undefined;
	vm.participantId = $stateParams.participantId;
	vm.isExpanded = false;
	vm.ssoEnabled = storageService.get('client.ssoEnabled');
	var clientId = storageService.get('client.clientLoginDetails.clientId');

	var degreeInformation = vm.degreeInformation = {};
	var masterProfileData;

	function retrieveProgramEligibility() {
		participantService.getProgramEligibility(vm.participantId).then(function (programsResponse) {
			vm.eligiblityStatus = 'success';
			vm.rules = programsResponse;
		}, function (errorResponse) {
			vm.eligiblityStatus = 'error';
			vm.eligiblityMessage = _.get(errorResponse, 'data.message');
		});
	}

	var init = function() {
		if (utilService.isClientAdmin()) {
			vm.eligiblityStatus = 'loading';
			retrieveProgramEligibility();
		} else {
			vm.isExpanded = true;
		}
	};

	generalContentService.findByName(contentConstants.component.myPersonalProf, contentConstants.name.myPersonalProfPageIntro, clientId, contentConstants.program.clientDefault).then(function (response) {
		vm.profileIntro = _.get(response.plain(), '[0].data');
	});

	participantService.getParticipant(vm.participantId).then(function (response) {
		vm.userDetails = {'userId' : response.user.userId, 'userName' : response.user.userName};
		vm.profileData.status = 'success';
		// Save copy of raw profile data for reset.
		masterProfileData = response.clone();
		vm.profileData = response;
	}, function (errorResponse) {
		vm.profileData.status = 'error';
		vm.profileData.message = _.get(errorResponse, 'data.message');
	});
	participantService.getParticipantExceptions(vm.participantId).then(function (response) {
		vm.rulesExceptions = response.plain();
	});

	var programDataPromise = educationProgramService.getAvailableProgramData(vm.participantId).then(function (response) {
		_.set(vm, 'participantProgramData.status', 'success');

		vm.participantProgramData.programs = response;
		// If there's only one program, pre-select it.
		if (_.size(response) === 1) {
			var programId = _.get(response, '[0].programID');
			_.set(vm, 'educationProfile.programID.programID', programId);
			programService.getProgram(programId).then(function (response) {
				_.set(vm, 'educationProfile.programID.programAccreditingBodyCollection', _.get(response, 'programAccreditingBodyCollection'));
			});
		}

	}, function (errorResponse) {
		vm.participantProgramData.status = 'error';
		vm.participantProgramData.message = _.get(errorResponse, 'data.message');
		vm.participantProgramData.programs = [];
	});

	participantService.getParticipantSupervisors(vm.participantId).then(function (response) {
		vm.status = 'success';
		vm.supervisorsResponse = response;
		if (vm.supervisorsResponse.levelOneSupervisor) {
			vm.levelOneSupervisor = vm.supervisorsResponse.levelOneSupervisor;
		}
		if (vm.supervisorsResponse.levelTwoSupervisor) {
			vm.levelTwoSupervisor = vm.supervisorsResponse.levelTwoSupervisor;
		}
	}, function (errorResponse) {
		vm.status = 'error';
		vm.errorMessage = _.get(errorResponse, 'data.message');
	});

	var handleProgramChangeLoading = function (promiseArray) {
		$q.all(promiseArray).then(function (response) {
			vm.participantProgramData.status = 'loaded';
		}, function (errorResponse) {
			vm.participantProgramData.status = 'error';
			vm.participantProgramData.message = _.get(errorResponse, 'data.message');
		});
	};

	var retrieveProgramDependentData = function (newProgramId, oldProgramId) {
		if (newProgramId && _.get(vm, 'participantProgramData.programs')) {
			vm.participantProgramData.status = 'loading';
			// if it's not the initial load, reset form data that depend on a specific program
			if (oldProgramId) {
				vm.educationProfile = _.omit(vm.educationProfile, ['degreeID', 'fieldOfStudyID']);
			}

			generalContentService.findByComponent(contentConstants.component.applicationStep2, clientId, newProgramId).then(function (response) {
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
			});
			handleProgramChangeLoading([degreeObjectivesPromise, fieldsOfStudyPromise, programAccredPromise]);
		}
	};

	vm.isSelectedUserSupervisor = function () {
		if (utilService.isClientAdmin() && vm.participantId !== storageService.get('user.userDetails.participantId')) {
			return (vm.profileData.user.userTypeID === constants.userType.supervisor);
		} else {
			return utilService.isSupervisor();
		}
	};
	participantService.getCurrentEducationalProfile(vm.participantId).then(function (response) {
		var selectedProgramId = _.get(vm, 'educationProfile.programID.programID');
		// we need to wait for programDataPromise to be resolved to get the list of programs to pre-select the program properly
		vm.educationProfile = response;

		if (selectedProgramId) {
			// If there's a previously selected program start with radio checked.
			_.set(vm, 'educationProfile.programID.programID', selectedProgramId);
		}

		// If there is no previously existing provider data, start with provider search open.
		var showSearch = !_.get(vm, 'educationProfile.providerID');
		educationProvidersService.setEditing(showSearch);

		programDataPromise.then(function () {
			vm.participantProgramData.status = 'loaded';
			retrieveProgramDependentData(_.get(response, 'programID.programID'));
		});
	});
	// watch for selectedProgram changes, and re-make the service calls that depend on programId
	$scope.$watch(angular.bind(vm, function () {
		return _.get(vm, 'educationProfile.programID.programID');
	}), retrieveProgramDependentData, true);

	$scope.submitProfileForm = function (profileForm) {
		vm.profileData.status = 'saving';
		vm.profileData.put().then(function (response) {
			vm.profileData.status = 'saveSuccess';
			// Save copy of raw profile data for reset.
			masterProfileData = response.clone();
			vm.profileData = response;
			// Reset form state on successful save.
			profileForm.$setPristine();
			profileForm.$setUntouched();
		}, function (errorResponse) {
			vm.profileData.status = 'error';
			vm.profileData.message = _.get(errorResponse, 'data.message');
		});
	};

	$scope.resetContactForm = function (form) {
		// Have to clear dirty form view values manually
		_.forEach(form, function (value) {
			if (typeof value === 'object' && value.hasOwnProperty('$modelValue') && value.$dirty) {
				value.$viewValue = undefined;
			}
		});

		vm.profileData = masterProfileData.clone();
		form.$setPristine();
		form.$setUntouched();
	};

	$scope.resetEducationForm = function (form) {
		vm.educationProfile = masterProfileData.clone().currentEducationProfile;
		form.$setPristine();
		form.$setUntouched();
	};

	$scope.submitEducationForm = function (educationForm) {
		vm.educationProfile.status = 'saving';
		//This block help to unassign the existing otherCourseOfStudy text value
		if (vm.educationProfile.fieldOfStudyID.courseOfStudyID !== 55) {
			vm.educationProfile.otherCourseOfStudy = null;
		}
		// save() will post or put accordingly
		vm.educationProfile.save().then(function (response) {
			vm.educationProfile.status = 'saveSuccess';
			// Reset form state on successful save.
			educationForm.$setPristine();
			educationForm.$setUntouched();
		});
	};
		
	vm.backToSearchResults = function() {
		$state.go(constants.routes.clientAdmin);
	};

	init();
}]);