'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:adminTable
 * @restrict 'EA'
 * @scope
 * @param {array} contentList An array of data used for the table display.
 * @param {array} clientList An array of clients used to decode values in the 
 * content list.
 * @description
 * Admin content display directive which allows a user to view properties related to
 * content as well as edit, delete, and propagate an item.
 * @returns {object} Returns the admin table directive configuration
**/
angular.module('edAssistApp').directive('adminTable',
	function() {

	/**
	 * @ngdoc controller
	 * @name edAssistApp.controller:adminTableCtrl
	 * @description
	 * Controller for the application action block directive. Sets the application
	 * status context and element view.
	 */
	var adminTableCtrl = ['$scope', '$location', 'utilService', 'propagationService', 'contentConstants', function ($scope, $location, utilService, propagationService, contentConstants) {
		var vm = this;
		var hiddenColumns = ['contentType', 'component'];
		var maxHiddenColumns = 4;

		vm.globalType = contentConstants.client.global;
		vm.isSuperAdmin = utilService.isSuperAdmin();
		vm.isProduction = utilService.isProduction();
		vm.searchText = '';
		vm.contentListDisplay = angular.copy(vm.contentList);
		vm.pageAmounts = [{ value: 10, text: '10' }, { value: 25, text: '25' }, { value: 50, text: '50' }, { value: 'ALL', text: 'All' }];
		vm.selectedPageCount = vm.pageAmounts[0].value;
		vm.recordsPerPage = vm.pageAmounts[0].value;
		vm.displayPages = 3;
		vm.showColumnError = false;
		vm.showNameColumn = true;
		vm.showClientColumn = true;
		vm.showProgramColumn = true;
		vm.showContentTypeColumn = false;
		vm.showContentCategoryColumn = false;
		vm.publishedToolTipStg = contentConstants.propagate.toolTipStg;
		vm.publishedToolTipUat = contentConstants.propagate.toolTipUat;
		vm.dataLength = {
			contentLength: vm.contentList.length
		};

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Sets the initial state of the admin table directive and sets a watch for the 
		 * content items to load the search placeholder.
		 */
		var initialize = function() {
			if (vm.isProduction) {
				if (vm.isSuperAdmin) {
					vm.updateAccess = true;
				} else {
					vm.updateAccess = false;
				}
			} else {
				vm.updateAccess = true;
			}
			$scope.$watch('adminTableCtrl.contentList.length', function(newValue, oldValue) {
				vm.dataLength.contentLength = newValue;
			});
		};

		/**
		 * @ngdoc method
		 * @name getClientName
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Evaluates the list of client data and returns the display name.
		 * @returns {string} Client Name associated with the id.
		*/
		vm.getClientName = function(clientId) {
			var clientIdValue = Number(clientId) || clientId;
			var client = _.find(vm.clientList, ['clientId', clientIdValue]);

			return (client ? client.clientName : clientId);
		};

		/**
		 * @ngdoc method
		 * @name getProgramName
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Evaluates the list of programs data and returns the display name.
		 * @returns {string} Program Name associated with the id.
		 */
		vm.getProgramName = function(programId) {
			var programIdValue = Number(programId) || programId;
			var program = _.find(vm.programList, ['programID', programIdValue]);

			return (program ? program.programName : programId);
		};

		/**
		 * @ngdoc method
		 * @name getIcon
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @param {object} contentItem The specific content item to evaluate for
		 * its icon style.
		 * @description
		 * Gets the class associated with the content item.
		 * @returns {string} Icon class.
		*/
		vm.getIcon = function(contentItem) {
			var iconStyle;

			if (contentItem.client !== contentConstants.client.global && contentItem.program === contentConstants.program.clientDefault) {
				iconStyle = 'content';
			} else if (contentItem.client !== contentConstants.client.global && contentItem.program !== contentConstants.program.clientDefault) {
				iconStyle = 'document';
			} else {
				iconStyle = 'global';
			}

			return iconStyle;
		};
		
		/**
		 * @ngdoc method
		 * @name toggleColumn
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Toggles the view of the selected column between hidden and shown.
		*/
		vm.toggleColumn = function($event, model, column) {
			var columnPosition = hiddenColumns.indexOf(column);

			vm.showColumnError = false;

			if (model && columnPosition > -1) {
				hiddenColumns.splice(columnPosition, 1);
			} else if (hiddenColumns.length < maxHiddenColumns) {
				hiddenColumns.push(column);
			} else {
				$event.preventDefault();
				vm.showColumnError = true;
			}
		};

		/**
		 * @ngdoc method
		 * @name onPageCountChange
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Sets the records per page based on the users selection in the dropdown.
		*/
		vm.onPageCountChange = function () {
			if (vm.selectedPageCount === 'ALL') {
				vm.recordsPerPage = vm.dataLength.contentLength;
			} else {
				vm.recordsPerPage = vm.selectedPageCount;
			}
		};

		/**
		 * @ngdoc method
		 * @name isHidden
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Evaluates an list of hidden columns and searches for the column 
		 * in that list.
		 * @returns {boolean} Is the column hidden.
		*/
		vm.isHidden = function (column) {
			return hiddenColumns.indexOf(column) !== -1;
		};

		/**
		 * @ngdoc method
		 * @name clearSearch
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Resets the search input to blank.
		*/
		vm.clearSearch = function() {
			vm.searchText = '';
		};

		/**
		 * @ngdoc method
		 * @name propagateGeneralContent
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @description
		 * Propagates the content from lower environment to a higher environment (eg. stg -> uat).
		 */
		vm.propagateGeneralContent = function(content) {
			propagationService.propagateGeneralContent(content);
		};

		/**
		 * @ngdoc method
		 * @name sortActions
		 * @methodOf edAssistApp.controller:adminTableCtrl
		 * @param {object} contentItem The content item to be used to evaluate the
		 * sort position.
		 * @return {number} Number representing the sort position of the element.
		 * @description
		 * Evaluates the content item to determin the sort position based on the needsPropagation 
		 * property.
		*/
		vm.sortActions = function (contentItem) {
			if (contentItem.needsPropagation && contentItem.component !== 'clientDocuments') { 
				return 1;
			}
			else if (contentItem.needsPropagation) {
				return 2;
			} else {
				return 3;
			}
		};

		initialize();
	}];
	
	var adminTableDirective = {
		restrict: 'EA',
		replace: true,
		bindToController: true,
		scope: {
			contentList: '=',
			programList: '=',
			clientList: '=',
			contentType: '=',
			onDeleteClick: '&',
			onEditClick: '&',
			onPropagateClick: '&',
			selectedPageCount:'='
		},
		templateUrl: 'src/directives/admin/templates/admin-table.template.html',
		controllerAs: 'adminTableCtrl',
		controller: adminTableCtrl
	};

	return adminTableDirective;
});