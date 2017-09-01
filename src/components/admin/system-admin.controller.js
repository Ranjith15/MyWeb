'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:systemAdminController
 * @description
 * Main controller for the system admin page. Ability to migrate content from 4.0 to 5 based on client.
 * Ability to search for a list of users
 * List of active 4.0 clients get retrieved on entry
 */
angular.module('edAssistApp').controller('systemAdminController',
	['$translate', 'clientService', 'contentService', 'userService',
	function ($translate, clientService, contentService, userService) {
	
	var vm = this;
	vm.status = '';
	vm.selectedClient = '';
	vm.selectedUserData = {};
	vm.updateSuccess = false;
	vm.searchUser = {
		clientId: '',
		employeeId: '',
		uniqueId: '',
		lastName: '',
		firstName: '',
		participantStatus: '',
		userRole: ''
	};

	/**
	 * @ngdoc method
	 * @name getV4Clients
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @returns {array} list of clients
	 * @description
	 * Retrieve the active 4.0 clients. This will be called on initial load
	 */
	clientService.getV4Clients().then(function (response) {
		vm.clients = response.plain();
	}, function (errorResponse) {
		vm.status = 'error';
		vm.errorMessage = _.get(errorResponse, 'data.message');
	});

	/**
	 * @ngdoc method
	 * @name getUserTypes
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @returns {array} list of usertypes
	 * @description
	 * Retrieve the list of usertypes
	 */
	userService.getUserTypes().then(function (response) {
		vm.userTypes = response.plain();
	}, function (errorResponse) {
		vm.status = 'error';
		vm.errorMessage = _.get(errorResponse, 'data.message');
	});

	/**
	 * @ngdoc method
	 * @name migrateClick
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @description
	 * Pops up a modal to confirm if user wants to migrate for chosen client. Calls migrateClient() if clicked ok
	 */
	vm.migrateClick = function(id) {
		vm.selectedContentData = {
			model: {id: ''},
			modalHeader: $translate.instant('MODALS.MIGRATE_CONTENT.HEADER'),
			modalBody: $translate.instant('MODALS.MIGRATE_CONTENT.BODY'),
			modalSaveText: $translate.instant('GENERAL.OK'),
			modalCancelText: $translate.instant('GENERAL.CANCEL'),
			onDeleteClicked: function() {
				vm.showMigrateConfirm = 'hide';
				vm.migrateClient();
			}
		};

		vm.showMigrateConfirm = 'show';
	};

	/**
	 * @ngdoc method
	 * @name migrateClient
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @description
	 * Migrates content from 4.0 to 5 by the chosen client. This calls the migrateClient 
	 * function in the {@link edAssistApp.service:contentService content service}
	 */
	vm.migrateClient = function () {
		vm.status = 'migrating';
		contentService.migrateClient(vm.selectedClient).then(function (response) {
			vm.status = 'success';
		}, function (errorResponse) {
			vm.status = 'error';
			vm.errorMessage = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name search
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @description
	 * Search for ThinUser based on the searchCriteria
	 */
	vm.search = function () {
		vm.statusSearch = 'searching';
		userService.search(vm.searchUser).then(function (response) {
			vm.statusSearch = 'success';
			vm.users = response.plain();
		}, function (errorResponse) {
			vm.statusSearch = 'error';
			vm.errorMessage = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name saveUser
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @param {object} user selected user from search result
	 * @description
	 * Saves the changed usertype.
	 */
	vm.saveUser = function (user) {
		console.log(user);
		userService.updateUser(user).then(function () {
			vm.showEditPanel = 'hide';
			vm.updateSuccess = true;
		}, function (errorResponse) {
			vm.statusSearch = 'error';
			vm.errorMessage = _.get(errorResponse, 'data.message');
		});

	};

	/**
	 * @ngdoc method
	 * @name editUser
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @param {object} user: the selected user
	 * @param {object} userTypes: list of usertypes from the db
	 * @description
	 * open a popup for editing the usertype pf selected user
	 */
	vm.editUser = function (user, userTypes) {
		vm.selectedUserData = {
			user: user,
			userTypes: userTypes,
			updateUser: function (user) {
				vm.saveUser(user);
			}
		};
		vm.showEditPanel = 'show';
	};

	/**
	 * @ngdoc method
	 * @name closeSuccessAlert
	 * @methodOf edAssistApp.controller:systemAdminController
	 * @description
	 * Hides the content save alert
	 */
	vm.closeSuccessAlert = function() {
		vm.updateSuccess = false;
	};

}]);
