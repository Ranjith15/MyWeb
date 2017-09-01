'use strict';

angular.module('edAssistApp').filter('grantTypesFilter', function () {
	return function (types) {
		var ret = [];
		angular.forEach(types, function (type) { 
			if (type.financialAidSourceId !== 0 && type.financialAidSourceId !== 6) {
				ret.push(type);
			}
		});
		return ret;
	};
});
