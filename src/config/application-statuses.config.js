'use strict';

angular.module('edAssistApp').constant('applicationStatuses', {
	mappings: {
		'90': {
			color: 'gray',
			adminColor: 'gray',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.SUBMIT_CANCEL',
			state: 'summary'
		},
		'95': {
			color: 'gray',
			adminColor: 'gray',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'100': {
			color: 'gray',
			adminColor: 'yellow',
			icon: 'icon-statusReview',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'110': {
			color: 'red',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.COMPLETE_APPLICATION',
			state: 'submittedApplication'
		},
		'120': {
			color: 'green',
			adminColor: 'yellow',
			icon: 'icon-statusApproved',
			linkMessage: 'HOME.TASKLIST.UPLOAD_DOCUMENTS',
			state: 'submittedApplication'
		},
		'125': {
			color: 'gray',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.REVIEW_APPLICATION',
			state: 'submittedApplication'
		},
		'130': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'135': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'300': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'301': {
			color: 'red',
			adminColor: 'red',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'400': {
			color: 'green',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.LETTER_OF_CREDIT',
			state: 'submittedApplication'
		},
		'425': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusReview',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'450': {
			color: 'red',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.COMPLETE_APPLICATION',
			state: 'submittedApplication'
		},
		'500': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'510': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'520': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'530': {
			color: 'green',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.UPLOAD_DOCUMENTS',
			state: 'submittedApplication'
		},
		'540': {
			color: 'red',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.REVIEW_POLICY',
			state: 'submittedApplication'
		},
		'545': {
			color: 'red',
			adminColor: 'gray',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.REPAYMENT_OWED',
			state: 'submittedApplication'
		},
		'710': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'715': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'720': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'900': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'910': {
			color: 'grayLight',
			adminColor: 'grayLight',
			icon: 'icon-statusCancelled',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'920': {
			color: 'gray',
			adminColor: 'gray',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'930': {
			color: 'red',
			adminColor: 'red',
			icon: 'icon-statusDenied',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'default': {
			color: 'gray',
			adminColor: 'gray',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'APPROVE': {
			color: 'green',
			adminColor: 'gray',
			icon: 'icon-statusApproved',
			linkMessage: 'HOME.TASKLIST.UPLOAD_DOCUMENTS',
			state: ''
		},
		'DENY': {
			color: 'red',
			adminColor: 'red',
			icon: 'icon-statusDenied',
			linkMessage: '',
			state: ''
		},
		'Bypassed': {
			color: 'yellow',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: '',
			state: ''
		},
		'Pending': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: 'submittedApplication'
		},
		'Application cancelled': {
			color: 'gray',
			adminColor: 'gray',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.SUBMIT_CANCEL',
			state: 'cancelled'
		},
		'Approved': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: ''
		},
		'Application approved': {
			color: 'green',
			adminColor: 'green',
			icon: 'icon-statusApproved',
			linkMessage: '',
			state: ''
		},
		'INCOMPLETE': {
			color: 'red',
			adminColor: 'red',
			icon: 'icon-statusDenied',
			linkMessage: '',
			state: ''
		},
		'reviewableComment': {
			color: 'yellow',
			adminColor: 'yellow',
			icon: 'icon-statusComplete',
			linkMessage: 'HOME.TASKLIST.REVIEWABLE_COMMENT',
			state: ''
		}
	}
});