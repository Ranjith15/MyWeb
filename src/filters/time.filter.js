'use strict';

angular.module('edAssistApp').filter('time', function () {
	return function (seconds) {
		if (seconds !== undefined && !isNaN(seconds)) {
			// String format number of seconds to minutes:seconds eg. '00:00'
			return new Date(null, null, null, null, null, seconds).toTimeString().replace(/.*(\d{2}:\d{2}).*/, '$1');
		}
	};
});