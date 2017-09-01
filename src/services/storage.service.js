'use strict';

angular.module('edAssistApp').factory('storageService', ['$sessionStorage', function ($sessionStorage) {

	var appStorage = $sessionStorage;

	var storageService = {
		set: function (path, value) {
			_.set(appStorage, path, value);
		},
		setWithStates: function (path, value, validStates) {
			var sessionValue = { sessionValue: value, validStates: validStates };
			_.set(appStorage, path, sessionValue);
		},
		get: function (path) {
			var value = _.get(appStorage, path);
			return (value ? value.sessionValue || value : value);
		},
		delete: function (path) {
			_.unset(appStorage, path);
		},
		clear: function () {
			appStorage.$reset();
		},
		clean: function(toState) {
			for (var property in appStorage) {
				if (appStorage.hasOwnProperty(property)) {
					var storageValue = _.get(appStorage, property);

					if (storageValue.validStates) {
						if (storageValue.validStates.indexOf(toState) === -1) {
							_.unset(appStorage, property);
						}
					}
				}
			}
		}
	};

	return storageService;
}]);