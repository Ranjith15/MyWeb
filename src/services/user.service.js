'use strict';

angular.module('edAssistApp').factory('userService',
	['storageService', 'Restangular',
	function (storageService, Restangular) {

	var userService = {
		api: Restangular.service('users'),
		resetPassword: function (resetPasswordObject) {
			return userService.api.one().post('reset-password', resetPasswordObject);
		},
		changePasword: function (userId, changePasswordObject) {
			return userService.api.one(userId).post('change-password', changePasswordObject);
		},
		bookmarkSuccessfulLogin: function (userId) {
			return userService.api.one(userId).post('bookmark-successful-login');
		},
		updateUser: function (userObject) {
			return userService.api.one(userObject.userId).customPUT(userObject);
		},
		search: function (searchUserObject) {
			return userService.api.one().getList('search', {
				clientId: searchUserObject.clientId,
				employeeId: searchUserObject.employeeId,
				uniqueId: searchUserObject.uniqueId,
				firstName: searchUserObject.firstName,
				lastName: searchUserObject.lastName
			});
		},
		getUserTypes: function () {
			return userService.api.one('userTypes').get();
		}
	};

	return userService;
}]);