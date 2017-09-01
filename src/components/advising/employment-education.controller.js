'use strict';

angular.module('edAssistApp').controller('employmentEducationController', ['$scope', '$state', 'constants', 'advisingService', '$stateParams', '$location', '$anchorScroll', function ($scope, $state, constants, advisingService, $stateParams, $location, $anchorScroll) {

	var vm = this;
	vm.status = 'submitting';

	var stepViewData = {
		stepNumber: 1,
		formName: 'employmentEducationForm',
		stepHeader: 'Employment & Education',
		submitButtonName: 'GENERAL.CONTINUE',
	};

	var categoryMapping = {
		academic: 1,
		financial: 2
	};

	var getCategoryFromReason = function (reasonId) {
		var reason = _.find(vm.isReasonForAdvisingList, ['value', reasonId]);
		if (reason && reason.display) {
			var categoryName = _.first(_.words(reason.display));
			if (_.isString(categoryName)) {
				return categoryMapping[categoryName.toLowerCase()];
			}
		}
	};

	$scope.$watch(angular.bind(vm, function () {
		return _.get(vm, 'employmentEducationForm.isReasonForAdvising');
	}), function (newReasonId, oldReasonId) {
		if (newReasonId !== oldReasonId) {
			vm.employmentEducationForm.category = getCategoryFromReason(newReasonId);
		}
	});

	$scope.updateAdvisingScope('stepViewData', stepViewData);

	vm.advisingAppointment = {};
	vm.employmentEducationForm = {};

	var setDescriptions = function () {
		if (vm.isReasonForAdvisingList.length) {
			vm.employmentEducationForm.isReasonForAdvisingDescription = _.find(vm.isReasonForAdvisingList, {'value' : vm.employmentEducationForm.isReasonForAdvising}).display;
		}
		if (vm.highestLvlOfEducationList.length) {
			vm.employmentEducationForm.highestLevelOfEducationDescription = _.find(vm.highestLvlOfEducationList, {'value' : vm.employmentEducationForm.highestLevelOfEducation}).display;
		}
		if (vm.typeOfDegreeList.length) {
			vm.employmentEducationForm.typeOfDegreeDescription = _.find(vm.typeOfDegreeList, {'value' : vm.employmentEducationForm.typeOfDegree}).display;
		}
		if (vm.whereRuInProcessList.length) {
			vm.employmentEducationForm.whereAreYouInProcessDescription = _.find(vm.whereRuInProcessList, {'value' : vm.employmentEducationForm.whereAreYouInProcess}).display;
		}
		if (vm.noOfYrsInCPositionList.length) {
			vm.employmentEducationForm.noOfYearsInCurrentPositionDescription = _.find(vm.noOfYrsInCPositionList, {'value' : vm.employmentEducationForm.noOfYearsInCurrentPosition}).display;
		}
		if (vm.yrsOfProfExpList.length) {
			vm.employmentEducationForm.yearsOfProfessionalExpDescription = _.find(vm.yrsOfProfExpList, {'value' : vm.employmentEducationForm.yearsOfProfessionalExp}).display;
		}
		if (vm.yrsWithCurEmployerList.length) {
			vm.employmentEducationForm.yearsWithCurrentEmployerDescription = _.find(vm.yrsWithCurEmployerList, {'value' : vm.employmentEducationForm.yearsWithCurrentEmployer}).display;
		}
		if (vm.currentEmpStatusList.length) {
			vm.employmentEducationForm.currentEmpStatusDescription = _.find(vm.currentEmpStatusList, {'value' : vm.employmentEducationForm.currentEmpStatus}).display;
		}
	};

	var submitEmploymentEducationForm = function (form) {
		if (form.$valid) {
			setDescriptions();
			$state.go(constants.routes.scheduleContactInformation, {advisingAppointment : vm.employmentEducationForm});
		} else {
			vm.status = 'error';
		}
	};
	// the form tag is in the parent scope (appointment). We need to attach the sunmit function to the parent scope to be called.
	$scope.updateAdvisingScope('submitChildForm', submitEmploymentEducationForm);

	function getReferenceData() {
		advisingService.getReferenceData(constants.referenceData.rfsaofs).then(function (isReasonForAdvisingList) {
			vm.isReasonForAdvisingList = isReasonForAdvisingList;
		});
		advisingService.getReferenceData(constants.referenceData.hloee).then(function (highestLvlOfEducationList) {
			vm.highestLvlOfEducationList = highestLvlOfEducationList;
		});
		advisingService.getReferenceData(constants.referenceData.loeaycs).then(function (typeOfDegreeList) {
			vm.typeOfDegreeList = typeOfDegreeList;
		});
		advisingService.getReferenceData(constants.referenceData.iwayitp).then(function (whereRuInProcessList) {
			vm.whereRuInProcessList = whereRuInProcessList;
		});
		advisingService.getReferenceData(constants.referenceData.noyicp).then(function (noOfYrsInCPositionList) {
			vm.noOfYrsInCPositionList = noOfYrsInCPositionList;
		});
		advisingService.getReferenceData(constants.referenceData.yope).then(function (yrsOfProfExpList) {
			vm.yrsOfProfExpList = yrsOfProfExpList;
		});
		advisingService.getReferenceData(constants.referenceData.ywce).then(function (yrsWithCurEmployerList) {
			vm.yrsWithCurEmployerList = yrsWithCurEmployerList;
		});
		advisingService.getReferenceData(constants.referenceData.ces).then(function (currentEmpStatusList) {
			vm.currentEmpStatusList = currentEmpStatusList;
		});
	}
	getReferenceData();

	//Getting the data from review screen on edit button and setting up here
	var setEmploymentEducationDataOnEdit = function () {
		if ($stateParams.advisingAppointment) {
			vm.employmentEducationForm = $stateParams.advisingAppointment;
			$location.hash('appointmentHeader');
			$anchorScroll();
		}
	};
	setEmploymentEducationDataOnEdit();
}]);



