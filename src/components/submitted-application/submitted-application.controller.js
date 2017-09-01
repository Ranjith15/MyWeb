'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:submittedApplicationController
 * @description
 * Main controller for the submitted application page. Loads several directives
 * to display information that was entered during the application workflow.
 */
angular.module('edAssistApp').controller('submittedApplicationController',
	['$scope', '$sce', '$stateParams', '$state', 'agreementContent', 'submittedApplication', 'applicationSnapShot', 'constants', 'contentConstants', 'generalContentService', 'storageService', 'applicationService', 'programService', 'utilService',
	function ($scope, $sce, $stateParams, $state, agreementContent, submittedApplication, applicationSnapShot, constants, contentConstants, generalContentService, storageService, applicationService, programService, utilService) {

	var vm = this;
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	var userDetails = storageService.get('user.userDetails');

	vm.submittedApplication = submittedApplication;
	vm.agreementContent = agreementContent;
	vm.preferredAddress = utilService.getPreferredAddress(submittedApplication.participant, submittedApplication.participant.preferredAddress);
	vm.preferredPhone = utilService.getPreferredPhone(submittedApplication.participant);
	vm.preferredEmail = utilService.getPreferredEmail(submittedApplication.participant);
	vm.applicationSnapShot = applicationSnapShot;
	vm.status = 'loading';
	vm.documentTypes = [];
	vm.supportedDocsModalState = 'hide';
	vm.isSupervisor = utilService.isSupervisor();
	vm.userFullName = userDetails.firstName + ' ' + userDetails.lastName;	
	vm.isEditStatus = submittedApplication.applicationStatus.applicationStatusID === constants.applicationStatus.pendingReview || submittedApplication.applicationStatus.applicationStatusID === constants.applicationStatus.incomplete; 
	vm.isCancelStatus = submittedApplication.applicationStatus.applicationStatusID >= constants.applicationStatus.pendingReview && submittedApplication.applicationStatus.applicationStatusID < constants.applicationStatus.paymentInProgress;
	vm.isSupervisorReviewApp = utilService.isSupervisor() && submittedApplication.participant.participantId !== storageService.get('user.userDetails.participantId');
	vm.hideAddNewComment = utilService.isClientAdmin() && submittedApplication.participant.participantId !== storageService.get('user.userDetails.participantId');
	vm.applicationStatus = utilService.getAppStatus(submittedApplication.applicationStatus.applicationStatusCode);

	vm.translateNumber = {
		unreadMessages: vm.unreadMessages
	};

	vm.statusHistory = {
		limit: 1
	};

	vm.supportedDocsModal = {
		displayState : 'hide',
		docTypeStatus : 'loading',
		data : {}
	};

	vm.fileUploadModel = {
		'programId' : submittedApplication.benefitPeriod.programID.programID,
		'applicationId' : submittedApplication.id,
		'documentTypes' : [],
		'statuses' : {},
		'uploadUrl' : applicationService.getSubmitApplicationDocumentsURL(submittedApplication.id),
		refreshApplicationDocuments: function () {
			$scope.$broadcast('reloadApplicationDocuments');
			vm.showSupportingDocuments = true;
		}
	};

	/**
	 * @ngdoc method
	 * @name applnStatus
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Filters down and orders the list of application statuses.
	 */
	var loadStatusHistory = function () {
		var applicationStatuses = [];
		var priorStatus = {};
			
		generalContentService.findByComponent(contentConstants.component.applicationStatus, clientId, submittedApplication.benefitPeriod.programID.programID).then(function (response) {
			var statusText = response.plain();

			vm.status = 'success';
			applicationStatuses = _.chain(vm.submittedApplication.statusHistory).filter('statusId').orderBy(['dateCreated', 'statusId'], ['desc', 'asc']).value();
			applicationStatuses.forEach(function (applicationStatus) {
				if (applicationStatus.statusId) {
					var statusContent = _.find(statusText, ['name', applicationStatus.statusId.toString()]);
					applicationStatus.toolTipData = (statusContent ? statusContent.data : '');
				}
			});

			vm.applicationStatusHistory = applicationStatuses.reduce(function (statuses, applicationStatus, index) { 
				if (priorStatus.statusId !== applicationStatus.statusId) {
					statuses.push([applicationStatus]);
				} else {
					statuses[statuses.length-1].push(applicationStatus);
				}

				priorStatus = applicationStatus;
				return statuses;
			}, []);
		});
	};

	generalContentService.findByName(contentConstants.component.site, contentConstants.name.submitDocsAdditionalInfo, clientId, contentConstants.program.clientDefault).then(function (response) {
		if (_.size(response) > 0) {
			vm.submitDocsAdditionalInfo = _.first(response.plain()).data;
		}
	});

	/**
	 * @ngdoc method
	 * @name getEligibleDocumentTypes
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Retrieves a the eligible document types based on the applications id.
	 */
	var getEligibleDocumentTypes = function () {
		applicationService.getApplicationEligibleDocumentTypes(submittedApplication.id).then(function (response) {
			vm.documentTypes = vm.fileUploadModel.documentTypes = response;
			vm.fileUploadModel.statuses.docTypesStatus = 'success';
		}, function (errorResponse) {
			vm.documentTypes = vm.fileUploadModel.documentTypes = [];
			vm.fileUploadModel.statuses.docTypesStatus = 'error';
		});
	};

	/**
	 * @ngdoc method
	 * @name initialize
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Sets the initial state of the submitted application page and loads the prior application
	 * data.
	 */
	var initialize = function () {
		loadStatusHistory();
		getEligibleDocumentTypes();
	
		applicationService.getTuitionApplication(submittedApplication.id).then(function (response) {
			vm.status = 'applicationLoaded';
			vm.application = applicationService.assignParticipantPrefs(response);
			// Get program details
			var programId = _.get(response, 'benefitPeriodID.programID.programID');
			
			if (programId) {
				// Load detailed program data. 
				generalContentService.getProgramsData(programId).then(function (res) {
					var programData = _.head(res.plain());
					response.programDescription = _.get(programData, 'programDescription');
				});
			}

			vm.getSupportedDocuments();
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	/**
	 * @ngdoc method
	 * @name showSupportedDocsModal
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Displays a modal to the user explaning the supported documents.
	 */
	vm.showSupportedDocsModal = function () {
		generalContentService.findByName(contentConstants.component.faxCoverSheet, contentConstants.name.instructions, clientId, contentConstants.program.clientDefault).then(function (response) {
			if (_.size(response) > 0) {
				vm.instructions = _.first(response.plain()).data;
			}
		});
		vm.supportedDocsModal.data.isSupervisorReviewApp = vm.isSupervisorReviewApp;
		if (vm.application.benefitPeriodID.programID.displayFaxCoverSheet) {
			vm.supportedDocsModal.data.showFaxCoverSheet = true;
		} else {
			vm.supportedDocsModal.data.showFaxCoverSheet = false;
		}
		vm.supportedDocsModal.data.printFaxCoverSheet = function () {
			vm.supportedDocsModal.data.applicationId = submittedApplication.id;
			vm.supportedDocsModal.data.faxCoverSheet = 'show';
			vm.supportedDocsModal.data.data = {
				'applicationId' : submittedApplication.id,
				'applicationNumber' : vm.submittedApplication.applicationNumber,
				'name' : vm.userFullName,
				'employeeId' : vm.submittedApplication.participant.employeeId,
				'fax' : vm.application.benefitPeriodID.programID.contactFAX || vm.application.clientFax,
				'instructions': vm.instructions,
				'date' : new Date(),
				'documentTypes' : _.get(vm, 'fileUploadModel.documentTypes')
			};
			vm.supportedDocsModal.data.data.print = function () {
				window.print();
			};
		};
		vm.supportedDocsModalState = 'show';
	};

	/**
	 * @ngdoc method
	 * @name getSupportedDocuments
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Retrieves a list of docuemts from the content service relating to the
	 * client and program.
	 */
	vm.getSupportedDocuments = function () {
		generalContentService.findByName(contentConstants.component.submitDocs, contentConstants.name.supportDocuments, clientId, submittedApplication.benefitPeriod.programID.programID).then(function (docResponse) {
			if (docResponse.length > 0) {
				vm.supportedDocsModal.data = docResponse[0];
				vm.supportedDocsModal.data.content = $sce.trustAsHtml(vm.supportedDocsModal.data.data);
			}
		});
	};

	/**
	 * @ngdoc method
	 * @name confirmCancelApp
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Displays a modal to ensure the user wants to cancel the application.
	 */
	vm.confirmCancelApp = function () {
		if (vm.isEditStatus || vm.isCancelStatus) {
			vm.confirmCancel = 'show';
			vm.appData = {};
			vm.appData.cancelApplication = function (comments) {
				var applicationStatusObj = {};
				applicationStatusObj.applicationStatusCode = constants.applicationStatus.cancel;
				applicationStatusObj.comment = comments;
				applicationService.cancelApplication(submittedApplication.id, applicationStatusObj).then(function (response) {
					vm.status = 'success';
					$state.go(constants.routes.home);
				}, function (errorResponse) {
					vm.status = 'error';
					vm.message = _.get(errorResponse, 'data.message');
				});
			};
		} 
	};

	/**
	 * @ngdoc method
	 * @name editApplication
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * Routes the current view to the edit application page.
	 */
	vm.editApplication = function () {
		if (vm.isEditStatus) {
			$state.go(constants.routes.summary, {applicationId: submittedApplication.id});
		}
	};

	/**
	 * @ngdoc method
	 * @name toggleStatusHistoryView
	 * @methodOf edAssistApp.controller:submittedApplicationController
	 * @description
	 * SHows and hides the status history section.
	 */
	vm.toggleStatusHistoryView = function () {
		vm.showStatusHistory = true;
		vm.statusHistory.limit = vm.applicationStatusHistory.length;
	};

	vm.isCurrentParticipantApplication = function () {
		if (vm.application) {
			if (vm.application.participantID.participantId === storageService.get('user.userDetails.participantId')) {
				return true;
			}
		}
		return false;
	};

	initialize();
}]);