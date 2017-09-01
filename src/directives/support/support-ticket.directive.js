'use strict';

angular.module('edAssistApp').directive('supportTicket', 
	['vhdService', 'storageService', 'fileContentService', 'utilService', 'constants', '$location', '$anchorScroll', 
	function (vhdService, storageService, fileContentService, utilService, constants, $location, $anchorScroll) {
	return {
		restrict: 'EA',
		scope: {
			supportTicketHistory: '=',
			historyStatus: '='
		},
		bindToController : true,
		templateUrl: 'src/directives/support/templates/support-ticket.template.html',
		controllerAs: 'supportTicketCtrl',
		controller: function ($scope, $element, $attrs) {
			var vm = this;

			vm.supportTicketHistoryDisplay = angular.copy(vm.supportTicketHistory);
			vm.commmentsOneAtATime = false;
			vm.recordsPerPage = 10;
			vm.displayPages = 3;
			vm.loggedInUserName = storageService.get('user.userDetails.firstName') + ' ' + storageService.get('user.userDetails.lastName');
			vm.fileUploadModel = {
				'documentTypes' : [],
				'statuses' : {}
			};

			var clearEditCommentBox = function () {
				vm.editComment = '';
			};

			var editSupportTicketDTO = function (comment) {
				return {
					'commentText' : comment,
					'isFile' : false
				};
			};

			vm.toggleEditCommentBox = function (ticketId) {
				vm.openSupportTicketBox = false;
				vm.supportTicketLink = true;
				if (vm.openEditTicketBox) {
					vm.editTicketLink = true;
					vm.openEditTicketBox = false;
					$scope.templates = {};
				} else {
					vm.openEditTicketBox = true;
					vm.editTicketLink = false;
					vm.currentTicket = ticketId;
					$scope.templates = {url: 'src/directives/support/templates/edit-ticket.template.html'};
				}
			};

			vm.cancelEditTicket = function () {
				clearEditCommentBox();
				vm.openEditTicketBox = false;
				vm.editTicketLink = true;
				$scope.templates = {url: ''};
			};

			vm.getTicketDetails = function (ticketId) {
				if (vm.currentTicket !== ticketId) {
					vm.cancelEditTicket();
					vm.currentTicket = ticketId;
					vm.ticketIndex = _.findIndex(vm.supportTicketHistoryDisplay, {TicketId: ticketId});
					vm.getLatestTicketDetails(ticketId, vm.ticketIndex);
				}
			};

			vm.getLatestTicketDetails = function (ticketId, ticketIndex) {
				vm.ticketDetailStatus = 'loading';
				vhdService.getTicketDetails(ticketId).then(function (response) {
					vm.ticketDetailStatus = 'success';
					vm.supportTicketHistoryDisplay[ticketIndex].ticketDetails = response;
				}, function (errorResponse) {
					vm.ticketDetailStatus = 'error';
					vm.message = _.get(errorResponse, 'data.message');
				});
			};

			vm.editSupportTicket = function (ticketId) {
				vm.editStatus = 'loading';
				var queue = _.get(vm.fileUploadModel.uploader, 'queue');
				if (queue && queue.length > 0) {
					queue[0].url = vhdService.getEditSupportDocumentsURL(ticketId);
					var formData = [];
					formData.push({
						'commentText' : vm.editComment,
						'isFile' : true
					});
					vm.fileUploadModel.startUpload(formData);
				} else {
					var supportTicketDTO = editSupportTicketDTO(vm.editComment);
					vhdService.editSupportTicket(ticketId, supportTicketDTO).then(function (response) { 
						vm.editTicketSuccess(ticketId);
					}, function (errorResponse) {
						vm.editStatus = 'error';
						vm.message = _.get(errorResponse, 'data.message');
					});
				}
			};

			vm.editTicketSuccess = function (ticketId) {
				vm.editStatus = 'success';
				clearEditCommentBox();
				vm.editTicketLink = true;
				vm.openEditTicketBox = false;
				vm.ticketIndex = _.findIndex(vm.supportTicketHistoryDisplay, {TicketId: ticketId});
				vm.getLatestTicketDetails(ticketId, vm.ticketIndex);
			};

			vm.downloadDocument = function (ticketId, notesId, annotationId, documentName) {
				vhdService.retrieveContentDetail(ticketId, notesId, annotationId).then(function (response) {
					fileContentService.downloadDocument(response, documentName);
				});
			};
		}
	};
}]);