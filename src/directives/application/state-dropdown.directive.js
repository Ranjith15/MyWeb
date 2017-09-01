'use strict';

angular.module('edAssistApp').directive('stateDropdown', function () {
	return {
		restrict: 'E',
		templateUrl: 'src/directives/application/templates/state-dropdown.html',
		replace: true,
		scope: true,

		link: function ($scope, element, attributes) {
			$scope.emptyName = attributes.emptyname || 'Select State';
		},

		controller: [ '$scope', function ($scope) {
			$scope.selectedState = '';
			
			$scope.stateAbbrevs = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 
			'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH',
			'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT',
			'WA', 'WI', 'WV', 'WY'];
		}]

	};
});
