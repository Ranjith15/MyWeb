'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:applicationActionBlock
 * @restrict 'EA'
 * @scope
 * @param {object} application The application object to use for display
 * @param {boolean} isSupervisor Flag to define of the logged in user is a supervisor
 * @param {number} participantId The logged in particpant id.
 * @restrict E
 * @description
 * Displays an application item and allows a user to either select the item for
 * viewing or complete and action such as cancel or submit.
 * @returns {object} Returns the application action block directive configuration
**/
angular.module('edAssistApp').directive('applicationActionBlock', ['storageService', 'utilService', function(storageService, utilService) {

    /**
     * @ngdoc controller
     * @name edAssistApp.controller:appActionBlockCtrl
     * @description
     * Controller for the application action block directive. Sets the application
     * status context and element view.
     */
    var appActionBlockCtrl = ['$scope', '$state', 'constants', function ($scope, $state, constants) {
        var vm = this;
        var statusCode = $scope.application.applicationStatus.applicationStatusCode;

        vm.status = utilService.getAppStatus(statusCode);
        vm.isSupervisor = $scope.isSupervisor;
        vm.showApplicantName = $scope.participantId !== $scope.application.participantId;
    }];

    var appActionBlockDirective = {
        restrict: 'EA',
        replace: true,
        scope: {
            application: '=',
			isSupervisor: '=',
            participantId: '=',
            applicationActionClick: '&'
        },
        templateUrl: 'src/directives/home/templates/application-action-block.template.html',
        controllerAs: 'appActionBlockCtrl',
        controller: appActionBlockCtrl
    };

    return appActionBlockDirective;
}]);