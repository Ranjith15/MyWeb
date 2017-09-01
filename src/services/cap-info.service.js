'use strict';

angular.module('edAssistApp').service('capInfoService', ['$q', 'Restangular', function($q, Restangular) {

	var capInfoService = {
		api: Restangular.service('cap-info'),
		initialState: {
			paid: {
				percent: 0,
				type: 'bar-paid',
				value: 0
			},
			requested : {
				percent: 0,
				type: 'bar-requested',
				value: 0
			}
		},
		getParticipantCapInfo: function (participantId, programId, degreeId, benefitPeriod) {
			var queryParams = { programId: programId, degreeObjectiveId: degreeId, benefitPeriod: benefitPeriod };
			return this.api.one().one('participants', participantId).get(queryParams);
		},
		getChartData: function (capInfo, program) {
			var requestedPercent = 0,
				paidPercent;
			var total = {};

			if (program.unknownCapLimitEnabled || !capInfo.cap) {
				requestedPercent = (capInfo.inProgressAmount / (capInfo.paidAmount + capInfo.inProgressAmount)) * 100 || 0;
				paidPercent = (capInfo.paidAmount / (capInfo.paidAmount + capInfo.inProgressAmount)) * 100 || 0;
			} else {
				requestedPercent = (capInfo.inProgressAmount / capInfo.cap) * 100 || 0;
				paidPercent = (capInfo.paidAmount / capInfo.cap) * 100 || 0;
				total = {
					value: capInfo.cap,
					available: capInfo.remainingCapAmount
				};
			}

			return {
				paid: {
					percent: paidPercent,
					type: 'bar-paid',
					value: capInfo.paidAmount
				},
				requested : {
					percent: requestedPercent,
					type: 'bar-requested',
					value: capInfo.inProgressAmount
				},
				total: total
			};
		}
	};

	return capInfoService;
}]);