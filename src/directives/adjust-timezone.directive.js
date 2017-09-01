'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:adjustTimezone
 * @restrict 'A'
 * @description
 * Parses selected dates from datepickers to adjust the selected date's timezone
 * to match the backend's timezone.
 * @returns {Date} Returns parsed date in the selected timezone.
 **/
angular.module('edAssistApp').directive('adjustTimezone', ['constants', function (constants) {
	var format = 'MM-DD-YYYY';
	var serverOffset = moment().tz(constants.timezone).utcOffset() - moment().utcOffset();
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {
			ctrl.$parsers.push(function (selectedValue) {
				var formatedDate = moment(selectedValue).format(format);
				return moment.tz(formatedDate, format, constants.timezone).toDate();
			});
			ctrl.$formatters.push(function (selectedValue) {
				return selectedValue ? moment(selectedValue).add(serverOffset, 'm').toDate() : selectedValue;
			});
		}
	};
}]);