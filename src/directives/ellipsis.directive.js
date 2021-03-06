'use strict';

angular.module('edAssistApp')

.directive('ellipsis', [function () {
	return {
		required: 'ngBindHtml',
		restrict: 'A',
		priority: 100,
		link: function ($scope, element, attrs, ctrl) {
			$scope.hasEllipsis = false;
			$scope.$watch(element.html(), function (value) {
				if (!$scope.hasEllipsis) {
					// apply this code ONCE
					$scope.hasEllipsis = true;
					$(element).trunk8({
						fill: '...<div class="spacer"></div><button id="read-more" class="btn btn-default btn-sm">View More <span class="sr-only">- Important Notice</span></button>', /*(Default: '&hellip;') The string to insert in place of the omitted text. This value may include HTML.*/
						//lines: 3, /*(Default: 1) The number of lines of text-wrap to tolerate before truncating. This value must be an integer greater than or equal to 1.*/
						//side: 'right', /*(Default: 'right') The side of the text from which to truncate. Valid values include 'center', 'left', and 'right'.*/
						tooltip: true, /*(Default: true) When true, the title attribute of the targeted HTML element will be set to the original, untruncated string. Valid values include true and false.*/
						width: '200', /*(Default: 'auto') The width, in characters, of the desired text. When set to 'auto', trunk8 will maximize the amount of text without spilling over.*/
						parseHTML: true /*(Default: 'false') When true, parse and save html structure and restore structure in the truncated text.*/
						//onTruncate /*(Callback): Called after truncation is completed.*/
					});
					$(element).on('click', '#read-more', function (event) {
						$(element).trunk8('revert').append(' <button id="read-less" class="btn btn-default btn-sm">View Less <span class="sr-only">- Important Notice</span></button>');
					});
					$(element).on('click', '#read-less', function (event) {
						$(element).trunk8();
					});
				}
			});
		}
	};
}]);