'use strict';

angular.module('edAssistApp').factory('participantService', ['$q', 'Restangular', 'constants', 'storageService', function ($q, Restangular, constants, storageService) {

	var participantService = {
		api: Restangular.withConfig(function (config) {
			config.setRestangularFields({'id': 'participantId'});
		}).service('participants'),
		topicsAPI: Restangular.withConfig(function (config) {
		}).service('helpdesktickets'),
		getParticipant: function (participantId) {
			return this.api.one(participantId).get();
		},
		getParticipantSupervisors: function (participantId) {
			return this.api.one(participantId).one('supervisors').withHttpConfig({ cache: true}).get();
		},
		getParticipantTasklist: function (participantId, index, recordsPerPage) {
			return this.api.one(participantId).one('tasklist').get({index: index, recordsPerPage: recordsPerPage});
		},
		getProgramEligibility: function (participantId) {
			return this.api.one(participantId).one('programEligibilityCheck').get();
		},
		getParticipantEligibility: function (participantId) {
			var defer = $q.defer();
			participantService.api.one(participantId).one('participantEligibilityCheck').withHttpConfig({ cache: true }).get().then(function (rulesResponse) {
				if (_.isEmpty(rulesResponse.programs)) {
					defer.reject({
						reason: 'participantEligibilityDenied',
						rules: rulesResponse.rules
					});
				} else {
					defer.resolve(rulesResponse);
				}
			}, function (rulesErrorResponse) {
				defer.reject();
			});
			return defer.promise;
		},
		getParticipantApplications: function (queryParams, participantId) {
			return this.api.one(participantId).one('applications').get(queryParams);
		},
		getTeamFilterOptions: function (participantId) {
			return this.api.one(participantId).one('applications').one('team-filter-options').get();
		},
		getBenefitPeriodFilterOptions: function (queryParams, participantId) {
			return this.api.one(participantId).one('applications').one('benefit-period-filter-options').get(queryParams);
		},
		getApplicationSortOptions: function (participantId) {
			return this.api.one(participantId).one('applications').one('sort-options').get();
		},
		getCurrentEducationalProfile: function (participantId) {
			return Restangular.withConfig(function (config) {
				config.setRestangularFields({'id': 'currentEducationProfileId'});
			}).service('educational-profiles', Restangular.one('participants/' + participantId)).one().get();
		},
		updateCurrentEducationalProfile: function (educationProfile, participantId) {
			return this.api.one(participantId).one('educational-profiles', educationProfile.currentEducationProfileId).customPUT(educationProfile);
		},
		getSubmitApplicationDocumentsURL : function (participantId, applicationId) {
			return constants.urls.restBase + '/participants/' + participantId + '/applications/' + applicationId + '/application-documents';
		},
		getParticipantExceptions : function (participantId) {
			return this.api.one(participantId).one('participant-exceptions').get();
		}
	};

	return participantService;
}]);