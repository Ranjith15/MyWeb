'use strict';

angular.module('edAssistApp').directive('radioButton', function() {
  return {
    restrict: 'EA',
    scope: {
      label: '@',
      value: '=?',
      onselect: '&?',
      hasTooltip: '=?',
      modalTemplate: '@?',
      modalAction: '=?',
      modalData: '=?'
    },
    require: {
      parentComp: '^radioGroup'
    },
    controllerAs: 'radioCtrl',
    controller: function() {
      var vm = this;
      vm.modalState = 'hide';

      vm.$onInit = function() {
        vm.id = vm.parentComp.name + vm.parentComp.getNextCount();
      };

      vm.handleChange = function($ev) {
        vm.parentComp.updateSelected(vm.value);
        vm.onselect($ev);
      };

      vm.showModal = function() {
        vm.modalState = 'show';
      };
    },
    bindToController: true,
    templateUrl: 'src/directives/ui/radio.html',
    transclude: true

  };
});
