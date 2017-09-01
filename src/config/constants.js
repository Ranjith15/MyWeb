'use strict';

angular.module('edAssistApp').constant('constants', {
	routes: {
		home: 'home',
		advising: 'advising',
		login: 'login',
		ssoLogout: 'ssoLogout',
		forgotPwd: 'forgotPassword',
		changePassword: 'changePassword',
		profile: 'profile',
		history: 'history',
		academicResources: 'academicResources',
		support: 'support',
		generalError: 'error',
		generalSsoError: 'ssoError',
		application: 'application',
		contactInformation: 'application.contactInformation',
		educationInformation: 'application.educationInformation',
		courses: 'application.courses',
		agreement: 'application.agreement',
		summary: 'application.summary',
		review: 'review',
		managerReview: 'managerReview',
		submittedApplication: 'submittedApplication',
		submissionConfirmation: 'submissionConfirmation',
		footerDetails: 'footerDetails',
		nonsso: 'nonsso',
		ssoLogin: 'ssoLogin?code',
		admin: 'admin',
		systemAdmin: 'systemAdmin',
		manageContent: 'manageContent',
		monitor: 'monitor',
		clientAdmin: 'clientAdmin',
		clientAdminTicket: 'clientAdmin/tickets',
		scheduleAppointment: 'advising.scheduleAppointment',
		employmentEducation: 'advising.scheduleAppointment.employmentEducation',
		scheduleContactInformation: 'advising.scheduleAppointment.scheduleContactInformation',
		appointmentCalendar: 'advising.scheduleAppointment.appointmentCalendar',
		reviewAndSubmitAppointment: 'advising.scheduleAppointment.reviewAndSubmitAppointment',
		submitAppointmentConfirmation : 'advising.submitAppointmentConfirmation',
		updateAppointmentConfirmation : 'advising.updateAppointmentConfirmation'
	},
	urls: {
		restBase: '/* @echo api */',
		cdnBase: '/* @echo cdn */',
		ssoEndpoint: '/* @echo ssoEndpoint */'
	},
	patterns: {
		email: /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/,
		password: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\W)(?!.*[_])/,
		phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
		currency: /^((\d+)$|(\d+\.\d{2}?))$/,
		studentId: /^[-@./#&+\w\s]*$/,
		numeric: /^[0-9]{1,7}$/,
		decimal: /^\d+(\.\d{1,2})?$/,
		alphanumeric: /^[a-zA-Z0-9]+$/,
		date: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\d{4}/ // mm/dd/yyyy
	},
	vars: {
		recordsPerPage: 5,
		googleAnalytics: 'UA-52850747-3'
	},
	userType: {
		participant: 2,
		supervisor: 3,
		clientAdmin: 7,
		superAdmin: 85,
		admin: 35
	},
	applicationStatus : {
		saved: 90,
		pendingReview: 100,
		incomplete: 110,
		approved: 120,
		forwardedToSupervisor: 125,
		paymentInProgress: 500,
		paymentComplete: 530,
		closed: 900,
		cancel: 910,
		denied: 930,
		void: 920
	},
	certifications: {
		programTypeID: 11
	},
	documentTypes: {
		grades : 505,
		gradesName : 'grades'
	},
	topics: {
		clientAdminTopicId: '55719b8f-2327-e611-8c0f-005056994e22'
	},
	errors: {
		noCoursesForExpense: 'A course has to be created before an expense',
		oneCourseForExpense : 'A course cannot be deleted before other expenses',
		missingRequiredFields : 'Required fields are missing',
		addAtleastOneCourse : 'Please add at least one course before you proceed',

		agreementSignatureerror: 'To accept agreement(s), you must type your name exactly as it appears above',
		agreementValidationerror: 'Required fields are missing', //TODO remove and use missingRequiredFields if needed
		appointmentSlotValidationError: 'Please select an appointment date and time.',

		missingTaxInformation: 'Tax Information Required',
		contentExists: 'Content item already exists. Please edit in the content table view'
	},
	referenceData: {
		rfsaofs : 'RFSAOFS',
		hloee : 'HLOEE',
		loeaycs : 'LOEAYCS',
		iwayitp : 'IWAYITP',
		noyicp : 'NOYICP',
		yope : 'YOPE',
		ywce : 'YWCE',
		ces : 'CES'
	},
	advising: {
		categoryId: {
			academicCategory : '1',
			financialCategory : '2',
			financialCategoryId1 : '881840003',
			financialCategoryId2 : '881840004',
			policyCategoryId : '881840005'
		},
		categoryDescription: {
			academicAdvising : 'Academic Advising',
			financialAdvising : 'Financial Advising'
		},
		appointmentStatus: {
			code: {
				open : 0,
				closed : 1,
				cancelled : 2,
				scheduled : 3
			},
			description: {
				open : 'Open',
				closed : 'Closed',
				cancelled : 'Cancelled',
				scheduled : 'Scheduled'

			}
		}
	},
	wysiwigButtons: [
		['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'quote'],
		['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
		['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent', 'html', 'insertLink']
	],
	applicationStatusTypes: {
		general: '1'
	},
	timezone: 'America/Denver',
	phoneTypes: {
		home: 'Home',
		work: 'Work',
		mail: 'Mail',
		other: 'Other'
	}
});
