'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:applicationStatusBlock
 * @restrict 'EA'
 * @scope
 * @param {array} applicationStatus The application object to use for display
 * @restrict E
 * @description
 * Displays an application item and allows a user to either select the item for
 * viewing or complete and action such as cancel or submit.
 * @returns {object} Returns the application action block directive configuration
**/
angular.module('edAssistApp').directive('applicationStatusBlock', 
	[
	function() {

	/**
	 * @ngdoc controller
	 * @name edAssistApp.controller:appStatusBlockCtrl
	 * @description
	 * Controller for the application action block directive. Sets the application
	 * status context and element view.
	 */
	var appStatusBlockCtrl = ['utilService', 'constants', function (utilService, constants) {
		var vm = this;
		
		vm.displayStatuses = null;
		vm.status = {};

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf edAssistApp.controller:appStatusBlockCtrl
		 * @description
		 * Sets the initial state of the application status block and relates status to their
		 * header message
		 */
		var initialize = function () {
			var generalItem = _.filter(vm.applicationStatus, {messageSource: {value: constants.applicationStatusTypes.general}});

			if (generalItem.length) {
				vm.displayStatuses = generalItem[0];
				vm.displayStatuses.relatedItems = _.remove(vm.applicationStatus, function (item) {
					return item.messageSource.value !== constants.applicationStatusTypes.general;
				});

				vm.status = utilService.getAppStatus(vm.displayStatuses.statusId);
			}
		};

		vm.getStatus = function(statusCode) {
			return utilService.getAppStatus(statusCode);
		};

		initialize();
	}];

	var appActionBlockDirective = {
		restrict: 'EA',
		replace: true,
		bindToController: true,
		scope: {
			applicationStatus: '=',
			isSupervisor: '=',
		},
		templateUrl: 'src/directives/application/templates/application-status-block.template.html',
		controllerAs: 'appStatusBlockCtrl',
		controller: appStatusBlockCtrl
	};

	return appActionBlockDirective;
}]);