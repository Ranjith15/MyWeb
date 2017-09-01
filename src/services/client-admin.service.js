'use strict';

angular.module('edAssistApp').factory('clientAdminService', ['Restangular','storageService', 'constants', function (Restangular,storageService, constants) {
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	var clientAdminService = {
		api: Restangular.withConfig(function (config) {
		}).service('client-admins'),
		getAdminGlobalSearch: function (adminSearch, sortBy, index, recordsPerPage) {
			return this.api.one('applications-by-client').get({
				firstName: (adminSearch) ? adminSearch.firstName: null, 
				lastName: (adminSearch) ? adminSearch.lastName: null,  
				employeeId: (adminSearch) ? adminSearch.employeeId: null, 
				applicationNumber: (adminSearch) ? adminSearch.applicationNum: null,  
				applicationStatus: (adminSearch) ? adminSearch.applicationStatus: null, 
				benefitPeriod: (adminSearch) ? adminSearch.benefitPeriod: null, 
				sortBy: sortBy.value,
				clientId: clientId,
				index: index, 
				recordsPerPage: recordsPerPage
			});
		},
		getApplicationStatus: function () {
			return this.api.one('application-status-dropdown').get();
		},
		getBenefitPeriod: function(){
			return this.api.one('benefit-period-dropdown').one(String(clientId)).get();
		}
	};
	return clientAdminService;
}]);
