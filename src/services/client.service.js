'use strict';

angular.module('edAssistApp').factory('clientService', ['Restangular', '$location', 'storageService', 'constants', function (Restangular, $location, storageService, constants) {

	var postfix = '/* @echo envPostfix */';
	var clientService = {
		api: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
		}).service('clients'),

		getClientName: function () {
			var host = $location.host();

			var index = host.indexOf('.');

			if (index < 0) {
				return; // sanity check, shouldn't happen in a proper env.
			}

			// Trim client name from front of hostname
			var client = host.slice(0, index);

			// Check for environment extentions on host name.
			var postfix = '/* @echo envPostfix */';

			if (_.endsWith(client, postfix)) {
				// Strip environment postfix from client name if present
				var idx = client.lastIndexOf(postfix);
				client = client.slice(0, idx);
			}

			return client;
		},
		getSsoRedirectUrl: function () {
			return 'https://' + clientService.getClientName() + postfix + '.edassist.com/#/ssoLogin';
		},
		getClients: function () {
			return this.api.getList();
		},
		getV4Clients: function () {
			return this.api.one('v4').getList();
		},
		getProgramsByClient : function (clientId) {
			return this.api.one(clientId).one('programs').getList();
		},
		saveClientDetails: function (data) {
			var logoFilePath = _.result(_.find(data.generalContentList, {'name' : 'webLogo'}), 'filePath');
			storageService.set('client.clientLogo', logoFilePath);
			storageService.set('client.clientLoginDetails', data.clientLoginDetails);
			storageService.set('client.clientLogoPath', constants.urls.cdnBase + logoFilePath);
			storageService.set('client.ssoEnabled', data.clientLoginDetails.ssoEnabled);
		}
	};

	return clientService;

}]);