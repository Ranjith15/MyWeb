'use strict';

angular.module('edAssistApp').directive('appointmentBlock', ['$state', 'constants', 'advisingService', function ($state, constants, advisingService) {

	return {
		restrict: 'EA',
		scope: {
			appointment: '='
		},
		templateUrl: 'src/directives/advising/templates/appointment-block.template.html',
		controllerAs: 'appointmentBlockCtrl',
		controller: function ($scope) {
			var vm = this;
			vm.dt = new Date();
			vm.updateAppointment = function (appointment) {
				vm.selectedSlot = {};
				vm.advisingAppointment = {};
				vm.selectedSlot.statusDesc = appointment.statusDesc;
				vm.selectedSlot.scheduledStart = appointment.appointmentDateAndTime;
				vm.selectedSlot.category = appointment.category;
				vm.selectedSlot.advisor = appointment.advisorName;
				vm.advisingAppointment.selectedSlot = vm.selectedSlot;
				vm.advisingAppointment.appointmentId = appointment.id;
				$state.go(constants.routes.reviewAndSubmitAppointment, {advisingAppointment : vm.advisingAppointment});
			};
			vm.confirmAppointmentCancel = function (appointmentId) {
				vm.appointment = {};
				vm.appointment.cancelAppointmentRequest = function () {
					advisingService.cancelAdvisingAppointment(appointmentId).then(function (response) {
						vm.showCancel = 'hide';
						$state.go(constants.routes.employmentEducation, {}, {reload : true});
					}, function (errorResponse) {
						vm.message = _.get(errorResponse, 'data.message');
					});
				};
				vm.showCancel = 'show';
			};
		}
	};
}]);