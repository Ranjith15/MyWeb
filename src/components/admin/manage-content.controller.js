'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:manageContentController
 * @description
 * Main controller for the manage content page. Allows a user to add new content 
 * with conditional fields based on type.
 */
angular.module('edAssistApp').controller('manageContentController',
	['$scope', '$state', 'contentItems','generalContentService', 'emailContentService', 'cacheService', 'clientService', 'contentService', 'utilService', 'fileContentService', 'constants', 'contentConstants', 'orderByFilter', 
	function ($scope, $state, contentItems, generalContentService, emailContentService, cacheService, clientService, contentService, utilService, fileContentService, constants, contentConstants, orderByFilter) {

	var vm = this;
	vm.id = '';
	vm.addContentStatus = 'loading';
	vm.isSuperAdmin = utilService.isSuperAdmin();
	vm.isAdmin = utilService.isAdmin();
	vm.isEndDateValid = true;
	vm.isContentNameValid = true;
	vm.clients = [];
	vm.programs = [];
	vm.components = [];
	vm.names = [];
	vm.globalClient = contentConstants.client.global;
	vm.component = contentConstants.component;
	vm.contentType = contentConstants.contentType;
	vm.toolbarOptions = constants.wysiwigButtons;
	vm.types = contentItems;
	vm.adminRoute = constants.routes.admin;
	vm.webLogo = contentConstants.name.webLogo;
	vm.mobileLogo = contentConstants.name.mobileLogo;
	vm.contentExistsMsg = constants.errors.contentExists;
	vm.noContent = true;

	vm.addContentForm = {
		startDate: new Date()
	};
	vm.endDateOptions = {
		minDate: vm.addContentForm.startDate
	};
	vm.fileUploadModel = {
		uploadUrl : fileContentService.getUploadDocumentsURL(),
		refreshApplicationDocuments: function () {
			cacheService.clearHttpCache();
			$scope.$broadcast('reloadSupportDocuments'); //TODO Fix refresh policy documents
		}
	};

	/**
	 * @ngdoc method
	 * @name addResponse
	 * @methodOf edAssistApp.controller:manageContentController
	 * @param {object} response Service response object
	 * @description
	 * Method for the save response service and redirects back to the
	 * content search page.
	 */
	var addResponse = function(response) {
		cacheService.clearHttpCache();
		$state.go(vm.adminRoute, {contentAdded: true});
	};

	/**
	 * @ngdoc method
	 * @name addError
	 * @methodOf edAssistApp.controller:manageContentController
	 * @param {object} errorResponse Service error response object
	 * @description
	 * Error handling for the add new content service.
	 */
	var addError = function(errorResponse) {
		vm.addContentStatus = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	};

	/**
	 * @ngdoc method
	 * @name initialize
	 * @methodOf edAssistApp.controller:manageContentController
	 * @description
	 * Sets the initial state of the client admin page and loads the prior search criteria
	 * if available.
	 */
	var initialize = function() {
		clientService.getClients().then(function (response) {
			vm.addContentStatus = 'success';			
			vm.clients = orderByFilter(response.plain(), 'clientName', false);			
			if (vm.isSuperAdmin) {
				vm.clients.unshift({clientId: 'global', clientName: 'Global'});
			}
		}, function (errorResponse) {
			vm.addContentStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name onClientChange
	 * @methodOf edAssistApp.controller:manageContentController
	 * @description
	 * The event handler will catch any change to the client field and 
	 * retrieve all programs associated with that client.
	 */
	vm.onClientChange = function () {
		vm.addContentForm.program = '';
		if (vm.addContentForm.client !== contentConstants.client.global) {
			clientService.getProgramsByClient(vm.addContentForm.client).then(function (response) {				
				vm.programs = orderByFilter(response.plain(), 'programName', false);
				vm.programs.unshift({programID: contentConstants.program.clientDefault, programName: 'Client Default'});
			}, function (errorResponse) {
				vm.addContentStatus = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});
		}
	};

	/**
	 * @ngdoc method
	 * @name onNameChange
	 * @methodOf edAssistApp.controller:manageContentController
	 * @description
	 * The event handler will catch any change to the name field and 
	 * test to see if any names exist with the user entered data.
	 */
	vm.onNameChange = function() {
		vm.isContentNameValid = !vm.names.some(function(name) {
			return vm.addContentForm.name.toUpperCase() === name.toUpperCase();
		});
	};

	/**
	 * @ngdoc method
	 * @name startDateChange
	 * @methodOf edAssistApp.controller:manageContentController
	 * @description
	 * The event handler will set the minimum date for the end date field and check
	 * to make sure its value is not less than the start date.
	 */
	vm.startDateChange = function() {
		vm.endDateOptions.minDate = vm.addContentForm.startDate;

		if (vm.addContentForm.endDate && (vm.addContentForm.endDate < vm.addContentForm.startDate)) {
			vm.isToDateValid = false;
			vm.addContentForm.endDate = null;
		} else {
			vm.isEndDateValid = true;
		}
	};
	
	/**
	 * @ngdoc method
	 * @name endDateChange
	 * @methodOf edAssistApp.controller:manageContentController
	 * @description
	 * The event handler will catch any user entered fields start date and set the end date to blank 
	 * if its greated than the start date.
	 */
	vm.endDateChange = function() {
		if (vm.addContentForm.startDate && (vm.addContentForm.endDate < vm.addContentForm.startDate)) {
			vm.isEndDateValid = false;
			vm.addContentForm.endDate = null;
		} else {
			vm.isEndDateValid = true;
		}
	};
	
	/**
	 * @ngdoc method
	 * @name cancel
	 * @methodOf edAssistApp.controller:manageContentController
	 * @description
	 * Clears form data and redirects back to the content search page.
	 */
	vm.cancel = function () {
		vm.addContentForm = {};
		$state.go(vm.adminRoute);
	};

	/**
	 * @ngdoc method
	 * @name addContent
	 * @methodOf edAssistApp.controller:manageContentController
	 * @param {object} addContentForm Form object used to test for required
	 * fields before submission
	 * @description
	 * Event handler for the add content button. Saves the data and 
	 * redirects back to the content search page.
	 */
	vm.addContent = function (addContentForm) {
		if (addContentForm.$valid) {
			vm.addContentStatus = 'loading';			
			if (!vm.addContentForm.endDate && vm.addContentForm.type !== contentConstants.contentType.email) {
				vm.addContentForm.endDate = new Date(9999, 11, 31);
			}

			if (vm.addContentForm.type === contentConstants.contentType.general) {
				if (vm.id) {
					vm.addContentForm.id = vm.id;
					generalContentService.updateContent(vm.addContentForm).then(addResponse, addError);
				} else {
					if (vm.addContentForm.component === contentConstants.component.clientDocuments) {
						generalContentService.addContent(vm.addContentForm).then(function (response) {
							vm.fileUploadModel.id = response.id;
							vm.addContentStatus = 'success';
							vm.enableDocumentUpload = true;
						}, function (errorResponse) {
							addError(errorResponse);
						});
					} else {
						generalContentService.addContent(vm.addContentForm).then(addResponse, addError);
					}
				}
			} else {
				if (vm.id) {
					vm.addContentForm.id = vm.id;
					emailContentService.updateContent(vm.addContentForm).then(addResponse, addError);
				} else {
					emailContentService.addContent(vm.addContentForm).then(addResponse, addError);
				}
			}
		}
	};

	vm.onContentNameChange =function(){		
		if (vm.addContentForm.type) {
			if (vm.addContentForm.type === contentConstants.contentType.general && vm.addContentForm.component !== contentConstants.component.clientDocuments && vm.addContentForm.component !== contentConstants.component.message &&
				!(vm.addContentForm.name === contentConstants.name.agreement1Text || vm.addContentForm.name === contentConstants.name.agreement2Text || vm.addContentForm.name === contentConstants.name.agreement3Text)) {
				generalContentService.findByName(vm.addContentForm.component, vm.addContentForm.name, vm.addContentForm.client, vm.addContentForm.program, false, false).then(function(response, addError) {
					var content = response.plain();
					vm.noContent = _.isEmpty(content);
				});
			} else if (vm.addContentForm.type === contentConstants.contentType.email) {
				emailContentService.findByName(vm.addContentForm.component, vm.addContentForm.name, vm.addContentForm.client, vm.addContentForm.program, false).then(function(response, addError) {
					var content = response.plain();
					vm.noContent = _.isEmpty(content);
				});
			}
		}
	};

	initialize();
}]);	