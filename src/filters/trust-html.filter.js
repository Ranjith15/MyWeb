'use strict';

angular.module('edAssistApp').filter('trustHtml', ['$sce', function($sce) {
	return function (content) {
		return _.isString(content) ? $sce.trustAsHtml(content) : content;
	};
}]);