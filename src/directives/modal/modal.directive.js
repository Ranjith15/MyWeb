'use strict';

angular.module('edAssistApp').directive('genericModal', ['$uibModal', function ($uibModal) {

	return {
		restrict: 'A',
		scope: {
			action: '=',
			data: '=',
			modalTitle: '='
		},
		link: function ($scope, $element, attr) {
			var modalInstance;

			$scope.$watch('action', function (action) {

				if (action) {
					$scope.action = '';
					if (action === 'show') {
						modalInstance = $uibModal.open({
							templateUrl: 'src/directives/modal/templates/' + attr.template + '.html',
							controller: 'ModalInstanceCtrl',
							ariaLabelledBy: 'modal-title',
							ariaDescribedBy: 'modal-body',
							controllerAs: '$ctrl',
							scope: $scope,
							size: attr.size || 'md'
						});
					}

					if (action === 'hide') {
						if (modalInstance) {
							modalInstance.dismiss('cancel');
						}
					}
				}
			});
		}
	};
}]);

angular.module('edAssistApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

});