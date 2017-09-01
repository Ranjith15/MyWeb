'use strict';

angular.module('edAssistApp').directive('profileApprover', function () {

    return {
        restrict: 'EA',
        scope: {
            approverModel: '=',
            approverIcon: '@',
            approverLevel: '@'
        },
        templateUrl: 'src/directives/profile/profile-approver.html',
        controllerAs: 'profileApproverCtrl',
        controller: function ($scope) {

            var vm = this;

            vm.icon = $scope.approverIcon;
            vm.level = $scope.approverLevel;
        }
    };
});