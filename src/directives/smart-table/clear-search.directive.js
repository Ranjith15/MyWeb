'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:stClearSearch
 * @restrict 'A'
 * @description
 * Clear functionality for the smart table component. Allows the search values 
 * and filter to be removed from the table and the page set back to its first page.
 * @returns {object} Returns the clear search directive configuration
**/
angular.module('edAssistApp').directive('stClearSearch', 
	function() {
		var clearSearchDirective = {
			restrict: 'A',
			require: '^stTable',
			link: function (scope, element, attr, ctrl) {
				element.on('click', function() {
					var tableState = ctrl.tableState();

					tableState.search.predicateObject = {};
					tableState.pagination.start = 0;
					ctrl.pipe();
				});
			}
		};

		return clearSearchDirective;
});