'use strict';

angular.module('edAssistApp').factory('httpResponseInterceptor', function ($q, $location, $injector, storageService) {
	
	var httpIntercepts = {
		responseError: function (response) {
			if (response.status === 401 && storageService.get('session.tokens')) {
				$injector.invoke(function (sessionService) {
					sessionService.logOut();
				});
			}
			return $q.reject(response);
		}
	};
	return httpIntercepts;
});