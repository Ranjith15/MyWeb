'use strict';

angular.module('edAssistApp').config(['$translateProvider', function ($translateProvider) {
	$translateProvider.translations('en', {
		'GENERAL' : {
			'CONTINUE' : 'Continue',
			'CANCEL' : 'Cancel',
			'SAVE' : 'Save',
			'CHANGE_PASSWORD' : 'Change Password',
			'HEADER' : 'Header',
			'OK': 'OK',
			'PAGE_TITLE': 'EdAssist',
			'YES' : 'Yes',
			'NO' : 'No',
			'EDIT' : 'Edit',
			'REMOVE' : 'Remove',
			'NAME' : 'Name',
			'PHONE' : 'Phone',
			'EMAIL' : 'Email',
			'SEARCH' : 'Search',
			'HOME' : 'Return to Home Page',
			'CLOSE' : 'close',
			'SAVED' : 'Section Saved',
			'APPLICATION' : 'Application',
			'LOGO' : 'logo',
			'OF' : 'of',
			'ADDITIONAL' : '- Additional',
			'SUBMITTED' : 'Submitted',
			'CLEAR': 'Clear',
			'EXPORT': 'Export',
			'MORE_BUTTON' : 'View More',
			'NEW' : 'New',
			'SKIP_TO_MAIN_CONTENT' : 'Skip to Main Content',
			'CLICK_HERE' : 'click here',
			'TOTAL' : 'Limit',
			'DROPDOWN_DEFAULT': 'Select',
			'UNDERSTOOD' : 'UNDERSTOOD',
			'MORE_INFO' : 'More Information'
		},
		'ERRORS': {
			'VALIDATION': {
				'MISSING_REQUIRED_FIELDS': 'Please respond to all questions.'
			}
		},
		'LOGIN' : {
			'FORGOT_PASSWORD' : 'Forgot Password',
			'CREATE_PASSWORD' : 'Create Password',
			'LOGIN': 'Log In',
			'LOGIN_HELP': 'Need help logging in?',
			'REMEMBER' : 'Remember Me',
			'FIRST_TIME' : 'First time here?'
		},
		'LOGOUT' : {
			'SSO_LOGOUT' : 'You have been logged out of EdAssist.',
			'HELP_TEXT' : 'Click the button to log back in, or close the window to exit.',
			'SSO_CUSTOM_LOGOUT' : 'You have been logged out of EdAssist. Please close your browser to complete the logout process.' //ED-6727
		},
		'FORGOT_PASSWORD' : {
			'SEND_PASSWORD' : 'Send Password',
			'HELP_TEXT' : 'Enter the email address associated with your account and we\'ll email you a temporary password.',
			'PLACEHOLDER' : {
				'EMAIL' : 'Email'
			},
			'SUCCESS_HEADER': 'Check your email',
			'SUCCESS_BODY': 'A link to reset your password has been sent to'
		},
		'CREATE_PASSWORD' : {
			'HELP_TEXT' : 'In order to access your account, please enter an email address associated with your employer. Upon submitting a valid email address, you will be sent an email with a temporary password. Once you reset your password, you will be able to login.',
			'PLACEHOLDER' : {
				'EMAIL' : 'Email'
			}
		},
		'CHANGE_PASSWORD' : {
			'SUBMIT' : 'Submit',
			'HEADER' : 'Change Password',
			'PLACEHOLDER' : {
				'CURRENT_PASSWORD' : 'Current Password',
				'NEW_PASSWORD' : 'New Password',
				'CONFIRM_PASSWORD' : 'Confirm New Password'
			}
		},
		'HOME' : {
			'APPLICATION' : {
				'NEW_APPLICATION' : 'New Application'
			},
			'BENEFITS' : {
				'HEADER' : 'Using Your Tuition Benefits',
				'NO_DOCUMENTS' : 'Currently there are no available documents.'
			},
			'DASHBOARD' : {
				'HOMEPAGE_DASHBOARD' : 'Homepage Dashboard',
				'HEADER' : 'Dashboard'
			},
			'TASKLIST' : {
				'HEADER' : 'Action Needed',
				'REVIEW_APPLICATION' : 'Review Application',
				'APPLICATION_UNDER_REVIEW' : 'Application Under Review',
				'SESSION_START' : 'Session Start Date:',
				'SESSION_START_FIELD' : 'Please fill out session start date field',
				'SESSION_END_FIELD' : 'Please fill out session end date field',
				'GRADUATION_DATE_FIELD' : 'Please fill out graduation date field',
				'COURSE_NUMBER_FIELD' : 'Please fill out course number field',
				'COURSE_NAME_FIELD' : 'Please fill out course name field',
				'TUITION_AMOUNT_FIELD' : 'Please fill out tuition amount field',
				'INSTRUCTION_TYPE_FIELD' : 'Please fill out instruction type field',
				'LAST_MODIFIED' : 'Last Modified',
				'SUBMIT_CANCEL' : 'Submit or Cancel',
				'SUBMIT_DATE' : 'Submitted Date',
				'COMPLETE_APPLICATION' : 'Complete Application',
				'UPLOAD_DOCUMENTS' : 'Upload Documents',
				'LETTER_OF_CREDIT' : 'Access Letter of Credit',
				'REVIEW_POLICY' : 'Review Policy',
				'REPAYMENT_OWED' : 'Repayment Owed',
				'NO_APPLICATIONS' : 'Currently there are no outstanding action items, please click on the "New Application" button to create an application.',
				'REVIEWABLE_COMMENT': 'Review comments on Application'
			},
			'NETWORK_TILE' : {
				'SCHEDULE_APPOINTMENT' : 'Schedule Free Advising',
				'VIEW_BENEFITS' : 'View Discounts from Eligible Schools'
			},
			'MESSAGE_BOARD' : {
				'MESSAGES' : 'Messages',
				'NO_MESSAGE' : 'Currently you have no messages from EdAssist or your Employer.'
			},
			'BENEFITS_TILE' : {
				'TITLE': 'Programs & Benefits',
				'PROGRAM': 'Program',
				'DEGREE': 'Degree',
				'BENEFIT': 'Benefit',
				'DESCRIPTION': 'Select your Program, Degree and Benefit Period to determine your current available Cap Limit. Consult your Policy if you have further questions.',
				'BENEFIT_AMOUNT': 'Amount Submitted',
				'AVAILABLE': 'Available',
				'REMAINING': 'Remaining',
				'PAID': 'Paid',
				'IN_PROGRESS': 'Requested'
			}
		},
		'APPLICATION_ACTION_BLOCK' : {
			'SUBMIT_DATE' : 'Submitted',
			'SESSION_DATE' : 'Session'
		},
		'PROFILE': {
			'HEADER' : 'Your Profile',
			'PROFILE' : 'Profile',
			'PERSONAL_INFORMATION': 'Your Information',
			'SAVE_CONTACT_INFO' : 'Save Contact Information',
			'SAVE_EDUCATION_INFO' : 'Save Education Information',
			'CANCEL_CONTACT_INFO' : 'Cancel Contact Information',
			'CANCEL_EDUCATION_INFO' : 'Cancel Education Information',
			'USERNAME' : 'Username',
			'NAME': 'Name',
			'PAYMENT_PREFERENCE': 'Payment Preference',
			'ACCOUNT' : {
				'HEADER' : 'Account'
			},
			'CONTACT' : {
				'ADDRESS_HELP_TEXT' : 'To change an address please contact your employer.',
				'HEADER' : 'Contact Information',
				'ADDRESS_QUESTION' : 'What Address would you like to use?',
				'ADDRESS_SINGLE' : 'Your Address',
				'WORK_ADDRESS' : 'Use Work Address',
				'HOME_ADDRESS' : 'Use Home Address',
				'EMAIL_QUESTION' : 'What Email would you like to use?',
				'EMAIL_SINGLE' : 'Your Email Address',
				'WORK_EMAIL' : 'Use Work Email',
				'HOME_EMAIL' : 'Use Home Email',
				'OTHER_EMAIL' : 'Use Other Email',
				'PHONE_QUESTION' : 'What Phone Number would you like to use?',
				'PHONE_SINGLE' : 'Your Phone Number',
				'WORK_PHONE' : 'Use Work Phone',
				'HOME_PHONE' : 'Use Home Phone',
				'OTHER_PHONE' : 'Use Other Phone',
				'WORK_PHONE_PLACEHOLDER' : 'Add Work Phone Number',
				'HOME_PHONE_PLACEHOLDER' : 'Add Home Phone Number',
				'OTHER_PHONE_PLACEHOLDER' : 'Add Other Phone Number',
				'WORK_EMAIL_PLACEHOLDER' : 'Add Work Email',
				'HOME_EMAIL_PLACEHOLDER' : 'Add Home Email',
				'OTHER_EMAIL_PLACEHOLDER' : 'Add Other Email'
			},
			'APPROVER' : {
				'HEADER' : 'Approver Information',
				'FIRST' : 'First Approver',
				'SECOND' : 'Second Approver'
			},
			'EDUCATION' : {
				'HEADER' : 'Education Information',
				'PROGRAM' : {
					'HEADER' : '<h4>Assistance Program</h4>',
					'DETAILS' : 'The program provided by your employer.'
				},
				'PROGRAMS' : {
					'HEADER' : 'What Program would you like to use?',
					'HEADER_SINGLE' : 'Your Program',
					'APPLICATION_HEADER' : 'What Program would you like to use?',
					'NO_PROGRAMS' : 'You are not currently eligible for any programs. Please consult your benefits documents on the home page for questions related to your eligibility.',
					'MODAL_TITLE' : 'Program Content',
					'CERTIFICATE_EXPENSES' : {
						'HEADER_TYPE_11' : 'Expenses',
					}
				},
				'PROVIDER' : {
					'HEADER' : 'Who is your Education Provider?',
					'EDIT' : ' Edit',
					'NAME' : 'Name',
					'CODE' : 'Provider Code',
					'STUDENT_ID' : 'Student ID',
					'URL': 'URL',
					'PHONE': 'Phone Number',
					'ADDRESS' : 'Address'
				},
				'DEGREE_INFORMATION': {
					'HEADER': 'What will be your degree?',
					'CERTIFICATE_HEADER': 'What will be your certification?',
					'DEGREE_OBJECTIVE': 'Education Program',
					'FIELD_OF_STUDY': 'Field of Study',
					'CERTIFICATION_NAME': 'Certification Name',
					'OTHER_COURSE_OF_STUDY': 'Other Course of Study',
					'ERROR_DEGREE_OBJECTIVE' : 'Please select a degree objective',
					'ERROR_FIELD_OF_STUDY' : 'Please select a course of study',
					'ERROR_OTHER_COURSE_OF_STUDY' : 'Please enter other field of study',
					'CERTIFICATE_DATES_QUESTION' : 'What are the estimated dates this certification will be valid?',
					'CERTIFICATE_DATE_FROM' : 'Valid From',
					'CERTIFICATE_DATE_TO' : 'Through',
					'POST_NOMINAL_LETTERS' : 'Post Nominal Letters',
					'POST_NOMINAL_LETTERS_HELP_TEXT' : 'If you will not have post-nominal letters, leave blank'
				}
			},
			'SUPERVISED_PARTICIPANTS' : {
				'HEADER' : 'Your Team',
				'NAME' : 'Name',
				'EMPLOYEE_ID' : 'Employee ID',
				'APPROVAL_LEVEL' : 'Approval Level',
				'STATUS' : 'Status',
				'ROLE' : 'Role',
				'VIEW_ALL' : 'See All'
			}
		},
		'MODALS': {
			'PARTICIPANT_ELIGIBILITY': {
				'DENIED_BEFORE': 'You are not currently eligible to create an application.',
				'DENIED_AFTER': 'Please review your benefits documents for additional details related to your eligibility.'
			},
			'IDLE_WARNING' : {
				'LOGOUT_TITLE': 'Your session is about to expire!',
				'LOGOUT_MESSAGE': 'You will be logged out in ',
				'CONTINUE_MESSAGE': 'If you would like to continue your session, please move your mouse.',
				'MINUTES_SINGULAR': 'minute',
				'MINUTES_PLURAL' : 'minutes',
				'SECONDS_SINGULAR' : 'second',
				'SECONDS_PLURAL' : 'seconds'
			},
			'EDUCATION_PROGRAM' : {
				'NO_DOCUMENTS' : 'No Documents Available.'
			},
			'UNSAVED_CHANGES' : {
				'UNSAVED_HEADER': 'You have unsaved changes on this section.',
				'UNSAVED_MESSAGE': 'Please fill out all required fields and click continue to save changes. Otherwise, you can discard any changes.',
				'UNSAVED_COMPLETE': 'COMPLETE SECTION',
				'UNSAVED_DISCARD': 'DISCARD CHANGES'
			},
			'STUDENT_ID' : {
				'TITLE' : 'Student ID Tip: ',
				'MESSAGE' : 'If you do not know your student ID, please leave blank.'
			},
			'CANCEL_APPLICATION' : {
				'CANCEL_QUESTION' : 'Are you sure you would like to cancel your application? Please enter a reason in the box below.'
			},
			'DELETE_APPLICATION' : {
				'DELETE_QUESTION' : 'Would you like to save this Application for later or delete?',
				'DELETE_TEXT' : 'You can come back later to complete your application.',
				'BTN_SAVE' : 'SAVE FOR LATER',
				'BTN_DELETE' : 'DELETE APPLICATION'
			},
			'CANCEL_APPOINTMENT_REQUEST' : {
				'CANCEL_QUESTION' : 'Are you sure you would like to cancel your appointment request?',
				'BTN_YES' : 'Yes',
				'BTN_NO' : 'No'
			},
			'CHANGE_PROGRAM' : {
				'PROGRAM_QUESTION' : 'Would you like to change the program?',
				'PROGRAM_TEXT' : 'Warning! If you change programs, you will need to re-enter all details related to your application.',
				'BTN_CHANGE_PROGRAM' : 'Change program'
			},
			'ACCREDITATION' : {
				'INELIGIBLE' : 'Warning: the provider you selected may be ineligible for this program. Your application may be denied.'
			},
			'ADD_COMMENT': {
				'INELIGIBLE_HEADER': 'You have unreviewed comments.',
				'INELIGIBLE_BODY': 'You will be able to add new comments once they are reviewed.'
			},
			'PARTICIPANT_TICKETS': {
				'NO_TICKETS_FOUND': 'No Support Tickets exist for this participant'
			},
			'DELETE_CONTENT': {
				'HEADER': 'Warning',
				'BODY': 'Are you sure you want to delete this custom content? This content will revert back to the EdAssist global default content, if available.',
				'GLOBAL_BODY': 'This custom content does not have a global content equivalent. Deleting this content could leave a gap in the client\'s site.<br><br>Are you sure you want to delete this content?'
			},
			'MIGRATE_CONTENT': {
				'HEADER': 'Warning',
				'BODY': 'Are you sure you want to migrate this client\'s content from 4.0 to 5? If already migrated, this will create a duplicate client entry. If errors occurred, create a JIRA ticket.'
			},
			'POST_NOMINAL_LETTERS_CONTENT': {
				'HEADER': 'Post nominal letters tip:',
				'BODY': 'If you will not have post-nominal letters, leave blank.'
			}
		},
		'APPLICATION': {
			'CONTACT_INFORMATION': {
				'SUBNAV': '<span>Contact</span><span class="hidden-xs"> Information</span>',
				'HEADER': 'Contact Information'
			},
			'EDUCATION_INFORMATION': {
				'SUBNAV': 'Programs',
				'HEADER': 'Programs'
			},
			'COURSES': {
				'HEADER' : 'Course & Expense Information',
				'SUBNAV': 'Expenses',
				'ADD_COURSE_HEADER' : 'Add a Course',
				'ADDING_COURSE' : 'Adding Course',
				'ADD_COURSE' : 'Add Course',
				'EDIT_COURSE_HEADER' : 'Edit a Course',
				'EDIT_COURSE' : 'Save Edits',
				'COURSE_NUMBER' : 'Course Number',
				'COURSE_NAME' : 'Course Name',
				'TUITION_AMOUNT' : 'Tuition Amount',
				'CREDIT_HOURS' : 'Credit Hours',
				'INSTRUCTION_TYPE' : 'Instruction Type',
				'INSTRUCTION_TYPE_SELECT' : 'Select Instruction Type',
				'COURSE_RELATED_EXPENSE_QUESTION' : 'Do you have Course-related Expenses? Refer to your Program for specific details.',
				'COURSE_RELATED_EXPENSE_QUESTION_DASH' : ' - Do you have Course-related Expenses? Refer to your Program for specific details.',
				'COURSE_RELATED_EXPENSE_QUESTION_CONT' : 'Books, lab fees etc.',
				'COURSE_RELATED_EXPENSE_QUESTION_QUALIFY' : ' - Does the educational expense qualify as education that either maintains or improves the skills used or required by your present job?',
				'ADD_COURSE_RELATED_EXPENSE' : 'Add Course Related Expense',
				'COURSE_RELATED_EXPENSE_TYPE' : 'Course Related Expense Type',
				'COURSE_RELATED_EXPENSE' : 'Course Related Expense Amount',
				'ADDITIONAL_EXPENSES' : 'Additional Expense Amount',
				'ADDITIONAL_EXPENSE_TYPE' : 'Additional Expense Type',
				'EXPENSE_QUESTION': 'Do you have other Expenses?',
				'EXPENSE_QUESTION_DASH': ' - Do you have other Expenses?',
				'EXPENSE_TYPE' : 'Expense Type',
				'SELECT_EXPENSE_TYPE' : 'Select Expense Type',
				'COURSE_RELATED' : '- Course Related',
				'COURSE_RELATED_EXPENSES' : '- Course Related Expenses',
				'QUANTITY' : 'Quantity',
				'AMOUNT' : 'Amount',
				'ADD_EXPENSE_HEADER' : 'Add an Expense',
				'ADD_EXPENSE' : 'Add Expense',
				'EDIT_EXPENSE_HEADER' : 'Edit an Expense',
				'EDIT_EXPENSE' : 'Save Edits',
				'COURSE_START_DATE' : 'Session Start Date',
				'COURSE_END_DATE' : 'Session End Date',
				'GRADUATION_COMPLETION_DASH': ' - Are you graduating or completing your Education Program with this session?',
				'GRADUATION_DATE': 'Graduation Date',
				'EXPECTED_GRADUATION_DATE': 'Expected Graduation Date',
				'ERROR_COURSE_START_DATE': 'Course Start date is required.',
				'ERROR_COURSE_END_DATE': 'Course End date is required.',
				'ERROR_GRAD_DATE': 'Graduation date is required.',
				'ERROR_GRAD_DATE_BEFORE_SESSION_END' : 'Graduation date cannot be before Session End Date',
				'TAX_INFORMATION' : 'Important Tax Information',
				'PLACEHOLDERS' : {
					'CHOOSE_DATE' : 'MM/DD/YYYY',
					'COURSE_NUM' : 'Example: MATH101',
					'COURSE_NAME' : 'Example: Intro to Mathematics',
					'COURSE_COST' : 'Cost of Course (0.00)',
					'EXAMPLE' : 'Example: 100.00',
					'HOURS' : 'Hours',
					'NUM_BOOKS' : 'Number of Books',
					'FEES_AMOUNT' : 'Cost of Expense (0.00)'
				}
			},
			'AGREEMENT': {
				'SUBNAV': 'Agreements',
				'HEADER': 'Agreements'
			},
			'SUMMARY' : {
				'SUBNAV': '<span>Review</span><span class="hidden-xs"> & Submit</span>',
				'HEADER': 'Review and Submit Your Application',
				'ADDRESS': 'Address',
				'PHONE': 'Phone',
				'EMAIL': 'Email',
				'SUBMIT_APPLICATION' : 'Submit application',
				'SUCCESS_CONFIRMATION_START' : 'Your application ',
				'SUCCESS_CONFIRMATION_END' : ' was successfully submitted!',
				'APPLICATION_STATUS' : 'Application status:',
				'INCOMPLETE_APPLICATION' : 'Your application is incomplete. Please complete and resubmit.',
				'INCOMPLETE_APPLICATION_AGREEMENTS' : ' Incomplete section is Agreements.',
				'INCOMPLETE_APPLICATION_COURSES' : ' Incomplete section is Courses and Expenses.'
			},
			'REVIEW' : {
				'HEADER': 'Application Review',
				'APPLICATION': 'Application',
				'CANCEL': 'Cancel Application Confirmation',
				'CANCEL_APPLICATION': 'Cancel Application',
				'STATUS_HISTORY': 'Status History',
				'VIEW_ALL_STATUS_HISTORY': 'View All Status History',
				'VIEW_LESS_STATUS_HISTORY': 'View Less'
			},
			'MANAGER_REVIEW' : {
				'MANAGER_REVIEW' : 'Manager Review',
				'APPROVE_BUTTON' : 'Approve Application',
				'DENY_BUTTON': 'Deny Application',
				'APPROVAL_COMMENTS_HEADER': 'Comments',
				'APPLICATION_REASON': 'Enter a reason for approving/denying the application',
				'DENY_TEXT_HEADER' : 'You are required to enter a reason for denying the Application. Please note that the comment below will be viewed by your team member.'
			}
		},
		'PAYMENT': {
			'HEADER': 'Payment'
		},
		'EDUCATION': {
			'HEADER': 'Education Information',
			'EMPLOYEE_ASSISTANCE_PROGRAM': 'Employee Program',
			'NAME': 'Name',
			'PROVIDER_CODE': 'Provider Code',
			'ADDRESS': 'Address',
			'STUDENT_ID': 'Your Student ID',
			'EDUCATION_PROGRAM' : 'Education Program',
			'FIELD_OF_STUDY' : 'Field Of Study',
			'PROVIDER' : {
				'SEARCH' : 'Search Education Providers',
				'QUESTION' : 'Who is your Education Provider?',
				'CERTIFICATE_EXAM_PROVIDER_QUESTION' : 'Who is your exam provider?',
				'CERTIFICATE_COURSE_PROVIDER_QUESTION' : 'Who is your course provider?',
				'EXPLANATION' : 'College or University',
				'NAME' : 'Name',
				'NARROW_RESULTS' : 'Narrow results or search based on Location or Accreditation',
				'CITY' : 'City',
				'STATE' : 'State',
				'ACCREDITATION' : 'Accreditation',
				'NETWORK_DISCOUNT' : 'Network schools offered by your employer that provide tuition discounts and/or other benefits.',
				'RESULTS_NAME': 'Name',
				'RESULTS_ADDRESS' : 'Address',
				'RESULTS_NETWORK' : 'Network School (Discounts & Other Benefits)',
				'SHOW_MORE' : 'Show More Results',
				'STUDENT_ID' : 'Your Student ID',
				'IN_NETWORK_LINK' : 'Important: Learn more about how to obtain the EdAssist Network Tuition Discount',
				'NO_PROGRAM_SELECTED' : 'You must select a program to be able to search for a provider.',
				'NO_PROVIDER_SELECTED' : 'Please Select an Education Provider',
				'NO_RESULTS' : 'No search results found.'
			}
		},
		'COURSES': {
			'HEADER': 'Courses and Expenses',
			'SESSION_DATES' : 'Session Dates',
			'NON_COURSE_EXPENSE_TITLE' : 'Non-Course Related Expense',
			'TUITION' : 'Tuition',
			'EXPENSES' : 'Expenses',
			'COURSE' : 'Course',
			'TOTAL' : 'Total',
			'REQUESTED_AMOUNT' : 'Requested Amount',
			'DISCOUNT_AMOUNT' : 'Discount Amount',
			'REQUESTED' : 'Requested',
			'APPROVED' : 'Approval Amount',
			'PAID' : 'Paid',
			'PERCENTAGE_PAYOUT' : 'Percentage Payout',
			'PAYMENT_PROCESSED' : 'Payment Processed',
			'CHECK' : 'Check #',
			'REFUND_CHECK' : 'Check / REF #',
			'FUNDS_RECIEVED' : 'Funds recieved',
			'REFUND_RECEIVED' : 'Refund Received',
			'ADJUSTMENT' : 'Adjustment',
			'TAXABLE_AMOUNT' : 'Taxable Amount',
			'BENEFIT_AMOUNT' : 'Benefit Amount',
			'TOTALS' : 'TOTALS',
			'RESPONSES_TO_TAX_QUESTIONS' : 'Responses to Tax Questions',
			'RESPONSES_TO_EXPENSE_QUESTIONS' : 'Responses to Tax Questions',
			'TABLE_HEADERS' : {
				'CREDITS': 'Credits',
				'TAX_EXEMPT': 'Tax Exempt',
				'GRADE': 'Grade',
				'VERIFIED': 'Verified'
			}
		},
		'AGREEMENT': {
			'HEADER': 'Agreements',
			'GRANTS_SCHOLARSHIP': 'Grants and Scholarships',
			'QUESTION': 'Did you receive any grants or scholarships?',
			'GRANT_TYPE': 'Scholarship/Grant Type',
			'SELECT_GRANT_TYPE': 'Select Grant Type',
			'SCHOLARSHIP_GRANT_TYPE': 'Please select scholarship/grant type',
			'OTHER_AID_FIELD': 'Please fill out other aid field',
			'OTHER_AID': 'Other Aid',
			'I_AGREE_CHECK': 'I agree checkbox',
			'NAME_ENTER': 'Please enter your name',
			'GRANT_AMOUNT': 'Scholarship/Grant Amount',
			'VERIFICATION': 'I agree',
			'NAME': 'Your Name:',
			'TYPE_NAME': 'Type Your Name Here',
			'SIGNATURE_ERR': 'To accept agreement(s), you must type your name exactly as it appears above.',
			'REQUIRED_RESPONSE' : 'Response Required'
		},
		'NAV' : {
			'PAGES' : {
				'NEW_APPLICATION' : 'New Application',
				'HOME' : 'Home',
				'ADVISING' : 'Advising',
				'HISTORY' : 'Application History',
				'ACADEMIC_RESOURCES' : 'Academic Resources',
				'SUPPORT' : 'Support',
				'PROFILE' : 'Profile',
				'NAVIGATION' : 'Navigation',
				'LOGOUT' : 'Log Out',
				'CLIENT_ADMIN' : 'Admin',
				'SYSTEM_ADMIN' : 'System Admin'
			}
		},
		'ADVISING' : {
			'HEADER': 'Advising',
			'CONTENT': {
				'TITLE': 'About Advising'
			},
			'HISTORY' : {
				'TITLE' : 'Your Appointment(s)'
			},
			'APPOINTMENT' : {
				'UPDATE_APPOINTMENT' : 'Update',
				'TITLE' : 'Schedule an Appointment',
				'HEADER' : 'Employment & Education',
				'SELECT' : 'Select',
				'REASON_QUESTION' : 'Reason for advising session',
				'EDUCATION_LEVEL_QUESTION' : 'Highest level of education earned',
				'EDUCATION_TYPE_QUESTION' : 'What Type of education are you seeking?',
				'ENROLLMENT_PROCESS_QUESTION' : 'Where are you in the enrollment process?',
				'CURRENT_POSTION_YEARS_QUESTION' : 'Number of years in current position',
				'CURRENT_ENROLLED_QUESTION' : 'Currently enrolled in a program?',
				'PROCESS_OF_PAYING_BACK_QUESTION' : 'In the process of paying back student loans?',
				'TOTAL_EXPERIENCE_QUESTION' : 'Years of professional experience?',
				'YEARS_CURRENT_EMPLOYER_QUESTION' : 'Years with current employer',
				'CURRENT_EMPLOYEE_STATUS_QUESTION' : 'Current employee Status?',
				'QUESTION_ON_POLICY' : 'For questions on policy',
				'ADVISOR' : 'Advisor:',
				'NO_TIMESLOTS_AVAILABLE' : 'No time slots available for selected date'
			},
			'CONTACT' : {
				'EMAIL_QUESTION' : 'What Email would you like to use?',
				'WORK_EMAIL' : 'Use Work Email',
				'HOME_EMAIL' : 'Use Home Email',
				'OTHER_EMAIL' : 'Use Other',
				'PHONE_QUESTION' : 'What Phone Number would you like to use?',
				'WORK_PHONE' : 'Use Work Phone',
				'HOME_PHONE' : 'Use Home Phone',
				'OTHER_PHONE' : 'Use Other'
			},
			'NAV' : {
				'EMPLOYMENT_AND_EDUCATION' : {
					'SUBNAV' : '<span>Employment</span><span class="hidden-xs">&nbsp; Education</span>',
					'HEADER' : 'Employment & Education'
				},
				'CONTACT_INFORMATION' : {
					'SUBNAV' : '<span>Contact</span><span class="hidden-xs">&nbsp; Information</span>',
					'HEADER' : 'Contact Information'
				},
				'APPOINTMENT_CALENDAR' : {
					'SUBNAV' : '<span>Appointment</span><span class="hidden-xs">&nbsp; Calendar</span>',
					'HEADER' : 'Appointment Calendar'
				},
				'SUBMIT' : 'Submit'
			},
			'SUBMIT_REVIEW_APPOINTMENT' : {
				'EMPLOYMENT_EDUCATION' : 'Employment Education',
				'CONTACT_INFORMATION' : 'Contact Information',
				'APPOINTMENT' : 'Appointment',
				'WORK_PHONE' : 'Work Phone',
				'WORK_EMAIL' : 'Work Email',
				'EMPLOYMENT_EDUCATION_TOOLTIP_TITLE' : 'Edit Employment Education',
				'CONTACT_INFO_TOOLTIP_TITLE' : 'Edit Contact Information',
				'APPOINTMENT_TOOLTIP_TITLE' : 'Edit Appointment'

			},
			'SUBMIT_APPOINTMENT_CONFIRMATION' : {
				'NEW_APPOINTMENT' : 'NEW APPOINTMENT',
				'SUCCESS_MESSAGE' : 'Your appointment was successfully submitted!',
				'FAILURE_MESSAGE' : 'An error occurred and your appointment was not successfully submitted.',
				'SUCCESS_MESSAGE_BODY1' : 'A confirmation email will be sent to you shortly. For more information on your education plan, please wait for your advisor to call you at the number you provided.',
				'SUCCESS_MESSAGE_BODY2' : 'To check the status of your appointment please visit the Home or Advising Page.',
				'FAILURE_MESSAGE_BODY' : 'To create a new appointment, please visit the Home or Advising page. We apologize for the inconvenience.'
			},
			'UPDATE_APPOINTMENT' : {
				'SUCCESS_MESSAGE' : 'Your appointment was successfully updated!',
				'FAILURE_MESSAGE' : 'An error occured and your appointment was not successfully updated!'
			}
		},
		'HISTORY' : {
			'VIEW_BUTTON': 'View All',
			'LESS_BUTTON': 'View Less',
			'MORE_BUTTON' : 'View More',
			'VIEW_FULL_APPLICATION_BUTTON' : 'View Full Application',
			'VIEW_APPROVE_OR_DENY_BUTTON' : 'Approve / Deny',
			'BACK_TO_SEARCH_RESULTS' : 'Back to Search Results',
			'NO_APPLICATIONS' : 'Currently there are no active applications.',
			'APPLICATIONS' : 'Applications',
			'BOOKS': 'Books',
			'REQUESTED_AMOUNT': 'Requested Amount',
			'ADJUSTMENT': 'Adjustment',
			'TOTAL': 'Total',
			'PAYMENT_PROCESSED': 'Payment Processed',
			'OTHER_EXPENSES': 'Other Expenses',
			'EXPENSE': 'Other Expense',
			'UNKNOWN_EXPENSE': 'Unknown Expense',
			'PAGE_NAVIGATION': 'Page Navigation',
			'EXPORT_BUTTON': {
				'SR_TEXT': 'Export Applications to a CSV File',
				'DOWNLOAD_DOC': 'Download Document',
				'TOOLTIP': 'Download a comma separated (csv) list of the data displayed which you can import into software such as excel'
			},
			'CONSOLIDATED': {
				'TITLE': 'Application History'
			},
			'FILTERS': {
				'BENEFIT_PERIOD': 'Benefit Period',
				'TEAM_MEMBER_TYPE': 'Team Member',
				'SORT_BY' : 'Sort By'
			}
		},
		'SUPPORT' : {
			'HEADER' : 'Support',
			'TICKET' : {
				'HEADER' : 'Create a Support Ticket',
				'CREATE' : 'Using Your Tuition Benefits',
				'TICKET_SUBMITTED' : 'Your ticket {{ticketNumber}} was successfully submitted and will be reviewed by our support team.',
				'DOCUMENTS' : 'For more information about your eligibility, please review the documents below.',
				'DOCUMENT_TYPES' : 'What document types are supported?',
				'DOCUMENT_TYPES_VIEW' : 'Click to view supported document types.',
				'HISTORY' : 'Support Ticket History',
				'NO_TICKETS' : 'You currently have no support tickets.',
				'TICKET_NUMBER' : 'Ticket Number',
				'LAST_UPDATED' : 'Last Updated',
				'STATUS' : 'Status',
				'CREATE_NEW_TICKET' : 'Create a New Support Ticket',
				'TOPIC' : 'What topic are you writing about?',
				'SUBTOPIC' : 'What would you like details on?',
				'TOPIC_LABEL' : 'Topic',
				'SUBTOPIC_LABEL' : 'Sub Topic',
				'CREATED_ON' : 'Created On',
				'CREATED_BY' : 'Created By',
				'UPDATED_BY' : 'Updated By',
				'APPLICATION_NUMBER' : 'Application Number',
				'RESOLUTION' : 'Resolution',
				'COMMENTS' : 'Comments',
				'Add_NEW_COMMENT' : 'Add New Comment',
				'NEW_COMMENT' : 'New Comment',
				'ADD_COMMENT' : 'Add Comment',
				'SUBMIT_TICKET' : 'Submit Support Ticket',
				'APP_STATUS' : 'Submission Status Confirmation',
				'YOUR_MESSAGE' : 'Your Message',
				'DOCUMENT' : 'Document',
				'UPLOADED' : 'Uploaded',
				'ERROR_MISSING_ONE_FIELD': 'You must fill in atleast one field in order to search.',
				'UPLOAD' : {
					'PREFIX' : 'File ',
					'POSTFIX' : ' ready to upload. ',
					'SUBMIT_INFO' : 'File will not upload until Submit Support Ticket button is clicked',
					'INVALID_FILE_TYPE' : 'Invalid File Type',
					'INVALID_FILE_SIZE' : 'File Size should be less than 3 MB'
				}
			},
			'SEARCH': {
				'HEADER': 'Ticket Search',
				'TICKET_NUMBER': 'Ticket Number',
				'FIRST_NAME': 'First Name',
				'LAST_NAME': 'Last Name',
				'ID': 'ID',
				'TICKET_STATUS': 'Ticket Status',
				'CREATE_DATE': 'Create Date',
				'SEARCH': 'Search',
				'RANGE_TEXT': 'to',
				'CREATED_TO': 'Created To',
				'CREATED_FROM': 'Created From',
				'ERROR_CREATED_FROM': 'Ticket Start date is required.',
				'ERROR_CREATED_TO': 'Ticket End date is required.',
				'ERROR_FROMDATE_INVALID': 'The from date must be less than the to date',
				'SEARCH_SELECTION_TEXT': 'OR',
				'PLACEHOLDERS': {
					'START_DATE': 'Start Date',
					'END_DATE': 'End Date'
				}
			},
			'QUESTION' : 'Additional Questions'
		},
		'SUBMITTED_APPLICATION' : {
			'APPLICATION_TYPE' : 'Tuition Application',
			'VIEW_EDUCATION_INFORMATION' : 'View Education Information',
			'VIEW_PAYMENT_HISTORY' : 'View Payment History',
			'VIEW_CONTACT_INFORMATION' : 'View Contact Information',
			'VIEW_GRANTS_SCHOLARSHIP' : 'View Grants and Scholarship',
			'VIEW_SUPPORTING_DOCUMENT' : 'View Supporting Documents',
			'VIEW_COMMENTS' : 'Create or View Comments',
			'VIEW_AGREEMENTS' : 'View Agreements',
			'EDUCATION_HEADER' : 'Education Information',
			'PAYMENT_HEADER' : 'Payment History',
			'CONTACT_INFORMATION_HEADER' : 'Contact Information',
			'GRANTS_SCHOLARSHIP_HEADER' : 'Grants and Scholarship',
			'AGREEMENT_HEADER' : 'Agreements',
			'AGREEMENT_SIGNED' : 'Agreements Signed',
			'HEADER' : 'Application #',
			'LAST_MODIFIED' : 'Last Modified',
			'EDIT_APPLICATION': 'Edit Application',
			'EMPLOYEE' : 'Employee',
			'PAYMENT_HISTORY' : {
				'PAYMENT' : 'Payment',
				'REFUND' : 'Refunds',
				'DATE_PAID' : 'Date Paid: ',
				'TAXABLE_AMOUNT' : 'Taxable Amount: ',
				'PAID_AMOUNT' : 'Paid Amount: ',
				'DATE_RECEIVED' : 'Date Received: ',
				'AMOUNT_RECEIVED' : 'Amount Received: ',
				'AMOUNT_APPLIED' : 'Amount Applied: ',
				'NO_HISTORY' : 'No information available at this time.',
				'CHECK_NUMBER': 'Check #'
			},
			'SUPPORT_DOCUMENTS' : {
				'HEADER' : 'Supporting Documentation',
				'SUPPORTED_DOCS_INFO' : 'What document types are supported?',
				'DROP_ZONE' : 'Drag Document here to upload or',
				'MANUAL_FILE_SELECT' : 'Select File',
				'MANUAL_FILE_SELECT_UPLOAD' : 'Select File to Upload',
				'UPLOAD_SUPPORTING_DOCUMENTATION' : 'Activate link to upload supporting documentation from your computer',
				'TO_UPLOAD' : 'to Upload',
				'MOBILE' : 'To upload documents, please access the EdAssist Website via a desktop computer.',
				'MODAL' : {
					'MODAL': 'Modal',
					'TITLE': 'Supported Documents',
					'SUPPORTED_DOCUMENTS_MESSAGE' : '<p>The following documents are supported:</p>'
				},
				'READY' : {
					'PREFIX' : 'File ',
					'POSTFIX' : ' ready to upload. ',
					'SUBMIT_INFO' : 'File will not upload until Submit Document button is clicked'
				},
				'DOCUMENT_DETAILS' : {
					'DOCUMENT_TYPE_LABEL' : 'Document Type',
					'COMMENT_LABEL' : 'Comment',
					'SUBMIT_DOCUMENT' : 'SUBMIT DOCUMENT',
					'ENTER_GRADE_MESSAGE' : 'Please enter your grade',
					'UPLOAD_ERROR' : 'There was a problem uploading your file. Please try again.',
					'GRADE_ERROR' : 'Grade Required',
					'DOCUMENT_TYPE_REQUIRED' : 'Document Type Required',
					'NO_COURSES_ERROR' : 'No courses have been associated with this application. You will not be able to upload the document until course(s) have been added'
				}
			},
			'COMMENTS' : {
				'HEADER' : 'Comments',
				'ADD_NEW' : 'Add New Comment',
				'SUBMIT_COMMENT' : 'Save Comment',
				'FROM' : 'From',
				'EDIT' : 'Edit',
				'DELETE' : 'Delete',
				'EMPTY' : 'No Comments',
				'REVIEWED' : 'Reviewed',
				'REVIEWED_ON' : 'Reviewed on',
				'UNREAD_MESSAGES' : '({{unreadMessages}} unread)'
			},
			'SUPPORTED_DOCS_MODAL' : {
				'TITLE': 'Supported Documents',
				'SUPPORTED_DOCUMENTS_ERROR_MESSAGE' : 'Supported documents information is unavailable at this time.'
			},
			'COURSES' : {
				'HEADER' : 'Courses and Expenses',
				'GRANTS_SCHOLARSHIP': 'Grants and Scholarships'
			},
			'APPLICATION_DOCS' : {
				'DOCUMENT_TITLE': 'DOCUMENT',
				'DOCUMENT' : 'Document',
				'UPLOADED_DATE' : 'Uploaded',
				'STATUS' : 'Status',
				'REVIEWED_DATE' : 'Date Reviewed',
				'DELETE' : '',
				'STATUSES' : {
					'PENDING' : 'Pending',
					'REVIEWED' : 'Reviewed',
					'INCOMPLETE' : 'Incomplete'
				},
				'NO_DOCUMENTS' : 'This application currently has no supporting documentation.'
			}
		},
		'FAX_COVERSHEET' : {
			'HEADER' : 'FAX COVER SHEET',
			'HEADING' : 'Fax Cover Sheet Heading',
			'APPLICATION_NUMBER' : 'Application Number',
			'APPLICANT_NAME' : 'Applicant Name',
			'EMPLOYEE_ID' : 'Employee ID',
			'PAGES_NUMBER' : 'Number of pages',
			'PAGES' : 'Pages',
			'FAX' : 'Fax',
			'DATE' : 'Date',
			'SUBJECT' : 'Subject',
			'FAX_COVERSHEET_COMMENTS' : 'Fax Cover Sheet Comments',
			'FAX_VIEW_COVERSHEET' : 'Click to view fax cover sheet',
			'COMMENTS' : 'Comments',
			'ATTACHED_DOCUMENTS' : 'Attached Documents',
			'PRINT_SUGGESTION' : 'Please click on the appropriate box(es) below before printing',
			'CORRECTIONS' : 'Corrections',
			'GRADE' : 'Grade',
			'PROOF_OF_PAYMENT' : 'Proof Of Payment',
			'PRINT' : 'Print',
			'PRINT_FAX_COVERSHEET' : 'Print Fax Cover Sheet',
			'SUBJECT_NAME' : 'Document Submission',
			'OTHER_DOCS' : 'Other',
			'OCR_BOX_SUGGESTION' : 'DO NOT WRITE IN THE BOX BELOW.'
		},
		'FOOTER' : {
			'TERMS_CONDITIONS' : 'Terms & Conditions',
			'PRIVACY' : 'Privacy Policy'
		},
		'ERROR_MESSAGES': {
			'PATTERN': {
				'EMAIL': 'Please enter a valid email address',
				'DATE': 'Date format must be MM/DD/YYYY'
			}
		},
		'CLIENT_ADMIN' : {
			'HEADER': 'Admin',
			'ADMIN_SEARCH': 'Admin Search',
			'FIRST_NAME': 'First Name',
			'LAST_NAME': 'Last Name',
			'EMPLOYEE_ID': 'User ID',
			'ADVANCED_SEARCH': 'Advanced Search',
			'APPLICATION_STATUS': 'Application Status',
			'BENEFIT_PERIOD': 'Benefit Period',
			'APPLICATION_NUMBER': 'Application Number',
			'ERROR_MISSING_ONE_FIELD': 'You must fill in at least one field in order to search.',
			'SORT_BY': 'Sort by',
			'NO_RESULTS': 'No search results found. Please fine tune search criteria.',
			'APPLICATION': {
				'ID_NUMBER': 'ID Number',
				'VIEW_APPLICATION': 'View Application',
				'PROFILE': 'Profile',
				'APPLICATION_HISTORY': 'Application History',
				'TICKETS': 'Tickets',
				'EXPORT': 'Export'
			},
			'PLACEHOLDERS': {
				'FIRST_NAME': 'First Name',
				'LAST_NAME': 'Last Name',
				'EMPLOYEE_ID': 'User ID',
				'APPLICATION_STATUS': 'Application Status',
				'BENEFIT_PERIOD': 'Benefit Period',
				'APPLICATION_NUMBER': 'Application Number',
				'SORT_BY': 'Sort by',
				'VIEW_APPLICATION': 'View Application'
			},
			'PROFILE' : {
				'HEADER': 'Profile',
				'ELIGIBILITY': 'Eligibility',
				'ACCOUNT' : 'Account',
				'CONTACT_INFO' : 'Contact Information',
				'PAYMENT_PREF' : 'Payment Preference',
				'PARTICIPANT_INFO' : 'Participant Information',
				'EMP_NAME' :'Employee Name',
				'COMPANY_NAME' : 'Company Name',
				'JOB_TITLE' :'Job Title',
				'DEPARTMENT' : 'Department',
				'EMP_STATUS' : 'Employee Status',
				'COMP_NAME' : 'Company Name',
				'HIRE_DATE' : 'Hire Date',
				'REGION' : 'Region',
				'COST_CENTER' : 'Cost Center',
				'FULL_TIME' : 'Full Time',
				'HOURLY_SALARIED' : 'Hourly Salaried',
				'PAY_TYPE' : 'Pay Type',
				'HOURS_WK' :'Hourly Hours/Wk',
				'UNION' : 'Union',
				'UNION_CODE' : 'Union Code',
				'TERMINATION_DATE' : 'Termination Date',
				'TERMINATION_REASON' : 'Termination Reason',
				'LEAVE_TYPE' : 'Leave Type',
				'LEAVE_START' : 'Leave Start',
				'LEAVE_END' : 'Leave End',
				'INTERNATIONAL' : 'International',
				'SALARY_GRADE' : 'Salary Grade',
				'PROGRAM' : {
					'PROGRAM_HEADER' : 'Program Assignment',
					'PROGRAM_NAME' : 'Program Name',
					'PROGRAM_STATUS' : 'Program Status',
					'RULE_NAME' : 'Rule Name',
					'MESSAGE' : 'Message'
				},
				'CURRENT_EXCEPTIONS' : {
					'CURRENT_EXCP_HEADER' : 'Current Exceptions',
					'RULE_NAME' : 'Rule Name',
					'NO_DATA' : 'No data available in table'
				}
			},
			'CLIENT_ADMIN_TICKET': {
				'HEADER': 'Admin',
				'ADMIN_SEARCH': 'Admin Search',
				'BACK_TO_SEARCH': 'Back to search',
				'TICKET_HISTORY_FOR': 'Ticket History for',
				'TICKET_NUMBER': 'Ticket Number',
				'TOPIC': 'Topic',
				'SUB_TOPIC': 'Sub Topic',
				'STATUS': 'Status',
				'UPDATED_BY': 'Updated By',
				'UPDATED_ON': 'Last Updated',
				'NO_TICKET_DATA': 'There are currently no tickets to display.'
			}
		},
		'ADMIN': {
			'HEADER': 'Content Administration',
			'CONTENT': 'Content',
			'MANAGE_CONTENT': 'New Content',
			'SEARCH_CONTENT': 'Search',
			'PUSH_CONTENT': 'Push Content By Client',
			'ADD_CONTENT': 'Add New Content',
			'CONTENT_ID': 'Id',
			'CONTENT_COMPONENT': 'Content Category',
			'CONTENT_PROGRAM': 'Program',
			'CONTENT_NAME': 'Content Name',
			'CONTENT_DATA': 'Data',
			'CONTENT_CLIENT': 'Client',
			'CONTENT_SUBJECT': 'Subject',
			'CONTENT_BODY': 'Body',
			'CONTENT_TYPE': 'Content Type',
			'CONTENT_FILENAME': 'Filename',
			'CONTENT_FILEPATH': 'File Path',
			'CONTENT_CCEMAIL': 'CC Email',
			'CONTENT_BCCEMAIL': 'BCC Email',
			'SAVE_CONTENT': 'Save',
			'DELETE_CONTENT': 'Delete',
			'CREATE_DATE': 'Valid Until',
			'DESCRIPTION': 'Description',
			'NEW_CONTENT_NAME': 'New Content Name',
			'EMAIL_SUBJECT': 'Email Subject',
			'BCC': 'BCC',
			'CC_EMAIL_ID': 'CC',
			'MESSAGE_TITLE': 'Title',
			'CONTENT_START_DATE': 'Start date',
			'CONTENT_END_DATE': 'End date',
			'ERROR_MISSING_ONE_FIELD': 'You must fill in at least one field in order to search.',
			'ERROR_ENDDATE_INVALID': 'The start date must be less than the end date',
			'SAVE_SUCCESS': 'Content Updated',
			'DELETE_SUCCESS': 'Content Deleted',
			'ADD_SUCCESS': 'Content Added',
			'CONTENT_NAME_WARNING': 'Warning: A content item already exists with that name.',
			'ENABLE_DOCUMENT_UPLOAD' : 'Enable Document Upload',
			'PROPAGATE_CLIENT_CONTENT' : 'Are you sure you want to propagate all the client content with CLIENT ID: ',
			'UPDATE_USER_ROLE_SUCCESS' : 'User role updated successfully.',

			'TABLE': {
				'CONTENT_NAME': 'Content Name',
				'CLIENT': 'Client',
				'PROGRAM': 'Program',
				'CONTENT_TYPE': 'Content Type',
				'CONTENT_CATEGORY': 'Content Category',
				'ACTIONS': 'Actions',
				'ERROR_MUST_SHOW_ONE_COLUMN': 'At least one column must be selected.',
				'NO_RECORDS_FOUND': 'No records were found.',
				'SEARCH_TEXT': 'Search {{contentLength}} items'
			},
			'SYSTEM_ADMIN': {
				'HEADER': 'System Administration',
				'MIGRATE_CONTENT': 'Migrate Client Content',
				'V4_CLIENT_LABEL': 'EdAssist v4 Client',
				'MIGRATE_BUTTON': 'MIGRATE CONTENT TO V5',
				'SUCCESS': 'Content has now been migrated.',
				'PARTICIPANT' : {
					'HEADER': 'Manage Users',
					'USERNAME': 'Username',
					'EMPLOYEE_ID': 'Employee Id',
					'TAMS_UNIQUE_ID': 'TAMS Unique Id',
					'LAST_NAME': 'Last Name',
					'FIRST_NAME': 'First Name',
					'PARTICIPANT_STATUS': 'Participant Status',
					'USER_ROLE': 'User Role',
					'NO_RESULT': 'No users found. Please modify your search and try again',
					'UPDATE_MODAL': {
						'HEADER': 'Update User'
					}
				}
			},
			'MONITOR': {
				'HEADER': 'Server status',
				'SERVER_NAME': 'Server name',
				'SERVER_STATUS': 'Status',
				'RESPONSETIME': 'Response Time',
				'PURPOSE': 'Purpose',
				'CHECK_V4_SERVERS': 'Check EdAssist 4',
				'CHECK_V5_SERVERS': 'Check EdAssist 5',
				'MANAGE_SERVER': 'Manage status',
				'SERVER_ON': 'On',
				'SERVER_OFF': 'Off'
			}
		}
	});

	$translateProvider.translations('es', {
		'PROFILE': {
			'HEADER' : 'Tu perfil'
		}
	});

	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);
