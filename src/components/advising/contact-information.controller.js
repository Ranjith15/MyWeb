'use strict';
angular.module('edAssistApp').controller('contactInfoController', ['$scope', '$state', 'constants', 'participantService', 'storageService', '$stateParams', function ($scope, $state, constants, participantService, storageService, $stateParams) {

	var vm = this;
	vm.status = 'submitting';
	vm.userDetails = storageService.get('user.userDetails');
	$scope.scrollToAppointmentTile();

	var stepViewData = {
		stepNumber: 2,
		formName: 'contactInfoForm',
		stepHeader: 'Contact  Information',
		submitButtonName: 'GENERAL.CONTINUE',
	};
	$scope.updateAdvisingScope('stepViewData', stepViewData);

	vm.advisingAppointment = $stateParams.advisingAppointment;

	var submitContactInformationForm = function (form) {
		if (form.$valid) {
			// update any changes to contact info async
			vm.profileData.put();
			if (vm.profileData.preferredPhone === 'Work') {
				vm.advisingAppointment.phoneNumber = vm.profileData.workAddress.phone;
			} else if (vm.profileData.preferredPhone === 'Home') {
				vm.advisingAppointment.phoneNumber = vm.profileData.homeAddress.phone;
			} else {
				vm.advisingAppointment.phoneNumber = vm.profileData.otherPhone;
			}

			if (vm.profileData.preferredEmail === 'Work') {
				vm.advisingAppointment.email = vm.profileData.workAddress.email;
			} else if (vm.profileData.preferredEmail === 'Home') {
				vm.advisingAppointment.email = vm.profileData.homeAddress.email;
			} else {
				vm.advisingAppointment.email = vm.profileData.otherEmail;
			}

			$state.go(constants.routes.appointmentCalendar, {advisingAppointment : vm.advisingAppointment});
		}
	};
	// the form tag is in the parent scope (appointment). We need to attach the submit function to the parent scope to be called.
	$scope.updateAdvisingScope('submitChildForm', submitContactInformationForm);

	$scope.updateAdvisingScope('status', 'loading');
	var participantPromise = participantService.getParticipant(vm.userDetails.participantId).then(function (response) {
		vm.profileData = response;
		vm.profileData.hideAddress = true;
	});
	$scope.handleSaveOrLoadStatus(participantPromise);

}]);

