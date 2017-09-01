'use strict';

angular.module('edAssistApp').factory('emailContentService', ['Restangular', function (Restangular) {

	var emailContentService = {
		api: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
		}).service('content'),

		findByComponent: function (component, client, program) {
			return this.api.one('email').one('components').getList(component, {client: client, program: program});
		},
		findByName: function (component, name, client, program, cascade) {
			return this.api.one('email').one('components').one(component).one('names').one(name).get({client: client, program: program, cascade: cascade});
		},
		findByClient: function(client) {
			return emailContentService.api.one('email').get({client: client});
		},
		updateContent: function (content) {
			return this.api.one('email').one(content.id).customPUT(content);
		},
		addContent: function (content) {
			if (!content.program) {
				content.program = '';
			}
			return emailContentService.api.one('email').customPOST(content);
		},
		deleteContent: function (id) {
			return this.api.one('email').one(id).remove();
		}
	};
	return emailContentService;
}]);