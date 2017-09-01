'use strict';

angular.module('edAssistApp').factory('monitoringService', ['Restangular', function (Restangular) {

	var monitoringService = {
		api: Restangular.withConfig(function (config) {
		}).service('monitoring'),

		getV4ServerStatus: function () {
			return this.api.one('v4-server-status').get();
		},
		getV5ServerStatus: function () {
			return this.api.one('v5-server-status').get();
		},
		manageStatus: function (manageStatus) {
			return this.api.one('manage-status').customPOST(manageStatus);
		}
	};
	return monitoringService;
}]);