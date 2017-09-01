'use strict';

/**
 * @ngdoc directive
 * @name edAssistApp.directive:createTicket
 * @restrict 'EA'
 * @scope
 * @param {object} onTicketCreated Callback function for when the ticket is created. Allows
 * the implamenting page to add functionality once the ticket has been saved.
 * @description
 * Form directive used to create a brand new ticket. Once a ticket has been saved 
 * an output method is called alerting the calling controller.
 * @returns {object} Returns the create new ticket directive configuration.
**/
angular.module('edAssistApp').directive('createTicket', 
    ['vhdService', 'storageService', 'generalContentService', 'utilService', 'constants', '$location', '$anchorScroll', 
    function (vhdService, storageService, generalContentService, utilService, constants, $location, $anchorScroll) {
	
	/**
	 * @ngdoc controller
	 * @name edAssistApp.controller:createTicketController
	 * @description
	 * Controller for the create ticket directive. Allows for a user to input
	 * ticket information and exposes it to a callback handler on ticket creation.
	 */
    var createTicketController = function ($scope, $element, $attrs) {
		var vm = this;

		vm.message = '';
		vm.createStatus = '';
		vm.topicStatus = 'loading';
		vm.openSupportTicketBox = false;
		vm.openEditTicketBox = false;
		vm.supportTicketLink = true;
		vm.editTicketLink = true;
		vm.oneAtATime = true;
		vm.topics = {};
		vm.subTopics = {};
		vm.subTopic = {};
		vm.fileUploadModel = {
			'documentTypes' : [],
			'statuses' : {}
		};

		/**
		 * @ngdoc method
		 * @name clearCommentBox
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Removes the comment box contents as well as resets the topic and
		 * clears the suptopics.
		 */
		var clearCommentBox = function () {
			vm.topic = vm.topics[0].value;
			vm.subTopic = {};
			vm.subTopics = '';
			vm.comment = '';
		};

		/**
		 * @ngdoc method
		 * @name createSupportTicketDTO
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * DTO object for the support ticket. Used as a structure to save the ticket.
		 */
		var createSupportTicketDTO = function (subTopic, comment) {
			return {
				'subTopicId' : subTopic,
				'commentText' : comment,
				'isFile' : false
			};
		};

		/**
		 * @ngdoc method
		 * @name scrollToToast
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Moves the page to the toast information on save or error.
		 */
		var scrollToToast = function() {
			$location.hash('supportTicketsHeader');
			$anchorScroll();
		};

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Initializes the controller and sets the available topics for selection.
		 */
		var initialize = function() {
			vhdService.getTopics().then(function (response) {
				vm.topicStatus = 'loaded';
				if (utilService.isClientAdmin()) {
					vm.topics = response;
				} else {
					vm.topics = _.filter(response, function (element) {
						return element.topicId !== constants.topics.clientAdminTopicId;
					});
				}
			}, function (errorResponse) { 
				vm.topicStatus = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});
		};

		/**
		 * @ngdoc method
		 * @name onTopicChange
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Event handler for the topic dropdown.
		 */
		vm.onTopicChange = function () {
			vhdService.getSubTopics(vm.topic.topicId).then(function (response) {
				vm.subTopics = response;
			}, function (errorResponse) { 
				vm.topicStatus = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});
		};

		/**
		 * @ngdoc method
		 * @name toggleSupportTicketBox
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Checks the input model to make sure the user has entered atleast one value.
		 * If the model is empty an error message is displayed to the ui.
		 */
		vm.toggleSupportTicketBox = function () {
			vm.openEditTicketBox = false;
			vm.editTicketLink = true;
			if (vm.openSupportTicketBox) {
				vm.openSupportTicketBox = false;
			} else {
				vm.openSupportTicketBox = true;
				vm.supportTicketLink = false;
			}
		};

		/**
		 * @ngdoc method
		 * @name cancelSupportTicket
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Resets the create ticket form and all the input information supplied by the user as well as any
		 * notifications that may have occured.
		 */
		vm.cancelSupportTicket = function () {
			clearCommentBox();
			vm.openSupportTicketBox = false;
			vm.supportTicketLink = true;
			vm.createStatus = '';
			vm.message = '';
		};

		/**
		 * @ngdoc method
		 * @name submitSupportTicket
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Saves the ticket information.
		 */
		vm.submitSupportTicket = function () {
			vm.createStatus = 'loading';
			var queue = _.get(vm.fileUploadModel.uploader, 'queue');
			if (queue && queue.length > 0) {
				var formData = [];
				formData.push({
					'subTopicId' : vm.subTopic.topicId,
					'commentText' : vm.comment,
					'isFile' : true
				});
				vm.fileUploadModel.startUpload(formData);
			} else {
				var supportTicketDTO = createSupportTicketDTO(vm.subTopic.topicId, vm.comment);
				vhdService.submitSupportTicket(supportTicketDTO).then(function (response) {
					vm.translateNumber = {
						ticketNumber: response.TicketNumber
					}; 
					vm.submitTicketSuccess();
					scrollToToast();
				}, function (errorResponse) {
					vm.createStatus = 'error';
					vm.message = _.get(errorResponse, 'data.message');
					scrollToToast();
				});
			}
		};

		/**
		 * @ngdoc method
		 * @name submitTicketSuccess
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Resets the form back to its original state and calles the onTicketCreated callback
		 * handler.
		 */
		vm.submitTicketSuccess = function () {
			vm.createStatus = 'success';
			clearCommentBox();
			vm.supportTicketLink = true;
			vm.openSupportTicketBox = false;
			vm.onTicketCreated();
		};

		/**
		 * @ngdoc method
		 * @name editTicketSuccess
		 * @methodOf edAssistApp.controller:createTicketController
		 * @description
		 * Resets the form back to its original state and gets the latest ticket details.
		 */
		vm.editTicketSuccess = function (ticketId) {
			vm.editStatus = 'success';
		};

		initialize();
	};

	var createTicketDirective = {
		restrict: 'EA',
		scope: {
			onTicketCreated: '&',
		},
		bindToController : true,
		templateUrl: 'src/directives/support/templates/create-ticket.template.html',
		controllerAs: 'createTicketCtrl',
		controller: createTicketController
	};

	return createTicketDirective;
}]);