'use strict';

angular.module('edAssistApp').directive('formFocus', function ($timeout, $parse) {
	return {
		restrict: 'A',
		scope: {
			form: '@formFocus'
		},
		require: '^form',
		link: function (scope, elem, attr, ctrl) {
			if (attr.formFocus) { 
				scope.$watch($parse(attr.formFocus), function (value) {
					if (value === true) { 
						$timeout(function () {
							elem[0].focus(); 
						});
					}
				});
			}	
			scope.$on('formFocus', function (e, name) {
				$timeout(function () {
					if (elem.find('input').length > 0) {
						elem.find('input')[0].focus();
					} else if (elem.find('a').length > 0) {
						elem.find('a')[0].focus();
					}
				}, (name === 'educationInfoForm' ? 1000 : 0));
			});
		}
	};
});