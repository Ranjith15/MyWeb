'use strict';

angular.module('edAssistApp').factory('cacheService', ['$http', '$cacheFactory', function ($http, $cacheFactory) {

	var cache = $cacheFactory.get('$http');

	var cacheService = {
		clearHttpCache: function () {
			cache.removeAll();
		}
	};
	return cacheService;
}]);