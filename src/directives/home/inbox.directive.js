'use strict';

angular.module('edAssistApp').directive('inbox', [ function () {
	var inboxCtrl = ['$scope', '$rootScope', function ($scope, $rootScope) {
		var vm = this;
		vm.toggleInbox = function () {
			$scope.inbox.open = !$scope.inbox.open;
			if ($scope.inbox.open) {
				$scope.inbox.newCount = 0;
				$rootScope.inboxOpened = true;
			}
		};
	}];
	return {
		scope: { inbox: '=data' },
		templateUrl: 'src/directives/home/templates/inbox.template.html',
		controllerAs: 'inboxCtrl',
		controller: inboxCtrl
	};
}]);