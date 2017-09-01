'use strict';

angular.module('edAssistApp').controller('reviewAndSubmitAppointmentController', ['$scope', '$state', '$stateParams', '$filter', 'constants', 'advisingService', function ($scope, $state, $stateParams, $filter, constants, advisingService) {

	var vm = this;
	vm.advisingAppointment = $stateParams.advisingAppointment;
	$scope.scrollToAppointmentTile();

	var stepViewData = {
		stepNumber: 4,
		formName: 'submitAppointmentForm',
		stepHeader: 'Submit & Review',
		submitButtonName: 'ADVISING.NAV.SUBMIT',
	};
	$scope.updateAdvisingScope('stepViewData', stepViewData);

	var submitAppointment = function () {
		$scope.updateAdvisingScope('status', 'submitting');
		//if block: update Appointment
		if (vm.advisingAppointment && vm.advisingAppointment.appointmentId) {
				advisingService.updateAdvisingAppointment(vm.advisingAppointment).then(function (response) {
				$scope.$emit('reloadAppointmentList');
				$state.go(constants.routes.updateAppointmentConfirmation, {updateStatus : true});
			}, function (errorResponse) {
				$state.go(constants.routes.updateAppointmentConfirmation, {updateStatus : false});
			});
		}
		//else block: Submit New Appointment
		else {
			vm.advisingAppointment.anticipatedStartDate = $filter('date')(new Date(vm.advisingAppointment.selectedSlot.scheduledStart), 'MM/dd/yyyy');
			advisingService.saveAdvisingAppointment(vm.advisingAppointment).then(function (response) {
				$scope.$emit('reloadAppointmentList');
				$state.go(constants.routes.submitAppointmentConfirmation, {submissionStatus : true});
			}, function (errorResponse) {
				$state.go(constants.routes.submitAppointmentConfirmation, {submissionStatus : false});
			});
		}
	};
	//setting up the appointment data here in review screen on update 
	var setUpdateAppointmentData = function () {
		if (vm.advisingAppointment && vm.advisingAppointment.appointmentId) {
			vm.hideEmploymentEducation = true;
			advisingService.getCurrentAdvisingAppointment(vm.advisingAppointment.appointmentId).then(function (response) {
				if (response) {
					vm.advisingAppointment.email = response.email;
					vm.advisingAppointment.phoneNumber = response.phoneNumber;
				}
			}, function (errorResponse) {
				vm.message = _.get(errorResponse, 'data.message');
			});
		}
	};
	setUpdateAppointmentData();

	$scope.editEmploymentEducation = function (advisingAppointment) {
		$state.go(constants.routes.employmentEducation, {advisingAppointment : advisingAppointment});
	};

	$scope.editAppointmentSlot = function (advisingAppointment) {
		$state.go(constants.routes.appointmentCalendar, {advisingAppointment : advisingAppointment});
	};

	$scope.updateAdvisingScope('submitChildForm', submitAppointment);
}]);

