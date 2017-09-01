'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:clientAdminTicketController
 * @description
 * Main controller for the ticket display. Shows a list of tickets 
 * related to passed in application.
 */
angular.module('edAssistApp').controller('clientAdminTicketController', 
	['$scope', '$stateParams', 'vhdService', '$state', 'constants', 
	function ($scope, $stateParams, vhdService, $state, constants) {

	var vm = this;

	vm.selectedTicketData = {};	
	vm.backToSearchIcon = '<';
	vm.showTicket = 'hide';
	vm.participantName = $stateParams.participantName;
	vm.ticketsList =$stateParams.ticketsList;	
	vm.recordsPerPage = 5;
	vm.displayPages = 3;

	/**
	 * @ngdoc method
	 * @name backToSearch
	 * @methodOf edAssistApp.controller:clientAdminTicketController
	 * @description
	 * Returns the user back to the client admin state.
	 */
	vm.backToSearch = function() {
		$state.go(constants.routes.clientAdmin);
	};

	/**
	 * @ngdoc method
	 * @name ticketDetails
	 * @methodOf edAssistApp.controller:clientAdminTicketController
	 * @description
	 * Displays a popup with additional ticket information.
	 */
	vm.ticketDetails = function (ticketId) {
		vhdService.getTicketDetails(ticketId).then(function (response) {
			vm.selectedTicketData = {
				'ticketId': response.TicketId,
				'ticketNumber' : response.TicketNumber,
				'topic' : response.Topic,
				'subTopic' : response.subTopic,
				'applicationNumber' : response.ApplicationNumber,
				'resolution' : response.Resolution,
				'createdOn' : response.CreatedOn,
				'createdBy' : response.CreatedBy,
				'updatedBy' : response.ModifiedBy,
				'status' : response.Status
			};
			
			vm.showTicket = 'show';
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};
}]);