'use strict';

angular.module('edAssistApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'constants', '$uiViewScrollProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, constants, $uiViewScrollProvider) {

// Each page state needs following to each state as an example: "data : { pageTitle: 'Schedule Appointment' } - it dynamically adds content to title tags for ADA Compliance.

	$stateProvider
	.state(constants.routes.home, {
		url: '/' + constants.routes.home,
		controller: 'homeController',
		templateUrl: 'src/components/home/home.html',
		controllerAs: 'homeCtrl',
		data: { pageTitle: 'Home' }
	})
	.state(constants.routes.advising, {
		url: '/advising',
		controller: 'advisingController',
		templateUrl: 'src/components/advising/advising.html',
		controllerAs: 'advisingCtrl',
		data: { pageTitle: 'Advising' }
	})
	.state(constants.routes.scheduleAppointment, {
		url: '/scheduleAppointment',
		data: { pageTitle: 'Schedule Appointment' },
		views: {
			'scheduleAppointmentView': {
				controller: 'scheduleAppointmentController',
				templateUrl: 'src/components/advising/schedule-appointment.html',
				controllerAs: 'scheduleAppointmentCtrl'
			}
		}
	})
	.state(constants.routes.employmentEducation, {
		url: '/employmentEducation',
		data: { pageTitle: 'Employment Education' },
		params: {advisingAppointment : null},
		views: {
			'subNavView': {
				controller: 'employmentEducationController',
				templateUrl: 'src/components/advising/employment-education.html',
				controllerAs: 'employmentEducationCtrl'
			}
		}
		
	})
	.state(constants.routes.scheduleContactInformation, {
		url: '/scheduleContactInformation',
		data: { pageTitle: 'Schedule Contact Information' },
		params: {advisingAppointment : null},
		views: {
			'subNavView': {
				controller: 'contactInfoController',
				templateUrl: 'src/components/advising/contact-information.html',
				controllerAs: 'contactInfoCtrl'
			}
		}
	})
	.state(constants.routes.appointmentCalendar, {
		url: '/appointmentCalendar',
		data: { pageTitle: 'Appointment Calender' },
		params: {advisingAppointment : null},
		views: {
			'subNavView': {
				controller: 'appointmentCalendarController',
				templateUrl: 'src/components/advising/appointment-calendar.html',
				controllerAs: 'appointmentCalendarCtrl'
			}
		}
	})
	.state(constants.routes.reviewAndSubmitAppointment, {
		url: '/reviewAndSubmitAppointment',
		data: { pageTitle: 'Review and Submit Appointment' },
		params: {advisingAppointment : null},
		views: {
			'subNavView': {
				controller: 'reviewAndSubmitAppointmentController',
				templateUrl: 'src/components/advising/review-and-submit-appointment.html',
				controllerAs: 'reviewAndSubmitAppointmentCtrl'
			}
		}
	})
	.state(constants.routes.submitAppointmentConfirmation, {
		url: '/submitAppointmentConfirmation',
		data: { pageTitle: 'Submit Appointment Confirmation' },
		params: {submissionStatus : null},
		views: {
			'scheduleAppointmentView': {
				controller: 'submitAppointmentConfirmationController',
				templateUrl: 'src/components/advising/submit-appointment-confirmation.html',
				controllerAs: 'submitAppointmentConfirmationCtrl'
			}
		}
	})
	.state(constants.routes.updateAppointmentConfirmation, {
		url: '/updateAppointmentConfirmation',
		data: { pageTitle: 'Update Appointment Confirmation' },
		params: {updateStatus : null},
		views: {
			'scheduleAppointmentView': {
				controller: 'updateAppointmentConfirmationController',
				templateUrl: 'src/components/advising/update-appointment-confirmation.html',
				controllerAs: 'updateAppointmentConfirmationCtrl'
			}
		}
	})
	.state(constants.routes.login, {
		url: '/' + constants.routes.login,
		data: { pageTitle: 'Login' },
		controller: 'loginController',
		templateUrl: 'src/components/login/login.html',
		css: {
			href: 'dist/css/pages/login.css'
		},
		controllerAs: 'loginCtrl',
		unauthState: true
	})
	.state(constants.routes.ssoLogin, {
		url: '/' + constants.routes.ssoLogin,
		data: { pageTitle: 'SSO Login' },
		controller: 'ssoLoginController',
		templateUrl: 'src/components/sso-login/sso-login.html',
		controllerAs: 'ssoLoginCtrl',
		unauthState: true
	})
	.state(constants.routes.nonsso, {
		url: '/' + constants.routes.nonsso,
		data: { pageTitle: 'Login' },
		params: {'nonSsoOverride': true},
		controller: 'loginController',
		templateUrl: 'src/components/login/login.html',
		controllerAs: 'loginCtrl',
		unauthState: true
	})
	.state(constants.routes.ssoLogout, {
		url: '/' + constants.routes.ssoLogout,
		data: { pageTitle: 'SSO Logout' },
		params: {ssoLogOffEnabled: false},
		controller: 'logoutController',
		templateUrl: 'src/components/logout/ssoLogout.html',
		controllerAs: 'logoutCtrl',
		unauthState: true
	})
	.state(constants.routes.forgotPwd, {
		url: '/' + constants.routes.forgotPwd,
		data: { pageTitle: 'Forgot Password' },
		params: {contentName: null, logoPath: null},
		controller: 'forgotPasswordController',
		templateUrl: 'src/components/login/forgot-password.html',
		controllerAs: 'forgotPasswordCtrl',
		unauthState: true
	})
	.state(constants.routes.changePassword, {
		url: '/' + constants.routes.changePassword + '/{userId}',
		data: { pageTitle: 'Change Password' },
		controller: 'changePasswordController',
		templateUrl: 'src/components/profile/change-password.html',
		controllerAs: 'changePasswordCtrl'
	})
	.state(constants.routes.profile, {
		url: '/' + constants.routes.profile + '/{participantId}',
		data: { pageTitle: 'Profile' },
		controller: 'profileController',
		templateUrl: 'src/components/profile/profile.html',
		controllerAs: 'profileCtrl'
	})
	.state(constants.routes.generalError, {
		url: '/' + constants.routes.generalError,
		data: { pageTitle: 'System Wide' },
		templateUrl: 'src/components/errors/system-wide.html',
		unauthState: true
	})
	.state(constants.routes.generalSsoError, {
		url: '/' + constants.routes.generalSsoError,
		data: { pageTitle: 'System SSO Error' },
		templateUrl: 'src/components/errors/system-sso-error.html',
		unauthState: true
	})
	.state('application', {
		url: '/' + constants.routes.application,
		templateUrl: 'src/components/application/application.html',
		css: {
			href: 'dist/css/pages/newApplication.css'
		},
		data: { pageTitle: 'Application' },
		controller: 'applicationController',
		controllerAs: 'applicationCtrl'
	})
	.state(constants.routes.contactInformation, {
		url: '/contactInformation/{applicationId}/{participantId}',
		data: { pageTitle: 'Contact Information' },
		controller: 'contactInformationController',
		templateUrl: 'src/components/application/contact-information.html',
		controllerAs: 'contactInformationCtrl',
		resolve: {
			checkEligibility: function ($q, participantService, $stateParams) {
				var defer = $q.defer();
				participantService.getParticipantEligibility($stateParams.participantId).then(function () {
					defer.resolve();
				}, function (errorResponse) {
					defer.reject(errorResponse);
				});
				return defer.promise;
			}
		}
	})
	.state(constants.routes.educationInformation, {
		url: '/educationInformation/{applicationId}/{participantId}',
		data: { pageTitle: 'Education Information' },
		params: { newSelectedProgramId: null},
		controller: 'educationInformationController',
		templateUrl: 'src/components/application/education-information.html',
		controllerAs: 'educationInformationCtrl'
	})
	.state(constants.routes.courses, {
		url: '/courses/{applicationId}',
		data: { pageTitle: 'Courses & Information' },
		controller: 'coursesController',
		templateUrl: 'src/components/application/courses.html',
		controllerAs: 'coursesCtrl'
	})
	.state(constants.routes.agreement, {
		url: '/agreement/{applicationId}',
		data: { pageTitle: 'New Application - Agreement' },
		controller: 'agreementController',
		templateUrl: 'src/components/application/agreement.html',
		controllerAs: 'agreementCtrl'
	})
	.state(constants.routes.summary, {
		url: '/summary/{applicationId}',
		data: { pageTitle: 'Summary', hideForResolve: true  },
		controller: 'summaryController',
		templateUrl: 'src/components/application/summary/summary.html',
		controllerAs: 'summaryCtrl',
		resolve: {
			submittedApplication: ['$stateParams', 'applicationService', function ($stateParams, applicationService) {
				return applicationService.getSubmittedApplication($stateParams.applicationId).then(function (response) {
					return response.plain();
				});
			}],
			applicationSnapShot: ['$stateParams', 'applicationService', function ($stateParams, applicationService) {
				return applicationService.applicationSnapShot($stateParams.applicationId).then(function (response) {
					return response.plain();
				});
			}]
		}
	})
	.state(constants.routes.managerReview, {
		url: '/manager-review/{applicationId}',
		data: { pageTitle: 'Manager Review', hideForResolve: true },
		controller: 'managerReviewController',
		templateUrl: 'src/components/application/review/manager-review.html',
		controllerAs: 'managerReviewCtrl',
		resolve: {
			submittedApplication: ['$stateParams', 'applicationService', function ($stateParams, applicationService) {
				return applicationService.getSubmittedApplication($stateParams.applicationId).then(function (response) {
					return response.plain();
				});
			}],
			applicationSnapShot: ['$stateParams', 'applicationService', function ($stateParams, applicationService) {
				return applicationService.applicationSnapShot($stateParams.applicationId).then(function (response) {
					return response.plain();
				});
			}]
		}
	})
	.state(constants.routes.submissionConfirmation, {
		url: '/submission-confirmation',
		data: { pageTitle: 'Submission Confirmation' },
		params: {programId: null, applicationStatus: null},
		controller: 'submissionConfirmationController',
		templateUrl: 'src/components/application/submission-confirmation.html',
		controllerAs: 'submissionConfirmationCtrl'
	})
	.state(constants.routes.history, {
		url: '/history/{participantId}',
		data: { pageTitle: 'Application History' },
		params: {fromClientAdmin: false},
		templateUrl: 'src/components/history/history.html',
		css: {
			href: 'dist/css/pages/history.css'
		},
		controller: 'historyController',
		controllerAs: 'historyCtrl'
	})
	.state(constants.routes.support, {
		url: '/support',
		data: { pageTitle: 'Support' },
		controller: 'supportController',
		templateUrl: 'src/components/support/support.html',
		controllerAs: 'supportCtrl'
	})
	.state(constants.routes.submittedApplication, {
		url: '/' + constants.routes.submittedApplication + '/{applicationId}',
		data: { pageTitle: 'Submitted Application', hideForResolve: true  },
		params : {'programId': '{programId}'},
		controller: 'submittedApplicationController',
		templateUrl: 'src/components/submitted-application/submitted-application.html',
		controllerAs: 'submittedAppCtrl',
		resolve: {
			submittedApplication: ['$stateParams', 'applicationService', function ($stateParams, applicationService) {
				return applicationService.getSubmittedApplication($stateParams.applicationId).then(function (response) {
					return response.plain();
				});
			}],
			agreementContent: ['contentConstants', 'storageService', 'submittedApplication', 'generalContentService', function (contentConstants, storageService, submittedApplication, generalContentService) {
				var clientId = storageService.get('client.clientLoginDetails.clientId');
				return generalContentService.getAgreements(contentConstants.component.applicationStep4, clientId, contentConstants.program.clientDefault, true, submittedApplication.agreementsDate).then(function (response) {
					return response.agreementsList;
				});
			}],
			applicationSnapShot: ['$stateParams', 'applicationService', function ($stateParams, applicationService) {
				return applicationService.applicationSnapShot($stateParams.applicationId).then(function (response) {
					return response.plain();
				});
			}]
		}
	})
	.state(constants.routes.footerDetails, {
		url: '/' + constants.routes.footerDetails + '/{detailsHeader}/{detailsName}',
		data: { pageTitle: 'Footer Details' },
		controller: 'footerDetailsController',
		templateUrl: 'src/components/common/footer-details.html',
		controllerAs: 'footerDetailsCtrl'
	})
	.state(constants.routes.admin, {
		url: '/' + constants.routes.admin,
		params: { contentAdded: false },
		data: { pageTitle: 'Content Admin', 
			authorization: { permissions: [constants.userType.superAdmin, constants.userType.admin] }},
		controller: 'adminController',
		templateUrl: 'src/components/admin/content-admin.html',
		controllerAs: 'adminCtrl',
		resolve: {
			contentTypes: ['contentService', function (contentService) {
				return contentService.getTypeKeys('collection').then(function (response) {
					return response.plain();
				});
			}],
			clients: ['clientService', function (clientService) {
				return clientService.getClients().then(function (response) {
					return response.plain();
				});
			}]
		}
	})
	.state(constants.routes.systemAdmin, {
		url: '/' + constants.routes.systemAdmin,
		data: { pageTitle: 'System Admin',
			authorization: { permissions: [constants.userType.superAdmin, constants.userType.admin], redirectState: constants.routes.admin, }},
		controller: 'systemAdminController',
		templateUrl: 'src/components/admin/system-admin.html',
		controllerAs: 'systemAdminCtrl'
	})
	.state(constants.routes.manageContent, {
		url: '/manageContent',
		controller: 'manageContentController',
		data: { pageTitle: 'Manage Content',
			authorization: { permissions: [constants.userType.superAdmin, constants.userType.admin], redirectState: constants.routes.admin }},
		templateUrl: 'src/components/admin/manage-content.html',
		controllerAs: 'manageContentCtrl',
		css: {
			href: 'dist/css/textAngular.css'
		}
	})
	.state(constants.routes.monitor, {
		url: '/monitor',
		controller: 'monitorController',
		data: { pageTitle: 'Monitor',
			authorization: { permissions: [constants.userType.superAdmin], redirectState: constants.routes.admin}},
		templateUrl: 'src/components/admin/monitor/monitor.html',
		controllerAs: 'monitorCtrl'
	})
	.state(constants.routes.clientAdmin, {
		url: '/' + constants.routes.clientAdmin,
		data: { pageTitle: 'Client Admin' },
		controller: 'clientAdminController',
		templateUrl: 'src/components/client-admin/client-admin.html',
		controllerAs: 'clientAdminCtrl',
		resolve: {
			clientAdminData: ['storageService', function (storageService) {
				return storageService.get('clientAdminSearchModel');
			}]
		}
	})
	.state(constants.routes.clientAdminTicket, {
		url: '/' + constants.routes.clientAdminTicket,
		data: { pageTitle: 'Client Admin Ticket' },
		params: {ticketsList: null, participantName: null},
		controller: 'clientAdminTicketController',
		templateUrl: 'src/components/client-admin/client-admin-ticket.html',
		controllerAs: 'clientAdminTicketCtrl'
	});
		
	$urlRouterProvider.otherwise('/' + constants.routes.home);
	
	// enables auto-scroll=true to scroll to top of page on state change
	$uiViewScrollProvider.useAnchorScroll(); 

}]);