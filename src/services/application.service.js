'use strict';

angular.module('edAssistApp').factory('applicationService', ['Restangular', 'constants', 'utilService', function (Restangular, constants, utilService) {

	var applicationService = {
		rawContent: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
			config.setFullResponse(true);
		}).service('applications'),

		api: Restangular.service('applications'),
		tuitionApplications: Restangular.withConfig(function (config) {
			config.setRestangularFields({'id': 'applicationID'});
		}).service('tuition-applications', Restangular.one('applications')),
		getApplicationComments : function (applicationId) {
			return this.api.one(applicationId).one('comments').get();
		},
		updateApplicationComment : function (applicationComment) {
			return this.api.one(applicationComment.applicationID).one('comments', applicationComment.applicationCommentId).customPUT(applicationComment);
		},
		reviewAppComments: function (applicationId, appComments) {
			return this.api.one(applicationId).one('comments').post('review-app-comments', appComments);
		},
		getApplicationExpenses: function (applicationId) {
			return this.api.one(applicationId).one('expenses').getList();
		},
		getApplicationCourses: function (applicationId) {
			return this.api.one(applicationId).one('courses').getList();
		},
		deleteApplicationCourse: function (applicationId, applicationCoursesId) {
			return this.api.one(applicationId).one('courses', applicationCoursesId).remove();
		},
		deleteApplicationExpense: function (applicationId, applicationExpensesId) {
			return this.api.one(applicationId).one('expenses', applicationExpensesId).remove();
		},
		updateApplicationCourse: function (applicationId, applicationCourse) {
			return this.api.one(applicationId).one('courses', applicationCourse.applicationCoursesID).customPUT(applicationCourse);
		},
		updateApplicationExpense: function (applicationId, applicationExpense) {
			return this.api.one(applicationId).one('expenses', applicationExpense.applicationExpensesID).customPUT(applicationExpense);
		},
		saveApplicationCourse: function (applicationId, courseFormData) {
			return this.api.one(applicationId).post('courses', [courseFormData]);
		},
		saveApplicationExpense: function (applicationId, courseExpenses) {
			return this.api.one(applicationId).post('expenses', courseExpenses);
		},
		saveApplicationComments : function (applicationComment) {
			return this.api.one(applicationComment.applicationId).all('comments').post(applicationComment);
		},
		deleteApplicationComments : function (applicationId, applicationCommentId) {
			return this.api.one(applicationId).one('comments', applicationCommentId).remove();
		},
		createTuitionApplication: function (app) {
			return this.tuitionApplications.post(app);
		},
		getTuitionApplication: function (applicationId) {
			return this.tuitionApplications.one(applicationId).get();
		},
		getApplication: function (applicationId) {
			return this.api.one(applicationId).get();
		},		
		updateTuitionApplication : function (applicationId, app) {
			return this.tuitionApplications.one(applicationId).customPUT(app);
		},
		submitApplication : function (applicationId) {
			return this.api.one(applicationId).all('submission').post();
		},
		getSubmitApplicationDocumentsURL : function (applicationId) {
			return constants.urls.restBase + '/applications/' + applicationId + '/application-documents';
		},
		cancelApplication : function (applicationId, applicationStatusObj) {
			return this.api.one(applicationId).all('cancellation').post(applicationStatusObj);
		},
		getGrantsScholarship : function (applicationId) {
			return this.api.one(applicationId).one('grants-scholarship').get();
		},
		applicationSnapShot : function (applicationId) {
			return this.api.one(applicationId).one('expense-snapshot').get();
		},
		getApplicationDocuments : function (applicationId) {
			return this.api.one(applicationId).one('application-documents').getList();
		},
		getApplicationDocumentFile : function (applicationId, documentId) {
			return this.rawContent.one(applicationId).one('application-documents').one(documentId).withHttpConfig({ responseType: 'arraybuffer' }).get();
		},
		getPaymentHistory : function (applicationId) {
			return this.api.one(applicationId).one('payment-history').get();
		},
		getApplicationEligibleDocumentTypes : function (applicationId) {
			return this.api.one(applicationId).one('application-eligible-document-types').get();
		},
		getParticipantApplicationStatusHistory: function (applicationId) {
			return this.api.one(applicationId).one('eligibility-event-history').get();
		},
		filterParticipantRules: function (ruleArray) {
			return _.filter(ruleArray, function (rule) {
				var ruleStatus = rule.ruleStatus || rule.status;
				return ruleStatus && ruleStatus !== 'Cap Set' && ruleStatus !== 'Submission LOC Not Accepted';
			});
		},
		sortByStatusCode: function (applications, statusCode) {
			return _.chain(applications).partition(function (app) {
				return app.applicationStatus.applicationStatusID === statusCode;
			}).flatten().value();
		},
		assignParticipantPrefs: function (application) {
			application.preferredAddressData = utilService.getPreferredAddress(application.participantID, application.participantID.preferredAddress);
			application.preferredPhoneData = utilService.getPreferredPhone(application.participantID);
			application.preferredEmailData = utilService.getPreferredEmail(application.participantID);

			return application;
		},
		saveCourseSessionInfo: function (applicationId, CourseSessionInfo) {
			return this.api.one(applicationId).post('session-info', CourseSessionInfo);
		},
		deleteApplication: function (applicationId) {
			return this.api.one(applicationId).one('delete').remove();
		},
		exportAppsToCsv: function (queryParams) {
			return this.rawContent.one().post('csv-export', {}, queryParams);
		},
		getSubmittedApplication: function (applicationId) {
			return this.api.one(applicationId).get();
		}
	};
	return applicationService;
}]);
