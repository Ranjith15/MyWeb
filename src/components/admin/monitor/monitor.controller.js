'use strict';

angular.module('edAssistApp').controller('monitorController', ['monitoringService', 'constants', function (monitoringService, constants) {

	var vm = this;

	vm.checkV4Servers = function () {
		vm.serverStatusList = null;
		vm.monitorStatus = 'loading';
		monitoringService.getV4ServerStatus().then(function (response) {
			vm.platform = 'V4';
			vm.monitorStatus = 'success';
			vm.serverStatusList = response;
		}, function (errorResponse) {
			vm.monitorStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	vm.checkV5Servers = function () {
		vm.serverStatusList = null;
		vm.monitorStatus = 'loading';
		monitoringService.getV5ServerStatus().then(function (response) {
			vm.platform = 'V5';
			vm.monitorStatus = 'success';
			vm.serverStatusList = response;
		}, function (errorResponse) {
			vm.monitorStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	vm.manageStatus = function (server, status) {
		vm.monitorManageStatus = 'loading';
		var manageStatusDTO = {name: server, status: status};
		monitoringService.manageStatus(manageStatusDTO).then(function (response) {
			vm.serverStatusList = null;
			vm.monitorManageStatus = 'success';
			if (vm.platform === 'V4') {
				vm.checkV4Servers();
			} else {
				vm.checkV5Servers();
			}
		}, function (errorResponse) {
			vm.monitorManageStatus = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};
}]);