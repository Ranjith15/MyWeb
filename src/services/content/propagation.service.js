'use strict';

angular.module('edAssistApp').factory('propagationService', ['Restangular', function (Restangular) {

    var propagationService = {
        api: Restangular.withConfig(function (config) {
            config.setDefaultHttpFields({cache: true});
        }).service('content'),

        propagateGeneralContent: function (content) {
            return propagationService.api.one('general').one('propagate-content').customPOST(content);
        },

        propagateEmailContent: function (content) {
            return propagationService.api.one('email').one('propagate-content').customPOST(content);
        },

        propagateFileContent: function (content) {
            return propagationService.api.one('file').one('propagate-content').customPOST(content);
        },
        
        propagateClientContent: function(clientId) {
            return propagationService.api.one('client').one('propagate-content').customPOST(clientId);
        },
    };
    return propagationService;
}]);
