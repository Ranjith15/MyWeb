(function (angular) {
	'use strict';

	function printDirective() {
		var printSection = document.getElementById('printSection');
		// if there is no printing section, create one
		if (!printSection) {
			printSection = document.createElement('div');
			printSection.id = 'printSection';
			document.body.appendChild(printSection);
		}

		function printElement(elem) {
			// clones the element you want to print
			var domClone = elem.cloneNode(true);
			printSection.appendChild(domClone);
		}

		function link(scope, element, attrs) {
			element.on('click', function () {
				var elemToPrint = document.getElementById(attrs.printElementId);
				if (elemToPrint) {
					printElement(elemToPrint);
					window.print();
					elemToPrint = '';
					printSection.innerHTML = '';
				}
			});

			window.onafterprint = function () {
				// clean the print section before adding new content
				printSection.innerHTML = '';
			};

			scope.$emit('setFaxView', {'faxView': true });
			scope.$on('$destroy', scope.$emit.bind(scope, 'setFaxView', {'faxView': false }));
		}

		return {
			link: link,
			restrict: 'A'
		};
	}

	angular.module('edAssistApp').directive('ngPrint', [printDirective]);
}(window.angular));