'use strict';

angular.module('edAssistApp').directive('documentList', [ function () {
	return {
		scope: { documents: '=data' },
		templateUrl: 'src/directives/general/document-list.template.html'
	};
}]);