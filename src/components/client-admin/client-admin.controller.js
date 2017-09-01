'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:clientAdminController
 * @description
 * Main controller for the admin search page. Will reload prior search criteria 
 * on browser refresh and back button click from the search results.
 */
angular.module('edAssistApp').controller('clientAdminController', 
	['$scope', '$state', 'constants', 'clientAdminData', 'clientAdminService', 'vhdService', 'storageService', 
	function ($scope, $state, constants, clientAdminData, clientAdminService, vhdService, storageService) {

	var vm = this;
	var simpleSearchIcon = '+';
	var advancedSearchIcon = '-';
	var validStates = [constants.routes.clientAdmin, constants.routes.history, constants.routes.clientAdminTicket, constants.routes.profile];
	
	vm.data = {};
	vm.participantTicketsFound = 'hide';
	vm.recordsPerPage = 5;
	vm.totalItems = 0;
	vm.currentPage = 1;
	vm.maxSize = 3;
	vm.clientAdminResults = {};
	vm.participantLoadStatus = '';
	vm.searchInProgress = false;
	vm.missingField = false;
	vm.sortByList = [{'value':'firstName', 'display':'First Name'}, {'value':'lastName', 'display':'Last Name'}, {'value':'userId', 'display':'User ID'}];
	vm.sortBy = '';
	vm.adminSearchModel = {
		isAdvancedSearch: false,
		adminSearchCriteria: {}
	};

	/**
	 * @ngdoc method
	 * @name applnStatus
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Retrieves the application status data.
	 */
	var applnStatus = function () {
		clientAdminService.getApplicationStatus().then(function (response) {
			vm.appStatusList = response;
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name benefitPeriod
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Retrieves the benefit period data.
	 */
	var benefitPeriod = function () {
		clientAdminService.getBenefitPeriod().then(function (response) {
			vm.benefitperiodList = response;
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name searchAdminData
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Retrieves user data based on the forms search criteria.
	 */
	var searchAdminData = function() {
		vm.searchInProgress = true;
		vm.participantLoadStatus = 'loading';
		clientAdminService.getAdminGlobalSearch(vm.adminSearchModel.adminSearchCriteria, vm.sortBy, vm.currentPage, vm.recordsPerPage).then(function (response) {
			vm.participantLoadStatus = 'success';
			vm.clientAdminResults = _.get(response, 'participants');
			vm.totalItems = _.get(response, 'pagination.total');
			vm.searchInProgress = false;
		}, function (errorResponse) {
			vm.participantLoadStatus = 'failure';
			vm.message = _.get(errorResponse, 'data.message');
		}).finally(function(){
			vm.searchInProgress = false;
		});
	};

	/**
	 * @ngdoc method
	 * @name initialize
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Sets the initial state of the client admin page and loads the prior search criteria
	 * if available.
	 */
	var initialize = function() {
		benefitPeriod();
		applnStatus();
		if (clientAdminData) {
			vm.adminSearchModel = clientAdminData;
			searchAdminData();
		}

		vm.advancedSearchIcon = (vm.adminSearchModel.isAdvancedSearch ? advancedSearchIcon : simpleSearchIcon);
	};

	/**
	 * @ngdoc method
	 * @name advancedSearch
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Sets the state of the advanced form section.
	 */
	vm.advancedSearch = function () {
		vm.adminSearchModel.isAdvancedSearch = !vm.adminSearchModel.isAdvancedSearch;
		vm.advancedSearchIcon = (vm.adminSearchModel.isAdvancedSearch ? advancedSearchIcon : simpleSearchIcon);
	};

	/**
	 * @ngdoc method
	 * @name adminSearchClick
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Stores the current search criteria and searchs based on user entered 
	 * criteria.
	 */
	vm.adminSearchClick = function () {
		if (!_.isEmpty(vm.adminSearchModel.adminSearchCriteria)) {
			vm.missingField = false;
			storageService.setWithStates('clientAdminSearchModel', vm.adminSearchModel, validStates);
			searchAdminData();
		} else {
			vm.missingField = true;
		}
	};

	/**
	 * @ngdoc method
	 * @name clearAdminSearch
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Clears the entered search data aswell as the information stored in session.
	 */
	vm.clearAdminSearch = function () {
		storageService.delete('clientAdminSearchModel');
		vm.clientAdminResults = [];
		vm.missingField = false;

		vm.adminSearchModel = {
			isAdvancedSearch: false,
			adminSearchCriteria: {}
		};

		vm.advancedSearchIcon = simpleSearchIcon;
	};

	/**
	 * @ngdoc method
	 * @name benefitPeriod
	 * @methodOf edAssistApp.controller:clientAdminController
	 * @description
	 * Click handler for participant tickets. This method retrieves the ticket list
	 * and validates whether there is atleast one ticket in the dataset.
	 */
	vm.adminTicketSearch = function (participant) {
		vm.participantLoadStatus = 'loading';
		vhdService.getTicketList(participant.participantId).then(function (response) {
			vm.participantLoadStatus = 'success';

			if (response.length !== 0) {
				var participantName = participant.user.firstName + ' ' + participant.user.lastName;
				$state.go(constants.routes.clientAdminTicket, { ticketsList: response, participantName: participantName });
			} else {
				vm.participantTicketsFound = 'show';
			}
		}, function (errorResponse) {
			vm.participantLoadStatus = 'failure';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	initialize();
}]);