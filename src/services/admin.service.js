'use strict';

angular.module('edAssistApp').factory('adminService', ['Restangular', function (Restangular) {

	var adminService = {
		api: Restangular.service('admins'),

		getSupervisorTasklist: function (participantId, index, recordsPerPage) {
			return this.api.one(participantId).one('tasklist').get({index: index, recordsPerPage: recordsPerPage});
		},
		getSupervisedParticipant: function (participantId) {
			return this.api.one(participantId).one('participants').withHttpConfig({ cache: true}).get();
		},
		updateApplicationStatus: function (userId, applicationId, approval) {
			return this.api.one(userId).one('applications').one(applicationId).post('application-status', approval);
		}
	};

	return adminService;
}]);