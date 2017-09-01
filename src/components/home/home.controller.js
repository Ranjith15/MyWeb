'use strict';


/**
 * @ngdoc controller
 * @name edAssistApp.controller:homeController
 * @description
 * Home page controller to render the sidebar as well as the main page components
 */
angular.module('edAssistApp').controller('homeController',
	['$sce', '$state', '$scope', 'contentConstants', 'constants', 'advisingService', 'generalContentService', 'storageService', 'userService', 'participantService', 'applicationService', 'programService', '$q', 'educationProgramService', 'capInfoService',
	function ($sce, $state, $scope, contentConstants, constants, advisingService, generalContentService, storageService, userService, participantService, applicationService, programService, $q, educationProgramService, capInfoService) {

	var vm = this;
	vm.status = 'submitting';
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	var participantId = storageService.get('user.userDetails.participantId');
	vm.currentPage = 1;
	vm.recordsPerPage = 5;
	vm.maxSize = 2;
	vm.view = 'taskList';
	vm.advisingEnabled = storageService.get('client.clientLoginDetails.selfScheduledAdvising');
	vm.clientNetworkUrlEnabled = storageService.get('client.clientLoginDetails.enhancedEdAssistNetwork');
	vm.clientNetworkUrl = storageService.get('client.clientLoginDetails.clientNetworkURL');
	vm.nextAppointment = null;
	vm.appointmentLoaded = 'loading';

	vm.benefits = {
		programs: {},
		degrees:  {},
		periods:  {}
	};

	advisingService.getAdvisingAppointments().then(function (response) {
		var appointments = response.plain();

		vm.nextAppointment = _.chain(appointments).orderBy('sessionDate').filter(function (appointment) {
			var currentDate = new Date();
			var appointmentDateTime = new Date(appointment.appointment);

			return (appointmentDateTime > currentDate && (appointment.status === constants.advising.appointmentStatus.code.open || appointment.status === constants.advising.appointmentStatus.code.scheduled));
			
		}).value()[0];

		vm.appointmentLoaded = 'success';
	}, function (errorResponse) {
		vm.appointmentLoaded = 'error';
	});

	var init = function (benefits) {
		for (var selector in benefits) {
			benefits[selector] = {
				selected: 'Select',
				options: [],
				isopen: false,
				loading: false,
				disabled: false
			};
		}
		return benefits;
	};

	var load = function (benefits) {
		benefits.programs.loading = true; 
		educationProgramService.getAvailableProgramData(participantId).then(function (programs) {
			_.forEach(programs, function (program) {
				benefits.programs.options.push({
					label: program.programName,
					id: program
				});
			});
			benefits.programs.loading = false;
		});
	};


	/**
	 * @ngdoc method
	 * @name reloadBenefits
	 * @methodOf edAssistApp.controller:homeController
	 * @description
	 * Retrieves the participant's programs, and resets the other drop downs that depend on it
	 */
	vm.reloadBenefits = function (program) {
		vm.benefits.degrees.loading = true;
		vm.benefits.periods.loading = true;
		vm.benefits.programs.disabled = true;

		// reset degrees and benefit period drop downs
		_.unset(vm, 'benefits.degrees.selected');
		_.unset(vm, 'benefits.periods.selected');

		var getDegrees = programService.getDegreeObjectives;
		var getPeriods = function (id) {
			return participantService.getBenefitPeriodFilterOptions({ teamMemberType: 'me', 'defaultBenefitPeriodId': _.get(program, 'id.defaultBenefitPeriodID') }, id).then(function (response) {
				return response.slice(1); // remove 'All' item
			});			
		};
		var requests = [
			getDegrees(program.id.programID),
			getPeriods(participantId),
		];

		$q.all(requests).then(function (result) {
			vm.benefits.degrees.loading = false;
			vm.benefits.degrees.options = result[0].map(function (e) {
				return {
					label: e.degree,
					id: e.degreeObjectiveID
				};
			});
			vm.benefits.periods.loading = false;
			vm.benefits.periods.options = result[1].map(function (e) {
				return {
					label: e.display,
					id: e.value
				};
			});
			vm.benefits.programs.disabled = false;
		});		
	};

	$q.when(vm.benefits)
		.then(init)
		.then(load);

	vm.chart = capInfoService.initialState;

	/**
	 * @ngdoc method
	 * @name repaintChart
	 * @methodOf edAssistApp.controller:homeController
	 * @description
	 * Retrieves the participant's cap data, and repaints the chart.
	 */
	vm.repaintChart = function () {
		if (_.get(vm, 'benefits.periods.selected.id')) {
			capInfoService.getParticipantCapInfo(participantId, vm.benefits.programs.selected.id.programID, vm.benefits.degrees.selected.id, vm.benefits.periods.selected.id).then(function (response) {
				vm.dashboardAppTotal = response.appCount;
				vm.chart = capInfoService.getChartData(response.plain(), vm.benefits.programs.selected.id);
			});
		}
	};

	vm.onApplicationActionClick = function (application) {
		if (application.applicationStatus.applicationStatusID === constants.applicationStatus.forwardedToSupervisor && vm.userDetails.participantId !== application.participantId) {
			$state.go(constants.routes.managerReview, {applicationId: application.applicationID});
		} else if (application.applicationStatus.applicationStatusID === constants.applicationStatus.saved && vm.userDetails.participantId === application.participantId) {
			$state.go(constants.routes.summary, {applicationId: application.applicationID});
		} else {
			$state.go(constants.routes.submittedApplication, {applicationId: application.applicationID});
		}
	};

	vm.policyDocuments = {
		header: 'HOME.BENEFITS.HEADER',
		status: 'submitting',
		error: '', 
		list: []
	};

	generalContentService.getEligiblePolicyDocuments(clientId, participantId).then(function (documents) {
		vm.policyDocuments.status = 'success';
		vm.policyDocuments.list = documents;
	}, function (errorResponse) {
		vm.policyDocuments.status = 'error';
		vm.policyDocuments.error = _.get(errorResponse, 'data.message');
	});

	/* Service call for Program and Benefits description */
	generalContentService.findByName('home', 'info', clientId, 'clientDefault', true).then(function (response) {
		vm.programBenefitsDescription = _.get(response, '[0].data');
	});

	vm.userDetails = storageService.get('user.userDetails');
	vm.lastLogin = vm.userDetails.mostRecentLogin; 

	vm.newMessages = [];
	vm.oldMessages = [];
	vm.statusMessages = 'submitting';

	vm.inbox = {
		open: false,
		newCount: 0,
		statusMessages: 'submitting',
		messages: []
	};	


	/* first get pure participant messages */
	generalContentService.findByComponent(contentConstants.component.message, clientId, contentConstants.program.clientDefault, false).then(function (response) {
		vm.statusMessages = 'success';
		vm.inbox.statusMessages = 'success';
		vm.inbox.messages = response;		
		_.each(vm.inbox.messages, function (message) {
			message.translatedContent = $sce.trustAsHtml(message.data);
			message.open = false;
			if (vm.lastLogin < message.startDate) {
				message.old = false;
				vm.inbox.newCount++;
				vm.newMessages.push(message);
			} else {
				message.old = true;
				vm.oldMessages.push(message);
			}
		});
		if ($scope.inboxOpened) {
			vm.inbox.newCount = 0;
		}
		if (vm.inbox.messages.length > 0) {
			vm.inbox.messages[0].open = true;
		}

	}, function (errorResponse) {
		vm.statusMessages = 'error';
		vm.messageMessages = _.get(errorResponse, 'data.message');
	});

	/* finally, leave a bookmark in the database so that we know where to start next time */
	userService.bookmarkSuccessfulLogin(vm.userDetails.userId).then(function (response) {
	}, function (errorResponse) {
		vm.status = 'error';
		vm.statusCode = _.get(errorResponse, 'status');
		vm.message = _.get(errorResponse, 'data.message');
	});

	vm.getTaskList = function () {
		vm.status = 'loading';
		participantService.getParticipantTasklist(vm.userDetails.participantId, vm.currentPage, vm.recordsPerPage).then(function (response) {
			vm.status = 'success';
			vm.totalItems = _.get(response, 'pagination.total');
			vm.tasklist = applicationService.sortByStatusCode(_.get(response, 'applications'), constants.applicationStatus.forwardedToSupervisor);
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	vm.onAdvisingClick = function () {
		$state.go(constants.routes.employmentEducation);
	};

	vm.getTaskList();
}]);
