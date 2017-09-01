'use strict';

angular.module('edAssistApp').factory('programService', ['Restangular', function (Restangular) {

	var programService = {
		api: Restangular.service('programs'),
		getDegreeObjectives: function (programId) {
			return programService.api.one(programId).getList('degree-objectives');
		},
		getFieldsOfStudy: function (programId) {
			return programService.api.one(programId).getList('courses-of-study');
		},
		getDocumentTypes: function (programId) {
			return programService.api.one(programId).getList('documents');
		},
		getProgram : function (programId) {
			return this.api.one(programId).get();
		},
		getProgramSubTypes : function (programId) {
			return programService.api.one(programId).getList('program-sub-types');
		}
	};

	return programService;
}]);