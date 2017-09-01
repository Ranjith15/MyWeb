'use strict';

angular.module('edAssistApp').directive('sectionHeader', function () {

	return {
		restrict: 'EA',
		scope: {},
		templateUrl: 'src/directives/general/section-header.html',
		controllerAs: 'sectionHeaderCtrl',
		bindToController: {
			sectionIcon : '@',
			sectionTitle : '@',
			hasEdit: '=?',
			onEditClick: '&?'
		},
		controller: function () {},
		transclude: true
	};
});
