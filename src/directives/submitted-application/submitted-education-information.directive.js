'use strict';

angular.module('edAssistApp').directive('submittedEducationInformation', function () {

	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/submitted-application/templates/submitted-education-information.template.html',
		controller: function ($scope, generalContentService) {

			$scope.showProgramDetailsModal = function () {
				var programID = _.get($scope.model, 'benefitPeriodID.programID.programID');
				$scope.modalShowing = 'show';
				$scope.getPolicyDocuments(programID);
			};

			$scope.getPolicyDocuments = function (programID) {
				_.set($scope.model, 'documentsStatus', 'loading');
				_.set($scope.model, 'policyDocuments', []);
				generalContentService.getProgramsData(programID).then(function (response) {
					if (response.length > 0) {
						response = response[0];
					}
					var policyDocuments = _.get(response, 'policyDocuments');
					_.set($scope.model, 'policyDocuments', policyDocuments);
					_.set($scope.model, 'documentsStatus', 'success');
				}, function (errorResponse) {
						_.set($scope.model, 'documentsStatus', 'error');
					});
			};
		}
	};
});