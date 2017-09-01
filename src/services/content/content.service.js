'use strict';

/**
 * @ngdoc service
 * @name edAssistApp.service:contentService
 * @description
 * Service for retrieving properties of content items or run content processes.
 */
angular.module('edAssistApp').factory('contentService', ['Restangular', function (Restangular) {

	var contentService = {
		api: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
		}).service('content'),

		getTypeKeys: function(type) {
			return this.api.one('collection').one('keys').get({type: type});
		},
		findByClient: function(client) {
			return this.api.one('clients').one(String(client)).get();
		},
		findByProgram: function(client, program) {
			return this.api.one('programs').one(String(program)).get({client: client});
		},
		findComponentKeys: function (type) {
			return this.api.one('components').one('keys').get({type: type});
		},
		findNameKeys: function (type, component) {
			return this.api.one('components').one(component).one('names').one('keys').get({type: type});
		},
		/**
		 * @ngdoc method
		 * @name migrateClient
		 * @methodOf edAssistApp.service:contentService
		 * @param {string} client The client id that will be used for
		 * migration.
		 * @description
		 * Migrates the specified client data to the UAT environment.
		 */
		migrateClient: function (client) {
			return this.api.one('migrate').customPOST(client);
		},
		propagateContentCount: function(client) {
			return this.api.one('clients').one(String(client)).one('propagation-client-content-size').get();
		}
	};
	return contentService;
}]);
