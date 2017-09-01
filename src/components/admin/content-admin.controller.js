'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:adminController
 * @description
 * Main controller for the content search page. Allows a user to search all content 
 * within the system.
 */
angular.module('edAssistApp').controller('adminController', 
	['$scope', '$state', '$translate', '$stateParams', 'contentTypes', 'clients', 'generalContentService', 'emailContentService', 'contentService', 'fileContentService', 'clientService', 'cacheService', 'utilService', 'constants', 'contentConstants', 'propagationService', 'orderByFilter',
	function ($scope, $state, $translate, $stateParams, contentTypes, clients, generalContentService, emailContentService, contentService, fileContentService, clientService, cacheService, utilService, constants, contentConstants, propagationService, orderByFilter) {

	var vm = this;

	vm.isSuperAdmin = utilService.isSuperAdmin();
	vm.adminStatus = 'loading';
	vm.addContentForm = {};
	vm.component = contentConstants.component;
	vm.contentType = contentConstants.contentType;
	vm.types = contentTypes;
	vm.programs = [];
	vm.components = [];
	vm.names = [];
	vm.clients = clients;
	vm.contentSearchStatus = 'init';
	vm.showSearchContent = false;
	vm.generalContents = [];
	vm.isSearchInProgress = false;
	vm.showDeletePanel = 'hide';
	vm.selectedContentData = {};
	vm.saveSuccess = false;
	vm.deleteSuccess = false;
	vm.addSuccess = $stateParams.contentAdded;
	vm.toolbarOptions = constants.wysiwigButtons;
	vm.missingField = false;
	vm.selectedPageCount = 10;
	vm.webLogo = contentConstants.name.webLogo;
	vm.mobileLogo = contentConstants.name.mobileLogo;
	vm.showPropagatePanel = 'hide';
	vm.contentSearch = {
		client: 'global'
	};

	/**
	 * @ngdoc method
	 * @name setFormState
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Boolean to identify if the search service is in progress.
	 * Boolean (isContentPublished) help to append dynamic icon class.
	 */
	var setFormState = function () {
		vm.isSearchInProgress = false;
		vm.generalContents = _.map(vm.generalContents, function(element) { 
			return _.extend({}, element, {isContentPublished:false});
		});
	};

	/**
	 * @ngdoc method
	 * @name serviceError
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} errorResponse Error response object
	 * @description
	 * Error response function for service calls.
	 */
	var serviceError = function(errorResponse) {
		vm.adminStatus = 'error';
		vm.contentSearchStatus = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	};

	var getContentPropagationCount = function(clientId) {
		contentService.propagateContentCount(vm.contentSearch.client).then(function(response){
			vm.contentPropagationCount = response;
		}, serviceError);
	};

	/**
	 * @ngdoc method
	 * @name searchResponse
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} response Service response object
	 * @description
	 * Search service response function. Sets the form state 
	 * back to avaliable and displays the search results.
	 */
	var searchResponse = function(response) {
		var responseObject = response.plain();
		var responseArray = (_.isArray(responseObject) ? responseObject : [responseObject]);

		vm.showSearchContent = true;
		vm.contentSearchStatus = 'success';
		vm.generalContents = _.map(responseArray, function(element) {
			return _.extend({}, element, {type: vm.contentSearch.type});
		});
		$scope.$broadcast('reloadSupportDocuments', vm.generalContents); 
	};

	/**
	 * @ngdoc method
	 * @name searchContent
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Calls the search services with user defined values and displays the available
	 * results
	 */
	var searchContent = function() {
		vm.contentSearchStatus = 'loading';
		vm.generalContents = [];
		vm.isSearchInProgress = true;

		if (!vm.contentSearch.type) {
			if (!vm.contentSearch.program) {
				contentService.findByClient(vm.contentSearch.client).then(function(response){
					vm.generalContents = _.get(response, 'emailContentDTOList').concat(_.get(response, 'generalContentDTOList'));
					getContentPropagationCount();
					vm.contentSearchStatus = 'success';
				}, serviceError)
				.finally(setFormState);
			} else {				
				contentService.findByProgram(vm.contentSearch.client, vm.contentSearch.program).then(function(response){
					vm.generalContents = _.get(response, 'emailContentDTOList').concat(_.get(response, 'generalContentDTOList'));
					vm.contentSearchStatus = 'success';
				}, serviceError)
				.finally(setFormState);
			}
		} else {
			if (vm.contentSearch.type === contentConstants.contentType.general) {
				if(!vm.contentSearch.component) {
					generalContentService.findByClient(vm.contentSearch.client)
						.then(searchResponse, serviceError)
						.finally(setFormState);
				} else if (vm.contentSearch.name) {
					generalContentService.findByName(vm.contentSearch.component, vm.contentSearch.name, vm.contentSearch.client, vm.contentSearch.program, false)
						.then(searchResponse, serviceError)
						.finally(setFormState);
				} else {
					generalContentService.findByComponent(vm.contentSearch.component, vm.contentSearch.client, vm.contentSearch.program, false)
						.then(searchResponse, serviceError)
						.finally(setFormState);
				}
			} else {
				if(!vm.contentSearch.component) {
					emailContentService.findByClient(vm.contentSearch.client)
						.then(searchResponse, serviceError)
						.finally(setFormState);
				} else if (vm.contentSearch.name) {
					emailContentService.findByName(vm.contentSearch.component, vm.contentSearch.name, vm.contentSearch.client, vm.contentSearch.program)
						.then(searchResponse, serviceError)
						.finally(setFormState);
				} else {
					emailContentService.findByComponent(vm.contentSearch.component, vm.contentSearch.client, vm.contentSearch.program)
						.then(searchResponse, serviceError)
						.finally(setFormState);
				}
			}
		}
	};

	/**
	 * @ngdoc method
	 * @name saveResponse
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} response Service response object
	 * @description
	 * Save function used for content editing. When a user clicks on a row a 
	 * modal is displayed allowing them to edit content properties
	 */
	var saveResponse = function(response) {
		vm.contentSearchStatus = 'saved';
		cacheService.clearHttpCache();
		searchContent();
		vm.saveSuccess = true;
	};

	/**
	 * @ngdoc method
	 * @name deleteSuccess
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Delete function for the confirmation modal displayed when a user
	 * clicks the trash can. The delete function is available for all users
	 * except for on global content which is locked down to super users
	 */
	var deleteSuccess = function () {
		vm.contentSearchStatus = 'deleted';
		vm.deleteSuccess = true;
		cacheService.clearHttpCache();
		searchContent();
	};

	/**
	 * @ngdoc method
	 * @name initialize
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Sets the initial state of the content admin page and loads types and clients
	 */
	var initialize = function() {
		vm.postfix = '/* @echo envPostfix */';
		if (vm.postfix === '-uat' || vm.postfix === '') {
			if (vm.isSuperAdmin) {
				vm.updateAccess = true;
			} else {
				vm.updateAccess = false;
			}
		} else {
			vm.updateAccess = true;
		}
		vm.clients = orderByFilter(vm.clients, 'clientName', false);
		vm.clients.unshift({clientId: 'global', clientName: 'Global Content'});
		searchContent();
		vm.adminStatus = 'success';
	};

	/**
	 * @ngdoc method
	 * @name onClientChange
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * The event handler will catch any change to the client field and 
	 * retrieve all programs associated with that client.
	 */
	vm.onClientChange = function () {
		vm.contentSearch.program = '';
		getContentPropagationCount();
		if (vm.contentSearch.client !== contentConstants.client.global) {
			vm.adminStatus = 'loading';
			clientService.getProgramsByClient(vm.contentSearch.client).then(function (response) {				
				vm.programs = orderByFilter(response.plain(), 'programName', false);
				vm.programs.unshift({programID: contentConstants.program.clientDefault, programName: 'Client Default'});
				vm.adminStatus = 'success';
			}, function (errorResponse) {
				vm.adminStatus = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});
		}
	};

	/**
	 * @ngdoc method
	 * @name onTypeChange
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * The event handler will catch any any change to type and search for component
	 * keys associated with the type.
	 */
	vm.onTypeChange = function () {
		vm.adminStatus = 'loading';

		contentService.findComponentKeys(vm.contentSearch.type).then(function (response) {
			vm.adminStatus = 'success';
			vm.components = response.plain();
		}, function (errorResponse) {
			vm.adminStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name onComponentChange
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * The event handler will catch any change to the component field and 
	 * search for all names associated with the component.
	 */
	vm.onComponentChange = function () {
		vm.adminStatus = 'loading';

		contentService.findNameKeys(vm.contentSearch.type, vm.contentSearch.component).then(function (response) {
			vm.names = response.plain();
			vm.adminStatus = 'success';
		}, serviceError);
	};

	/**
	 * @ngdoc method
	 * @name onSearchClick
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} addContentForm Form object used to test for required
	 * fields before submission
	 * @description
	 * Event handler for the search content button. Calls the search service if 
	 * the form is valid.
	 */
	vm.onSearchClick = function () {
		if (!_.isEmpty(vm.contentSearch)) {
			vm.missingField = false;
			searchContent();
		} else {
			vm.missingField = true;
		}
	};

	/**
	 * @ngdoc method
	 * @name saveContent
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} content Selected content item from the data grid
	 * @description
	 * Saves all content changes from the edit modal.
	 */
	vm.saveContent = function (content) {
		vm.contentSearchStatus = 'loading';

		if (content.type === contentConstants.contentType.general) {
			generalContentService.updateContent(content).then(saveResponse, serviceError);
		} else {
			emailContentService.updateContent(content).then(saveResponse, serviceError);
		}
	};

	/**
	 * @ngdoc method
	 * @name manageContent
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Redirects to the new content page.
	 */
	vm.manageContent = function () {
		$state.go(constants.routes.manageContent);
	};

	/**
	 * @ngdoc method
	 * @name deleteContent
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} id Content id that realtes back to the clicked 
	 * on item in the data grid
	 * @description
	 * Deletes content based on content selected.
	 */
	vm.deleteContent = function (content) {
		vm.contentSearchStatus = 'loading';
		if (!_.isEmpty(content.type)) {
			if (content.type === contentConstants.contentType.general) {
				generalContentService.deleteContent(content.id).then(deleteSuccess, serviceError);
			} else if (content.type === contentConstants.contentType.email) {
				emailContentService.deleteContent(content.id).then(deleteSuccess, serviceError);
			} else {
				serviceError();
			}
		} else {
			serviceError();
		}
	};

	/**
	 * @ngdoc method
	 * @name deleteClick
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} id Content id that realtes back to the clicked 
	 * on item in the data grid
	 * @description
	 * Sets the modal information for use in the confirmation window
	 */
	vm.deleteClick = function(content) {
		var modalBody = (content.client !== contentConstants.client.global ? $translate.instant('MODALS.DELETE_CONTENT.BODY') : $translate.instant('MODALS.DELETE_CONTENT.GLOBAL_BODY'));

		vm.selectedContentData = {
			model: {content: content},
			modalHeader: $translate.instant('MODALS.DELETE_CONTENT.HEADER'),
			modalBody: modalBody,
			modalSaveText: $translate.instant('GENERAL.OK'),
			modalCancelText: $translate.instant('GENERAL.CANCEL'),
			onDeleteClicked: function(model) {
				vm.showDeletePanel = 'hide';
				vm.deleteContent(model.content);
			}
		};

		vm.showDeletePanel = 'show';
	};

	/**
	 * @ngdoc method
	 * @name editContent
	 * @methodOf edAssistApp.controller:adminController
	 * @param {object} content Selected content item from the data grid
	 * @description
	 * Sets the modal information for use in the edit content window
	 */
	vm.editContent = function (content) {

		if (!content.type && vm.contentSearch.type) {
			content.type = vm.contentSearch.type;
		}

		vm.selectedContentData = {
			model: {
				content: content,
				isSuperAdmin: vm.isSuperAdmin,
				updateAccess: vm.updateAccess,
				component: vm.component,
				contentType: vm.contentType,
				toolbarOptions: vm.toolbarOptions,
				webLogo: vm.webLogo,
				mobileLogo: vm.mobileLogo,
				fileUploadModel: {
					id : content.id,
					fileId : content.fileId,
					uploadUrl : fileContentService.getUploadDocumentsURL(),
					refreshApplicationDocuments: function () {
						cacheService.clearHttpCache();
						searchContent();
					}
				}
			},
			deleteContent: function (contentId) {
				vm.showEditPanel = 'hide';
				vm.deleteContent(contentId);
			},
			updateContent: function (content) {
				vm.showEditPanel = 'hide';
				vm.saveContent(content);
			}
		};

		vm.showEditPanel = 'show';
	};

	/**
	 * @ngdoc method
	 * @name clearSearch
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Resets the form back to its initial state.
	 */
	vm.clearSearch = function () {
		vm.contentSearchStatus = 'init';
		vm.components = [];
		vm.names = [];
		vm.generalContents = [];
		vm.contentSearch = {};
		vm.showSearchContent = false;
		vm.missingField = false;
		vm.selectedPageCount = 10;
		setFormState();
	};

	/**
	 * @ngdoc method
	 * @name closeSuccessAlert
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Hides the content save alert
	 */
	vm.closeSuccessAlert = function() {
		vm.saveSuccess = false;
	};

	/**
	 * @ngdoc method
	 * @name closeDeleteAlert
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Hides the content delete alert
	 */
	vm.closeDeleteAlert = function() {
		vm.deleteSuccess = false;
	};

	/**
	 * @ngdoc method
	 * @name closeAddAlert
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Hides the content added alert
	 */
	vm.closeAddAlert = function() {
		vm.addSuccess = false;
	};

	/**
	 * @ngdoc method
	 * @name propagateGeneralContent
	 * @methodOf edAssistApp.controller:adminController
	 * @description
	 * Propagates the content from lower environment to a higher environment (eg. stg -> uat)
	 */
	vm.propagateClick = function(content) {
		content.isContentPublished = !content.isContentPublished;
		if (content.type === 'general') {
			if (content.component !== 'clientDocuments') {
				propagationService.propagateGeneralContent(content).then(function () {
					cacheService.clearHttpCache();
					searchContent();
				}, serviceError);
			} else {
				propagationService.propagateFileContent(content).then(function () {
					cacheService.clearHttpCache();
					searchContent();
				}, serviceError);
			}
		} else if (content.type === 'email') {
			propagationService.propagateEmailContent(content).then(function() {
				cacheService.clearHttpCache();
				searchContent();
			}, serviceError);
		}
	};

	var propagateClientContent = function(clientId) {
		vm.propagationStatus = 'loading';
		propagationService.propagateClientContent(clientId).then(function (response) {
			vm.propagationStatus = 'success';
		}, function (errorResponse) {
			vm.status = 'error';
			vm.errorMessage = _.get(errorResponse, 'data.message');
		});
	};

	vm.propagateClientContentClick = function () {
		if (vm.contentSearch.client) {
			vm.selectedContentData = {
				model: {id: vm.contentSearch.client},
				modalHeader: $translate.instant('MODALS.DELETE_CONTENT.HEADER'),
				modalBody: $translate.instant('ADMIN.PROPAGATE_CLIENT_CONTENT') + vm.contentSearch.client,
				modalSaveText: $translate.instant('GENERAL.OK'),
				modalCancelText: $translate.instant('GENERAL.CANCEL'),
				onDeleteClicked: function (model) {
					vm.showPropagatePanel = 'hide';
					propagateClientContent(model.id);
				}
			};
			vm.showPropagatePanel = 'show';
		}
	};
	initialize();
}]);