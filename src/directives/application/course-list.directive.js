'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:courseList
 * @restrict 'EA'
 * @scope
 * @param {string} applicationProgramId Program id related to the submitted application.
 * @param {object} courseApplication Application record that was created for the request.
 * @param {array} applicationCourses Array of course submitted for the application
 * @param {object} applicationSnapShot Subset of application data.
 * @restrict E
 * @description
 * A summarized set of information relating to the application that was submitted for reimbursement.
 * @returns {object} Returns the course list directive configuration.
**/
angular.module('edAssistApp').directive('courseList', 
	[ 
	function () {
	
	/**
	 * @ngdoc controller
	 * @name edAssistApp.controller:courseListCtrl
	 * @description
	 * Controller for the course list directive. Shows the summary information for
	 * course and expense information.
	 */
	var courseListCtrl = ['$q', '$stateParams', '$sce', 'generalContentService', 'storageService', 'contentConstants', 'constants', function ($q, $stateParams, $sce, generalContentService, storageService, contentConstants, constants){

		var vm = this;

		vm.courseData = {};
		vm.nonCourseExpenses = [];
		vm.loaded = false;
		vm.application = {};
		vm.totals = {};
		vm.nonCourseExpenses = [];
		vm.courses = [];
		vm.totalTaxAmount = 0;
		vm.courseQuestionOne = '';
		vm.courseQuestionTwo = '';
		vm.courseQuestionThree = '';
		vm.expenseQuestionOne = '';
		vm.expenseQuestionTwo = '';
		vm.expenseQuestionThree = '';
		vm.constants = constants;

		/**
		 * @ngdoc method
		 * @name courseContent
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Retrieves content for questions that were asked to the user 
		 * while creating the application.
		 */
		var courseContent = function () {
			generalContentService.findByComponent(contentConstants.component.applicationStep3, storageService.get('client.clientLoginDetails.clientId'), vm.applicationProgramId + ',clientDefault', false).then(function (response) {
				_.each(response, function (contentObject) {
					var contentName = contentObject.name;
					var content = contentObject.data;
					var taxQuestionsCount = vm.courseApplication.benefitPeriod.programID.taxQuestionsCount;

					//We are always pulling in current no matter the date of submission. 
					//There is a chance that the wording could have changed from submission 
					//date to the time they view the application summary. Also, if another
					//question is added after submission the default answer is NO
					if (taxQuestionsCount > 0) {
						if (contentName === 'courseQuestionOne') {
							vm.courseQuestionOne = $sce.trustAsHtml(content);
						} else if (contentName === 'courseQuestionTwo' && taxQuestionsCount > 1) {
							vm.courseQuestionTwo = $sce.trustAsHtml(content);
						} else if (contentName === 'courseQuestionThree' && taxQuestionsCount > 2) {
							vm.courseQuestionThree = $sce.trustAsHtml(content);
						} else if (contentName === 'expenseQuestionOne') {
							vm.expenseQuestionOne = $sce.trustAsHtml(content);
						} else if (contentName === 'expenseQuestionTwo' && taxQuestionsCount > 1) {
							vm.expenseQuestionTwo = $sce.trustAsHtml(content);
						} else if (contentName === 'expenseQuestionThree' && taxQuestionsCount > 2) {
							vm.expenseQuestionThree = $sce.trustAsHtml(content);
						}
					}

					vm.loaded = true;
				});
			});
		};

		/**
		 * @ngdoc method
		 * @name parseCoursesExpenses
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Splits apart the courses in the application
		 */
		var parseCoursesExpenses = function () {
			vm.loaded = true;
			vm.courses = _.get(vm, 'courseApplication.courses');
			vm.nonCourseExpenses = _.get(vm, 'courseApplication.nonCourseRelatedExpenses');
		};

		/**
		 * @ngdoc method
		 * @name getPaymentHistory
		 * @methodOf edAssistApp.controller:ticketSearchCtrl
		 * @description
		 * Iterates over the payments and creates a total tax amount.
		 */
		var getPaymentHistory = function () {
			vm.payments = _.get(vm, 'courseApplication.payments');
			vm.refunds = _.get(vm, 'courseApplication.refunds');
			_.forEach(vm.payments, function (payment) {
				vm.totalTaxAmount += payment.taxableAmount;
			});
			vm.totals = _.get(vm, 'applicationSnapShot.requestedExpense');
		};

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf edAssistApp.controller:adminController
		 * @description
		 * Sets the initial state of the course list directive and sets the default data
		 * needed for the display.
		 */
		var initialize = function () {
			parseCoursesExpenses();
			getPaymentHistory();
			courseContent();
		};

		/**
		 * @ngdoc method
		 * @name showCourseQuestionsSection
		 * @methodOf edAssistApp.controller:adminController
		 * @description
		 * Flag to check if there are any course questions configured for the application
		 */
		vm.showCourseQuestionsSection = function () {
			return (vm.courseQuestionOne|| vm.courseQuestionTwo || vm.courseQuestionThree);
		};

		/**
		 * @ngdoc method
		 * @name showExpenseQuestionsSection
		 * @methodOf edAssistApp.controller:adminController
		 * @description
		 * Flag to check if there are any expense questions configured for the application
		 */
		vm.showExpenseQuestionsSection = function () {
			return (vm.expenseQuestionOne|| vm.expenseQuestionTwo || vm.expenseQuestionThree);
		};

		/**
		 * @ngdoc method
		 * @name showTaxableAmount
		 * @methodOf edAssistApp.controller:adminController
		 * @description
		 * Flag to check if the taxable amount exists
		 */
		vm.showTaxableAmount = function () {
			return (vm.totalTaxAmount > 0 || vm.courseApplication.applicationStatus.applicationStatusCode === vm.constants.applicationStatus.closed || vm.courseApplication.applicationStatus.applicationStatusCode === vm.constants.applicationStatus.paymentComplete);
		};

		initialize();
	}];

	return {
		restrict: 'EA',
		bindToController: true,
		scope: {
			applicationProgramId: '=',
			courseApplication: '=',
			applicationCourses: '=',
			applicationSnapShot: '='
		},
		templateUrl: 'src/directives/application/templates/course-list.template.html',
		controllerAs: 'courseListCtrl',
		controller: courseListCtrl
	};
}]);