'use strict';

angular.module('edAssistApp').directive('radioGroup', function() {
  return {
    restrict: 'EA',
    scope: {
      isVertical: '=',
      required: '=?',
      name: '@',
      options: '=?',
      itemModel: '@',
      model: '='
    },
    controllerAs: 'radioGroupCtrl',
    controller: function($scope) {
      var vm = this;

      vm.optsArray = [];
      vm.count = 0;

      vm.getNextCount = function() {
        return ++vm.count;
      };

      $scope.$watch('radioGroupCtrl.model', function(newValue, oldValue) {
        vm.selectedValue = newValue[vm.itemModel];
      });

      vm.updateSelected = function(val) {
        _.set(vm, 'selectedValue', val);
        _.set(vm, ['model', vm.itemModel].join('.') , val);
      };

      vm.$onInit = function() {
        _.forEach(vm.options, function(value) {
          if (typeof value === 'string') {
            vm.optsArray.push({name: value, value: value});
          }
          else {
            vm.optsArray.push(value);
          }
        });
      };
    },
    bindToController: true,
    templateUrl: 'src/directives/ui/radio-group.html',
    transclude: true

  };
});
