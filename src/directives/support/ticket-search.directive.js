'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:ticketSearch
 * @restrict 'EA'
 * @scope
 * @param {object} onSearchClick Callback function for the on search click. Allows
 * the implamenting page to get a result of what the user selected for search
 * criteria.
 * @restrict E
 * @description
 * Form directive used to capture search criteria based on user input. The directive
 * calls to an output method once the search button has been clicked to expose and 
 * object for selected search criteria.
 * @returns {object} Returns the ticket search directive configuration.
**/
angular.module('edAssistApp').directive('ticketSearch', [function() {

	/**
	 * @ngdoc controller
	 * @name edAssistApp.controller:ticketSearchCtrl
	 * @description
	 * Controller for the ticket search directive. Allows for a user to input
	 * search critea and exposes it to a callback handler on search click.
	 */
	var ticketSearchCtrl = ['$scope', 'vhdService', function ($scope, vhdService) {
		var vm = this;
		var defaultStatusValue = '';
		
		vm.isToDateValid = true;
		vm.missingField = false;
		vm.ticketSearchModel = {};
		vm.ticketStatuses = [];
		vm.createdToOptions = {
			minDate: vm.ticketSearchModel.createdTo
		};

		/**
		 * @ngdoc method
		 * @name isOneFieldPopulated
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Checks the input model to make sure the user has entered atleast one value.
		 * If the model is empty an error message is displayed to the ui.
		 */
		var isOneFieldPopulated = function() {

			for (var property in vm.ticketSearchModel) {
				if (vm.ticketSearchModel.hasOwnProperty(property)) {
					if (vm.ticketSearchModel[property]){
						return true;
					}
				}
			}

			vm.missingField = true;
			return false;
		};

		//Call to fill the ticket status dropdown
		vhdService.getTicketStatuses().then(function(response) {
			vm.ticketStatuses = response;
			vm.ticketSearchModel.statusId = defaultStatusValue;
		}, function (errorResponse) {
			vm.contactUsStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});

		/**
		 * @ngdoc method
		 * @name fromDateChange
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Event handler for a selection change on the created from date field.
		 * The event handler will set the minimum date for the to date field and check
		 * to make sure its value is not less than the from date.
		 */
		vm.fromDateChange = function() {
			vm.createdToOptions.minDate = vm.ticketSearchModel.createdFrom;

			if (vm.ticketSearchModel.createdTo && (vm.ticketSearchModel.createdTo < vm.ticketSearchModel.createdFrom)) {
				vm.isToDateValid = false;
				vm.ticketSearchModel.createdTo = null;
			} else {
				vm.isToDateValid = true;
			}
		};

		/**
		 * @ngdoc method
		 * @name toDateChange
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Event handler for a selection change on the created to date field.
		 * The event handler will catch any user entered fields to and set the created date to blank 
		 * if its greated than the from date.
		 */
		vm.toDateChange = function() {
			if (vm.ticketSearchModel.createdTo && (vm.ticketSearchModel.createdTo < vm.ticketSearchModel.createdFrom)) {
				vm.isToDateValid = false;
				vm.ticketSearchModel.createdTo = null;
			} else {
				vm.isToDateValid = true;
			}
		};

		/**
		 * @ngdoc method
		 * @name ticketSearch
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Checks the validity of the form and then fires the onSearchClicked callback 
		 * method with the ticket search model.
		 */
		vm.ticketSearch = function(ticketSearchForm) {
			ticketSearchForm.$setSubmitted();
			if (ticketSearchForm.$valid && isOneFieldPopulated()) {
				$scope.onSearchClick({ ticketSearchData: vm.ticketSearchModel });
			}
		};

		/**
		 * @ngdoc method
		 * @name clearTicketSearch
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Clears the form data and fires the onClearTicketSearch callback.
		 */
		vm.clearTicketSearch = function() {
			vm.missingField = false;
			vm.ticketSearchModel = {};
			vm.ticketSearchModel.statusId = defaultStatusValue;
			$scope.onClearTicketSearch();
		};
	}];

	var ticketSearchDirective = {
		restrict: 'EA',
		replace: true,
		scope: {
			onSearchClick: '&',
			onClearTicketSearch: '&'
		},
		templateUrl: 'src/directives/support/templates/ticket-search.template.html',
		controllerAs: 'ticketSearchCtrl',
		controller: ticketSearchCtrl
	};

	return ticketSearchDirective;
}]);