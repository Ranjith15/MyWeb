'use strict';

angular.module('edAssistApp').factory('educationProgramService', ['$q', 'generalContentService', 'participantService', function ($q, generalContentService, participantService) {

	var educationProgramService = {
		status: '',
		getAvailableProgramData : function (participantId) {
			var defer = $q.defer();
			participantService.getParticipantEligibility(participantId).then(function (programsResponse) {
				var programIds = programsResponse.programs.map(function (elem) {
					return elem.programID;
				}).join(',');

				if (programIds === undefined) {defer.reject(); }

				generalContentService.getProgramsData(programIds).then(function (response) {
					educationProgramService.status = 'loaded';
					var fullProgramData = _.map(programsResponse.programs, function (program) {
						return _.extend(program, _.find(response, { programId: program.programID }));
					});
					defer.resolve(fullProgramData);
				}, function (errorResponse) {
					educationProgramService.status = 'error';
					educationProgramService.message = _.get(errorResponse, 'data.message');
					defer.reject(errorResponse);
				});
			}, function (errorResponse) {
				educationProgramService.status = 'error';
				educationProgramService.message = _.get(errorResponse, 'data.message');
				defer.reject(errorResponse);
			});
			return defer.promise;
		}
	};

	return educationProgramService;
}]);