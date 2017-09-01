'use strict';

angular.module('edAssistApp').constant('contentItems', [{
		'type': {'id': 'email', 'value': 'Emails' },
		'categories': [{
			'cat': {'id': 'participant', 'value': 'Particicpant'}, 
			'names': [{'id': 'appReturnComment', 'value': 'App Return Comment'}, 
				{'id': 'appealStatusUpdateEmailParticipant', 'value': 'Appeal Status'},
				{'id': 'applicationApprovalEmailParticipant', 'value': 'Application Approved(Participant)'},
				{'id': 'applicationClosed', 'value': 'Application Closed'}, 
				{'id': 'applicationDeniedEmailParticipant', 'value': 'Application Denied(Participant)'},
				{'id': 'applIncompleteEmailParticipant', 'value': 'Application Incomplete'},
				{'id': 'appManualEmailParticipant', 'value': 'Application Submitted Pending Review'},
				{'id': 'carryoverPaymentApproved', 'value': 'Carryover Payment Approved'},
				{'id': 'courseCompletion1', 'value': 'Course Completion 1'}, 
				{'id': 'courseCompletion2', 'value': 'Course Completion 2'}, 
				{'id': 'courseCompletion3', 'value': 'Course Completion 3'}, 
				{'id': 'courseCompletion4', 'value': 'Course Completion 4'}, 
				{'id': 'courseCompletion5', 'value': 'Course Completion 5'}, 
				{'id': 'documentReceivedEmailParticipant', 'value': 'Document Received'},
				{'id': 'lOCEmailParticipant', 'value': 'LOC Issued(Participant)'},
				{'id': 'paymentIncompleteEmailParticipant', 'value': 'Payment Incomplete'},
				{'id': 'paymentProcessedEmailParticipant', 'value': 'Payment Processed'},
				{'id': 'passwordResetEmail', 'value': 'Reset Password'},
				{'id': 'savedNotSubmitted', 'value': 'Saved Not Submitted'}, 
				{'id': 'sentToCollections', 'value': 'Sent to Collections'}]
		}, {
			'cat': {'id': 'supervisor', 'value': 'Supervisor'}, 
			'names': [{'id': 'applicationApprovalEmailSupervisor', 'value': 'Application Approved(Supervisor)'},
				{'id': 'applicationDeniedEmailSupervisor', 'value': 'Application Denied(Supervisor)'},
				{'id': 'requiresApprovalEmailSupervisor1', 'value': 'Application Requires Approval(Supervisor 1)'},
				{'id': 'requiresApprovalEmailSupervisor2', 'value': 'Application Requires Approval(Supervisor 2)'},
				{'id': 'lOCEmailSupervisor', 'value': 'LOC Issued(Supervisor)'}]
		}, {
			'cat': {'id': 'appeal', 'value': 'Appeal'}, 
			'names': [{'id': 'appealRequiresReview', 'value': 'Appeal Requires Review'},
				{'id': 'appealStatusUpdate', 'value': 'Appeal Status Update'}]
		}, {
			'cat': {'id': 'dependentStatus', 'value': 'Dependent'}, 
			'names': [{'id': 'approved', 'value': 'Approved'},
				{'id': 'cancelled', 'value': 'Cancelled'},
				{'id': 'denied', 'value': 'Denied'},
				{'id': 'incomplete', 'value': 'Incomplete'},
				{'id': 'submittedPendingReview', 'value': 'Submitted Pending Review'}, 
				{'id': 'forwardedtoApprover', 'value': 'Forwarded to Approver'}]
		}]
	},
	{
		'type': { 'id': 'general', 'value' :'General'},
		'categories': [{
			'cat': {'id': 'login', 'value': 'Login'},
			'names': [{'id': 'webLogo', 'value': 'Client Web Logo'}, 
				{'id': 'mobileLogo', 'value': 'Client Mobile Logo'}, 
				{'id': 'addMobileContent', 'value': 'Add Mobile Content'}, 
				{'id': 'loginInstruction', 'value': 'Login Page Instruction'},
				{'id': 'loginPasswordField', 'value': 'Login Page Password Field'},
				{'id': 'loginUsernameField', 'value': 'Login Username Field'},
				{'id': 'webBackground', 'value': 'Web Background'}]
		}, {
			'cat': {'id': 'applicationStatus', 'value': 'Application Status'},
			'names': [{'id': '90', 'value': 'Saved not submitted'},
				{'id': '100', 'value': 'Submitted Pending Review'},
				{'id': '110', 'value': 'Submitted Incomplete'},
				{'id': '120', 'value': 'Application Approved'},
				{'id': '125', 'value': 'Forwarded to Supervisor for Review'},
				{'id': '135', 'value': 'Carryover payment approved'},
				{'id': '400', 'value': 'LOC Issued'},
				{'id': '425', 'value': 'Payment Review'},
				{'id': '450', 'value': 'Payment Processing Incomplete - Information Needed'},
				{'id': '500', 'value': 'Payment / Reimbursement in progress'},
				{'id': '510', 'value': 'Payment Approved - Funding in progress'},
				{'id': '530', 'value': 'Payment Complete - Completion Documents Required'},
				{'id': '540', 'value': 'Repayment Required'},
				{'id': '545', 'value': 'Sent to Collections'},
				{'id': '900', 'value': 'Application Closed'},
				{'id': '910', 'value': 'Application Cancelled'},
				{'id': '920', 'value': 'Void'},
				{'id': '930', 'value': 'Application Denied'},
				{'id': 'projectedProgramCompletionDate', 'value': 'Projected Program Completion Date'}]
		}, {
			'cat': {'id': 'programDescription', 'value': 'Program Description'},
			'names': [{'id': 'programDescription', 'value': 'Program'}]
		}, {
			'cat': {'id': 'message', 'value': 'Client Messages'},
			'names': [{'id': 'cltParticipantMessage', 'value': 'Participant'},
				{'id': 'cltSupervisorMessage', 'value': 'Supervisor'},
				{'id': 'cltAppealDesigneeMessage', 'value': 'Appeal Designee'},
				{'id': 'cltFullSvcAdminMessage', 'value': 'Client Admin (Full Service)'}]
		}, {
			'cat': {'id': 'home', 'value': 'Home'},
			'names': [{'id': 'dashboard', 'value': 'Dashboard'}]
		}, {
			'cat': {'id': 'applicationStep1', 'value': 'Application Step 1'},
			'names': [{'id': 'step1Intro', 'value': 'Step 1 Intro'}]
		}, {
			'cat': {'id': 'applicationStep2', 'value': 'Application Step 2'},
			'names': [{'id': 'step2Intro', 'value': 'Step 2 Intro'}, 
				{'id': 'applEducationProvSearch', 'value': 'Education Information > Search For Provider'},
				{'id': 'ineligibleProvider', 'value': 'Ineligible Provider'},
				{'id': 'programInformation', 'value': 'Program Information'}, 
				{'id': 'educationProvider', 'value': 'Education Provider'}, 
				{'id': 'degree', 'value': 'Degree'},
				{'id': 'examProvider', 'value': 'Exam Provider'}]
		}, {
			'cat': {'id': 'applicationStep3', 'value': 'Application Step 3'},
			'names': [{'id': 'step3Intro', 'value': 'Step 3 Intro'}, 
				{'id': 'applCourseTax', 'value': 'Add course > Tax information'},
				{'id': 'courseQuestionOne', 'value': 'Add Course > Tax Question 1'},
				{'id': 'courseQuestionTwo', 'value': 'Add Course > Tax Question 2'},
				{'id': 'courseQuestionThree', 'value': 'Add Course > Tax Question 3'},
				{'id': 'applExpenseTax', 'value': 'Add Expense > Tax information'},
				{'id': 'expenseQuestionOne', 'value': 'Add Expense > Tax Question 1'},
				{'id': 'expenseQuestionTwo', 'value': 'Add Expense > Tax Question 2'},
				{'id': 'expenseQuestionThree', 'value': 'Add Expense > Tax Question 3'},
				{'id': 'courseNonTaxablePopUpInfo', 'value': 'Course Non Taxable PopUp Info'},
				{'id': 'courseTaxablePopUpInfo', 'value': 'Course Taxable PopUp Info'},
				{'id': 'expenseNonTaxablePopUpInfo', 'value': 'Expense Non Taxable PopUp Info'},
				{'id': 'expenseTaxablePopUpInfo', 'value': 'Expense Taxable PopUp Info'},
				{'id': 'graduationQuestion', 'value': 'Graduation Question'},
				{'id': 'applSessionInfo', 'value': 'Session Information'},
				{'id': 'sessionInvalidDates', 'value': 'Session Invalid Dates'},
				{'id': 'applicationSaveCourse', 'value': 'Application Save Course'}]
		}, {
			'cat': {'id': 'applicationStep4', 'value': 'Application Step 4'},
			'names': [{'id': 'step4Intro', 'value': 'Step 4 Intro'}, 
				{'id': 'agreement1Text', 'value': 'Agreement 1 Text'}, 
				{'id': 'agreement1Title', 'value': 'Agreement 1 Title'}, 
				{'id': 'agreement1Verification', 'value': 'Agreement 1 Verification'}, 
				{'id': 'agreement2Text', 'value': 'Agreement 2 Text'}, 
				{'id': 'agreement2Title', 'value': 'Agreement 2 Title'}, 
				{'id': 'agreement2Verification', 'value': 'Agreement 2 Verification'}, 
				{'id': 'agreement3Text', 'value': 'Agreement 3 Text'}, 
				{'id': 'agreement3Title', 'value': 'Agreement 3 Title'}, 
				{'id': 'agreement3Verification', 'value': 'Agreement 3 Verification'}, 
				{'id': 'agreementSignatureInstr', 'value': 'Agreement Signature Instructions'},
				{'id': 'applGrantsScholars', 'value': 'Grants & Scholarship Disclosure'}]
		}, {
			'cat': {'id': 'reviewAndSubmit', 'value': 'Review & Submit'},
			'names': [{'id': 'intro', 'value': 'Intro'}]
		}, {
			'cat': {'id': 'companyAppReview', 'value': 'Company App Review'},
			'names': [{'id': 'approvalConfirmationIntro', 'value': 'Approval Confirmation Intro'},
				{'id': 'denialConfirmationIntro', 'value': 'Denial Confirmation Intro'},
				{'id': 'reassignApprovalIntro', 'value': 'Reassign Approval Intro'},
				{'id': 'chgAppStatus', 'value': 'Change Application Status'}]
		}, {
			'cat': {'id': 'contactUs', 'value': 'Contact Us'},
			'names': [{'id': 'contactUs', 'value': 'Contact Us'}]
		}, {
			'cat': {'id': 'eligEventHist', 'value': 'Eligible Event History'},
			'names': [{'id': 'systemCancellation', 'value': 'System Cancellation'}]
		}, {
			'cat': {'id': 'changePassword', 'value': 'Change Password'},
			'names': [{'id': 'changePasswordIntro', 'value': 'Change Password Intro'}]
		}, {
			'cat': {'id': 'myAdvising', 'value': 'My Advising'},
			'names': [{'id': 'pageIntro', 'value': 'Page Intro'}]
		}, {
			'cat': {'id': 'myPersonalProf', 'value': 'My Personal Profile'},
			'names': [{'id': 'myPersonalProfPageIntro', 'value': 'My Personal Profile Page Intro'}]
		}, {
			'cat': {'id': 'providerGuideLines', 'value': 'Provider Guide Lines'},
			'names': [{'id': 'providerGuideLines', 'value': 'Provider Guide Lines'}]
		}, {
			'cat': {'id': 'clientDocuments', 'value': 'Client Resources'},
			'names': [{'id': 'programResources', 'value': 'Program Resources'}]
		}, {
			'cat': {'id': 'site', 'value': 'Site'},
			'names': [{'id': 'privacyPolicy', 'value': 'Privacy Statement'},
				{'id': 'termsAndConditions', 'value': 'Terms & Conditions'},
				{'id': 'lOCTemplate', 'value': 'LOC Template'},
				{'id': 'submitDocsIntro', 'value': 'Submit Docs Intro'}, 
				{'id': 'submitDocsAdditionalInfo', 'value': 'Submit Docs Additional Info'}]
		}, {
			'cat': {'id': 'faxCoverSheet', 'value': 'Fax Cover Sheet'},
			'names': [{'id': 'instructions', 'value': 'Instructions'}]
		}]
	}]);