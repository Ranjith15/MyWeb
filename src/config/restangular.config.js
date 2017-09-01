'use strict';

angular.module('edAssistApp').config(['RestangularProvider', 'constants', 'storageServiceProvider', function (RestangularProvider, constants, storageServiceProvider) {

	RestangularProvider.setBaseUrl(constants.urls.restBase);
	RestangularProvider.setDefaultHttpFields({'withCredentials': true, cache: false});
	RestangularProvider.addFullRequestInterceptor(function () {
		return {
			headers: {'X-AUTH-TOKEN': storageServiceProvider.$get().get('session.tokens.sessionToken'), 'source': 'web'}
		};
	});

}]);
