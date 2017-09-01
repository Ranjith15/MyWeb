'use strict';

angular.module('edAssistApp').controller('appointmentCalendarController', ['$scope', '$state', '$stateParams', 'constants', 'advisingService', function ($scope, $state, $stateParams, constants, advisingService) {

	var vm = this;
	vm.status = 'success';
	vm.slots = [];
	vm.index = -1; // selected index
	vm.data = null;       // slot data
	vm.dt = new Date();
	$scope.scrollToAppointmentTile();

	vm.datePickerOptions = {
		minDate: new Date(),
		showWeeks: false,
		maxMode: 'day'
	};

	var getCategoryCode = function () {
		if ($stateParams.advisingAppointment && $stateParams.advisingAppointment.appointmentId) {
			if ($stateParams.advisingAppointment.selectedSlot.category === constants.advising.categoryDescription.financialAdvising) {
				$scope.category = constants.advising.categoryDescription.financialAdvising;
				return constants.advising.categoryId.financialCategory;
			} else {
				return constants.advising.categoryId.academicCategory;
			} 
		} else {
			if ($stateParams.advisingAppointment.isReasonForAdvising === constants.advising.categoryId.financialCategoryId1 || $stateParams.advisingAppointment.isReasonForAdvising === constants.advising.categoryId.financialCategoryId2) {
				$scope.category = constants.advising.categoryDescription.financialAdvising;
				return constants.advising.categoryId.financialCategory;
			} else {
				return constants.advising.categoryId.academicCategory;
			}
		}
	};

	vm.reloadSlots = function () {
		vm.status = 'loading';
		vm.index = -1;
		vm.slots = [];
		var dateVar = new Date(vm.dt);
		var offSet = dateVar.getTimezoneOffset() / 60 * (-1);
		advisingService.getAvailableSlots(getCategoryCode(), vm.dt, offSet).then(function (response) {
			vm.slots = response;
			if (!vm.slots.length) {
				vm.status = 'empty';
			} else {
				vm.status = 'success';
			}
		}, function (errorResponse) { 
			vm.slots = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	vm.reloadSlots();

	//Getting the data from review screen on edit button and setting up here
	var setAppointmentDataOnEdit = function () {
		if ($stateParams.advisingAppointment && $stateParams.advisingAppointment.appointmentId) {
			vm.dt = $stateParams.advisingAppointment.selectedSlot.scheduledStart;
			vm.reloadSlots();
		}
	};
	setAppointmentDataOnEdit();

	var stepViewData = {
		stepNumber: 3,
		formName: 'appointmentCalendarForm',
		stepHeader: 'Appointment Calendar',
		submitButtonName: 'GENERAL.CONTINUE'
	};

	$scope.updateAdvisingScope('stepViewData', stepViewData);

	vm.advisingAppointment = $stateParams.advisingAppointment;

	var submitAppointmentCalendarForm = function (form) {
		if (vm.data) {
			vm.advisingAppointment.selectedSlot = vm.data;
			if ($scope.category === constants.advising.categoryDescription.financialAdvising) {
				vm.advisingAppointment.selectedSlot.category = constants.advising.categoryDescription.financialAdvising;
			} else {
				vm.advisingAppointment.selectedSlot.category = constants.advising.categoryDescription.academicAdvising;
			}
			$state.go(constants.routes.reviewAndSubmitAppointment, {advisingAppointment : vm.advisingAppointment});
		} else {
			vm.status = 'error';
			vm.appointmentSlotErrorMessage = constants.errors.appointmentSlotValidationError;
		}
	};

	// the form tag is in the parent scope (advising). We need to attach the submit function to the parent scope to be called.
	$scope.updateAdvisingScope('submitChildForm', submitAppointmentCalendarForm);
	
}]);
