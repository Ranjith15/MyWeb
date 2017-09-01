'use strict';

angular.module('edAssistApp').factory('sessionService', ['$state', 'Restangular', 'constants', 'storageService', function ($state, Restangular, constants, storageService) {

	var sessionService = {
		api: Restangular.service('sessions'),
		isLoggedIn: function () {
			return !!storageService.get('session.tokens');
		},
		logOut: function () {
			var ssoEnabled = storageService.get('client.clientLoginDetails.ssoEnabled'),
				nonSsoOveride = storageService.get('session.nonSsoOverride'),
				ssoLogOffEnabled = storageService.get('client.clientLoginDetails.ssoLogoffEnabled');
			storageService.clear();
			if (nonSsoOveride) {
				$state.go(constants.routes.nonsso);
			} else if (ssoEnabled) {
				$state.go(constants.routes.ssoLogout, { ssoLogOffEnabled: ssoLogOffEnabled }, { reload: true });
			} else {
				$state.go(constants.routes.login, {}, { reload: true });
			}
		},
		keepSessionAlive: function () {
			if (sessionService.isLoggedIn()) {
				var data = {
					sessionToken: storageService.get('session.tokens.sessionToken'),
					refreshToken: storageService.get('session.tokens.refreshToken')
				};
				sessionService.api.one().post('refresh-token', data).then(function (response) {
					storageService.set('session.tokens.sessionToken', response.sessionToken);
				});
			}
		}
	};

	return sessionService;
}]);