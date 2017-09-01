'use strict';

angular.module('edAssistApp').controller('advisingController',
	['$scope', '$sce', 'constants', 'contentConstants', 'generalContentService', 'advisingService', 'storageService',
	function ($scope, $sce, constants, contentConstants, generalContentService, advisingService, storageService) {

	var vm = this;
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	
	vm.loadAdvisingAppointments = function () {
		vm.status = 'loading';
		advisingService.getAdvisingAppointments().then(function (response) {
			vm.status = 'success';
			vm.appointments = response;
			if (vm.appointments.length) {
				_.forEach(vm.appointments, function (appointment, key) {
					appointment.appointmentDateAndTime = appointment.appointment;
					if (appointment.status === constants.advising.appointmentStatus.code.scheduled) {
						appointment.statusDesc = constants.advising.appointmentStatus.description.scheduled;
					} else if (appointment.status === constants.advising.appointmentStatus.code.cancelled) {
						appointment.statusDesc = constants.advising.appointmentStatus.description.cancelled;
					} else if (appointment.status === constants.advising.appointmentStatus.code.open) {
						appointment.statusDesc = constants.advising.appointmentStatus.description.open;
					} else {
						appointment.statusDesc = constants.advising.appointmentStatus.description.closed;
					}
				});
			}
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};
	
	vm.loadAdvisingAppointments();

	$scope.$on('reloadAppointmentList', function(){
		vm.loadAdvisingAppointments();
	});

	generalContentService.findByName(contentConstants.component.advising, contentConstants.name.advisingPageIntro, clientId, '', false).then(function (response) {
		vm.advisingIntroStatus = 'loading';
		if (!_.isEmpty(response)) {
			vm.advisingIntroStatus = 'success';
			vm.advisingIntroContent = $sce.trustAsHtml(_.result(_.find(response, {'name': contentConstants.name.advisingPageIntro}), 'data'));
		}
	}, function (errorResponse) {
		vm.advisingIntroStatus = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	});
}]);