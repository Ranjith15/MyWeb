'use strict';

angular.module('edAssistApp').factory('utilService', ['storageService', 'applicationStatuses', 'constants', function (storageService, applicationStatuses, constants) {
	var utilService = {
		getUserType: function() {
			return storageService.get('user.userDetails.userTypeID');
		},
		isSupervisor : function () {
			var userType = storageService.get('user.userDetails.userTypeID');
			return userType === constants.userType.supervisor;
		},
		isParticipant : function () {
			var userType = storageService.get('user.userDetails.userTypeID');
			return userType === constants.userType.participant;
		},
		isClientAdmin : function () {
			var userType = storageService.get('user.userDetails.userTypeID');
			return userType === constants.userType.clientAdmin;
		},
		isSuperAdmin : function () {
			var userType = storageService.get('user.userDetails.userTypeID');
			return userType === constants.userType.superAdmin;
		},
		isAdmin : function () {
			var userType = storageService.get('user.userDetails.userTypeID');
			return userType === constants.userType.admin;
		},
		getAppStatus : function(statusCode) {
			return applicationStatuses.mappings[statusCode] || applicationStatuses.mappings['default'];
 		},
		getPreferredAddress : function (participantInfo, preferredAddressId) {
			if (participantInfo.homeAddress.addressId === preferredAddressId) {
				return participantInfo.homeAddress;
			} else if (participantInfo.workAddress.addressId === preferredAddressId) {
				return participantInfo.workAddress;
			} else if (participantInfo.mailingAddress.addressId === preferredAddressId) {
				return participantInfo.mailingAddress;
			} else {return ''; }
		},
		getPreferredPhone : function (participantInfo) {
			if (participantInfo.preferredPhone === constants.phoneTypes.home) {
				return participantInfo.homeAddress.phone;
			} else if (participantInfo.preferredPhone === constants.phoneTypes.work) {
				return participantInfo.workAddress.phone;
			} else if (participantInfo.preferredPhone === constants.phoneTypes.mail) {
				return participantInfo.mailingAddress.phone;
			} else if (participantInfo.preferredPhone === constants.phoneTypes.other) {
				return participantInfo.otherPhone;
			} else {return ''; }
		},
		getPreferredEmail : function (participantInfo) {
			if (participantInfo.preferredEmail === constants.phoneTypes.home) {
				return participantInfo.homeAddress.email;
			} else if (participantInfo.preferredEmail === constants.phoneTypes.work) {
				return participantInfo.workAddress.email;
			} else if (participantInfo.preferredEmail === constants.phoneTypes.mail) {
				return participantInfo.mailingAddress.email;
			} else if (participantInfo.preferredEmail === constants.phoneTypes.other) {
				return participantInfo.otherEmail;
			} else {return ''; }
		},
		isProduction : function (){
			var postfix = '/* @echo envPostfix */';
			return (postfix === '-uat' || postfix === '');
		}
	};
	return utilService;
}]);