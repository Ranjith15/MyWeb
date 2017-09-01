'use strict';

angular.module('edAssistApp').factory('advisingService', ['Restangular', function (Restangular) {

	var advisingService = {
		api: Restangular.service('advising'),
		
		getReferenceData: function (referenceDataName) {
			return this.api.one('referenceData').one(referenceDataName).getList();
		},
		getAvailableSlots: function (categ, selectedDate, offSet) {
			return this.api.one('available-slots').get({categ: categ, selectedDate: selectedDate, offSet: offSet});
		},
		getAdvisingAppointments: function () {
			return this.api.one('advising-appointments').getList();
		},
		saveAdvisingAppointment: function (advisingAppointment) {
			return this.api.one().post('advising-appointment', advisingAppointment);
		},
		getCurrentAdvisingAppointment : function (appointmentId) {
			return this.api.one('advising-appointment').one(appointmentId).get();
		},
		updateAdvisingAppointment : function (advisingAppointment) {
			return this.api.one('advising-appointment').customPUT(advisingAppointment);
		},
		cancelAdvisingAppointment : function (appointmentId) {
			return this.api.one('advising-appointment').one(appointmentId).remove();
		}
	};
	return advisingService;
}]);

