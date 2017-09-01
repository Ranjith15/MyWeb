'use strict';

angular.module('edAssistApp').factory('gradeService', ['Restangular', function (Restangular) {

	var gradeService = {
		api: Restangular.service('grades'),

		getGradeTypes: function () {
			return this.api.getList();
		}
	};

	return gradeService;
}]);