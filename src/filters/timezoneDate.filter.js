'use strict';

/**
 * @ngdoc filter
 * @name edAssistApp.dilter:timezoneDate
 * @returns {Date} Returns date in server timezone if no specific timezone was specified.
 * @description
 * Extends angular's "date" filter, and returns date in server timezone
 * if no specific timezone was specified.
 **/
angular.module('edAssistApp').filter('timezoneDate', ['$filter', 'constants', function ($filter, constants) {
	const timezoneOffset = moment(new Date()).tz(constants.timezone).format('Z');
	var originalDateFilter = $filter('date');
	return function (date, format, timezone) {
		var timezoneToUse = timezone || timezoneOffset;
		return originalDateFilter(date, format, timezoneToUse);
	};
}]);