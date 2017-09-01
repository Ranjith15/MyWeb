'use strict';

angular.module('edAssistApp').factory('educationProvidersService', ['Restangular', 'storageService', function (Restangular, storageService) {
	var isEditing = false;
	var educationProvidersService = {
		api: Restangular.service('educationProviders'),
		getEducationProviders : function (clientId, searchParams) {
			var participantId = storageService.get('user.userDetails.participantId');
			return this.api.one(participantId).getList(clientId, {
				providerName : searchParams.providerName, 
				providerCity : searchParams.providerCity,
				providerState : searchParams.providerState,
				accreditationBodyId: searchParams.accreditationBodyId,
				featuredProvider : searchParams.featuredProvider
			});
		},
		updateEducationProvider : function (applicationId, provider) {
			return this.api.one(applicationId).customPOST(provider);
		},
		getAccreditations : function () {
			return this.api.one('accreditations').getList();
		},
		setEditing : function (_isEditing) {
			isEditing = _isEditing;
		},
		isEditing : function () {
			return isEditing;
		}
	};

	return educationProvidersService;
}]);


