'use strict';

angular.module('edAssistApp').factory('vhdService', ['$q', 'Restangular', 'constants', 'storageService', function ($q, Restangular, constants, storageService) {

	var vhdService = {
		api: Restangular.withConfig(function (config) {
		}).service('vhd'),
		rawContent: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
			config.setFullResponse(true);
		}).service('vhd'),

		getParticipantSupportTicketHistory: function () {
			return this.api.one('tickets').get();
		},
		getTopics: function () {
			return this.api.one('topics').get();
		},
		getSubTopics: function (topic) {
			return this.api.one('topics').one(topic).get();
		},
		getTicketDetails: function (ticketId) {
			return this.api.one('tickets').one(ticketId).get();
		},
		submitSupportTicket : function (supportTicket) {
			return this.api.one().post('tickets', {}, supportTicket);
		},
		getSubmitSupportDocumentsURL : function () {
			return constants.urls.restBase + '/vhd/tickets';
		},
		editSupportTicket : function (ticketId, editTicket) {
			return this.api.one('tickets').post(ticketId, {}, editTicket);
		},
		getTicketStatuses: function() {
			return this.api.one('tickets').one('status').get();
		},
		searchTickets: function(ticketNumber, participantId, employeeId, clientName, status, createdFrom, createdTo, firstName, lastName, clientId) {
			var queryData = _.pickBy({ ticketNumber: (ticketNumber || undefined), 
				participantId: (participantId || undefined), 
				employeeId: (employeeId || undefined), 
				clientName: (clientName || undefined), 
				status: (status || undefined), 
				createdFrom: (createdFrom || undefined), 
				createdTo: (createdTo || undefined), 
				firstName: (firstName || undefined), 
				lastName: (lastName || undefined), 
				clientId: (clientId || undefined)
			}, _.negate(_.isUndefined));
		
			return this.api.one('tickets').one('search').get(queryData);
		},
		getEditSupportDocumentsURL : function (ticketId) {
			return constants.urls.restBase + '/vhd/tickets/' + ticketId;
		},
		retrieveContentDetail: function (ticketId, notesId, annotationId) {
			return vhdService.rawContent.one('tickets').one(ticketId).one('notes').one(notesId).one(annotationId).withHttpConfig({ responseType: 'arraybuffer' }).get();
		},
		getTicketList: function (participantId) {
			return this.api.one('tickets').one('search').get({ participantId : participantId });
 		}
	};
	return vhdService;
}]);