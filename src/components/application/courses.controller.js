'use strict';

/**
 * @ngdoc controller
 * @name edAssistApp.controller:coursesController
 * @description
 * Main controller for course section of the application. Displays
 * course, tax, and expense related information.
 */
angular.module('edAssistApp').controller('coursesController', 
	['$scope', '$sce', '$state', '$stateParams', '$anchorScroll', '$location', '$filter', 'constants', 'contentConstants', 'participantService', 'applicationService', 'generalContentService', 'storageService', 
	function ($scope, $sce, $state, $stateParams, $anchorScroll, $location, $filter, constants, contentConstants, participantService, applicationService, generalContentService, storageService) {

	var stepViewData = {
		stepNumber: 3,
		formName: 'sessionInformationForm', 
		stepHeader: 'APPLICATION.COURSES.SUBNAV',
		submitButtonName: 'GENERAL.CONTINUE',
		applicationId: $stateParams.applicationId
	};
	$scope.updateApplicationScope('stepViewData', stepViewData);
	$scope.updateApplicationScope('status', '');

	var vm = this;

	vm.coursesTableStatus = 'submitting';
	vm.coursesAndCourseRelatedExpenses = [];
	vm.otherExpenses = [];
	vm.courseExpenses = [];
	vm.courseExpense = {'status' : 'new'};
	vm.showCourseExpenseForm = false;
	vm.hideCourseForm = true;
	vm.application = {};
	vm.displayNonTaxableAlert = false;
	vm.displayTaxableAlert = false;
	vm.displayAcceptedExpenseAlert = false;
	vm.displayDeclinedExpenseAlert = false;
	var clientId = storageService.get('client.clientLoginDetails.clientId');

	$scope.addCourseSessionForm = {};
	$scope.addCourseExpenseForm = {};
	$scope.expenseRadio = {
		otherExpense : 'No'
	};
 
	var applicationId = $stateParams.applicationId;

	generalContentService.findByName(contentConstants.component.applicationStep3, contentConstants.name.step3Intro, clientId, contentConstants.program.clientDefault).then(function (response) {
		vm.step3Intro = _.get(response, '[0].data');
	});

	generalContentService.findByName(contentConstants.component.applicationStep3, 'graduationQuestion', clientId, contentConstants.program.clientDefault).then(function (response) {
		vm.graduationQuestion = _.get(response, '[0].data');
	});

	var getCoursesContent = function () {
		generalContentService.findByComponent(contentConstants.component.applicationStep3, clientId, vm.application.benefitPeriodID.programID.programID + ',clientDefault', false).then(function (response) {
			vm.content = response;
			vm.courseTaxQuestions = [];
			vm.expenseTaxQuestions = [];
			vm.taxQuestionsCount = vm.application.benefitPeriodID.programID.taxQuestionsCount;
			var courseQuestionOne, courseQuestionTwo, courseQuestionThree;
			var expenseQuestionOne, expenseQuestionTwo, expenseQuestionThree;
			_.each(response, function (contentObject) {
				var contentName = contentObject.name;
				var content = contentObject.data;
				if (contentName === 'applCourseTax') {
					vm.coursetaxIntro = $sce.trustAsHtml(content);
				} else if (contentName === 'applExpenseTax') {
					vm.expensetaxIntro = $sce.trustAsHtml(content);
				} else if (contentName === 'courseNonTaxablePopUpInfo') {
					vm.courseNonTaxablePopUpInfo = $sce.trustAsHtml(content);
				} else if (contentName === 'courseTaxablePopUpInfo') {
					vm.courseTaxablePopUpInfo = $sce.trustAsHtml(content);
				} else if (contentName === 'expenseTaxablePopUpInfo') {
					vm.expenseTaxablePopUpInfo = $sce.trustAsHtml(content);
				} else if (contentName === 'expenseNonTaxablePopUpInfo') {
					vm.expenseNonTaxablePopUpInfo = $sce.trustAsHtml(content);
				} else if (contentName === 'courseQuestionOne') {
					courseQuestionOne = $sce.trustAsHtml(content);
				} else if (contentName === 'courseQuestionTwo') {
					courseQuestionTwo = $sce.trustAsHtml(content);
				} else if (contentName === 'courseQuestionThree') {
					courseQuestionThree = $sce.trustAsHtml(content);
				} else if (contentName === 'expenseQuestionOne') {
					expenseQuestionOne = $sce.trustAsHtml(content);
				} else if (contentName === 'expenseQuestionTwo') {
					expenseQuestionTwo = $sce.trustAsHtml(content);
				} else if (contentName === 'expenseQuestionThree') {
					expenseQuestionThree = $sce.trustAsHtml(content);
				} else if (contentName === 'applSessionInfo') {
					vm.applSessionInfo = $sce.trustAsHtml(content);
				}
			});

			if (vm.application.benefitPeriodID.programID.taxQuestionsCount > 0) {
				if (courseQuestionOne) {
					vm.courseTaxQuestions.push({'name': 'courseTaxQ1', 'question': courseQuestionOne, 'modelValue': ''});
				}
				if (expenseQuestionOne) {
					vm.expenseTaxQuestions.push({'name': 'expenseTaxQ1', 'question': expenseQuestionOne, 'modelValue': ''});
				}
				if (vm.application.benefitPeriodID.programID.taxQuestionsCount > 1) {
					if (courseQuestionTwo) {
						vm.courseTaxQuestions.push({'name': 'courseTaxQ2', 'question': courseQuestionTwo, 'modelValue': ''});
					}
					if (courseQuestionThree) {
						vm.courseTaxQuestions.push({'name': 'courseTaxQ3', 'question': courseQuestionThree, 'modelValue': ''});
					}
					if (expenseQuestionTwo) {
						vm.expenseTaxQuestions.push({'name': 'expenseTaxQ2', 'question': expenseQuestionTwo, 'modelValue': ''});
					}
					if (expenseQuestionThree) {
						vm.expenseTaxQuestions.push({'name': 'expenseTaxQ3', 'question': expenseQuestionThree, 'modelValue': ''});
					}
				}
			}
			vm.status = 'success';
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	//Updates column totals everytime we add/edit/delete a course
	function updateTotals() {
		vm.courseTotal = _.round(_.sumBy(vm.coursesAndCourseRelatedExpenses, 'tuitionAmount'), 2);
		vm.expenseTotal = _.round(_.sumBy(vm.coursesAndCourseRelatedExpenses, 'feesAmount'), 2) + _.round(_.sumBy(vm.otherExpenses, 'feesAmount'), 2);
		var subResult = vm.courseTotal + vm.expenseTotal;
		vm.courseAndExpenseTotal = _.round(subResult, 2);
	}

	//Generate the initial courses and expenses, non-course expenses list table.
	function generateCoursesAndExpensesList(courseResponse, expenseResponse) {
		var courses = [];
		_.forEach(courseResponse, function (courseObject, key) {
			courses.push(courseObject);
		});
		var courseRelatedExpenses = [];
		vm.otherExpenses = [];
		if (expenseResponse.length !== 0) {
			_.forEach(expenseResponse, function (expenseObject, key) {
				if (expenseObject.relatedCourseID) {
					courseRelatedExpenses.push({
						applicationCoursesID: expenseObject.relatedCourseID.applicationCoursesID,
						applicationExpensesID: expenseObject.applicationExpensesID,
						feesAmount: expenseObject.feesAmount,
						numberOfBooks: expenseObject.numberOfBooks,
						courseRelatedExpense : 'Yes',
						expenseType : {
							expenseTypeID : expenseObject.expenseType.expenseTypeID,
							code : expenseObject.expenseType.code,
							description : expenseObject.expenseType.description
						},
						status: 'saved'
					});
				} else {
					vm.otherExpenses.push({
						applicationExpensesID: expenseObject.applicationExpensesID,
						courseNumber: '',
						courseName : 'Non Course Related Expenses' + '-' + expenseObject.expenseType.description,
						tuitionAmount : 0,
						feesAmount : expenseObject.feesAmount,
						expenseType : {
							expenseTypeID : expenseObject.expenseType.expenseTypeID,
							code : expenseObject.expenseType.code,
							description : expenseObject.expenseType.description
						},
						maintainSkillsYN : expenseObject.maintainSkillsYN,
						meetMinimumQualsYN : expenseObject.meetMinimumQualsYN,
						newCareerFieldYN : expenseObject.newCareerFieldYN
					});
				}
			});
			vm.coursesAndCourseRelatedExpenses = _.map(courses, function (course) {
				course.feesAmount = 0;
				course.relatedExpenses = _.filter(courseRelatedExpenses, { applicationCoursesID: course.applicationCoursesID });
				if (course.relatedExpenses && course.relatedExpenses.length > 0) {
					_.each(course.relatedExpenses, function (expense) {
						course.feesAmount += expense.feesAmount;
					});
				}
				return course;
			});
		} else {
			var emptyExpense = {};
			courseRelatedExpenses.push(emptyExpense);
			vm.coursesAndCourseRelatedExpenses = _.map(courses, function (course) {
				course.feesAmount = 0;
				course.relatedExpenses = [];
				return course;
			});
		}
		updateTotals();
	}

	var updateModel = function (application) {
		applicationId = application.applicationID;
		vm.application = application;
		vm.enableNonCourseExpenses = application.benefitPeriodID.programID.nonCourseExpenses;
		vm.enableCompletionDate = application.benefitPeriodID.programID.enableParticipantProgramCompletionDate;
		$scope.addCourseSessionForm.courseStartDate = _.get(application, 'reimburseTuitionApp.courseStartDate');
		$scope.addCourseSessionForm.courseEndDate = _.get(application, 'reimburseTuitionApp.courseEndDate');
		getCoursesContent();
	};

	var updateView = function () {
		$scope.addCourseSessionForm.degreeCompleteYN = vm.application.degreeCompleteYN;
		$scope.addCourseSessionForm.expGraduationDt = _.get(vm, 'application.participantID.currentEducationProfile.expGraduationDt');
		applicationService.api.one('courses').getList('methods').then(function (response) {
			vm.status = 'success';
			vm.methods = response.plain();
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});

		applicationService.api.one(applicationId).one('expenses').getList('expenseTypes').then(function (response) {
			vm.courseRelatedExpenseTypes = _.filter(response.plain(), function (expenseType) {
				return expenseType.expenseRelation === 'CRS' || expenseType.expenseRelation === 'BOTH';
			});
			vm.otherExpenseTypes = _.filter(response.plain(), function (expenseType) {
				return expenseType.expenseRelation === 'NONCRS' || expenseType.expenseRelation === 'BOTH';
			});
			vm.status = 'success';
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});

		applicationService.getApplicationCourses(applicationId).then(function (courseResponse) {
			if (courseResponse.length !== 0) {
				vm.hideCourseForm = true;
				applicationService.getApplicationExpenses(applicationId).then(function (expenseResponse) {
					generateCoursesAndExpensesList(courseResponse.plain(), expenseResponse.plain());
					vm.coursesTableStatus = 'success';
				}, function (errorResponse) {
					vm.coursesTableStatus = 'error';
					vm.status = 'error';
					vm.message = _.get(errorResponse, 'data.message');
				});
			} else {
				vm.coursesTableStatus = 'noCourses';
			}
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	//TODO: need to get the session dates and save it to the model
	if ($scope.application) {
		updateModel($scope.application);
		updateView();
	} else {
		$scope.updateApplicationScope('status', 'loading');
		applicationService.getTuitionApplication(applicationId).then(function (response) {
			updateModel(response);
			$scope.updateApplicationScope('application', response);
			updateView();
			$scope.updateApplicationScope('status', '');
		}, function (errorResponse) {
			$scope.updateApplicationScope('status', 'error');
			$scope.updateApplicationScope('errorMessage', _.get(errorResponse, 'data.message'));
		});
	}
	// Adds newly added course related expenses to Course Object 
	function createCourseRelatedExpensesArray(expenseResponse, courseObject) {
		var courseExpenseObject;
		_.each(expenseResponse, function (expenseObject) {
			courseExpenseObject = {
				applicationCoursesID: expenseObject.relatedCourseID.applicationCoursesID,
				applicationExpensesID: expenseObject.applicationExpensesID,
				feesAmount: expenseObject.feesAmount,
				numberOfBooks: expenseObject.numberOfBooks,
				courseRelatedExpense : 'Yes',
				expenseType : {
					expenseTypeID : expenseObject.expenseType.expenseTypeID,
					code : expenseObject.expenseType.code,
					description : expenseObject.expenseType.description
				},
				status: 'saved'
			};
			courseObject.relatedExpenses.push(courseExpenseObject);
		});
	}
	//creates a course object and add it to the list when we create/edit a course
	function createCourseExpenseObject(newCourseOrExpenseReponse) {
		var courseExpenseObject = {
			applicationCoursesID: newCourseOrExpenseReponse.applicationCoursesID,
			courseNumber: newCourseOrExpenseReponse.courseNumber,
			courseName : newCourseOrExpenseReponse.courseName,
			tuitionAmount : newCourseOrExpenseReponse.tuitionAmount,
			feesAmount : 0,
			creditHours : newCourseOrExpenseReponse.creditHours,
			courseMethod : {
				courseMethodId : newCourseOrExpenseReponse.courseMethod.courseMethodId,
				courseMethod : newCourseOrExpenseReponse.courseMethod.courseMethod
			},
			maintainSkillsYN : newCourseOrExpenseReponse.maintainSkillsYN,
			meetMinimumQualsYN : newCourseOrExpenseReponse.meetMinimumQualsYN,
			newCareerFieldYN : newCourseOrExpenseReponse.newCareerFieldYN
		};
		return courseExpenseObject;
	}

	//creates a non-course expense object and add it to the list when we create/edit a expense
	function createExpenseObject(expenseResponse) {
		var expenseObject = {
			applicationExpensesID: expenseResponse.applicationExpensesID,
			courseNumber: '',
			courseName : 'Non Course Related Expenses' + '-' + expenseResponse.expenseType.description,
			tuitionAmount : 0,
			feesAmount : expenseResponse.feesAmount,
			expenseType : {
				expenseTypeID : expenseResponse.expenseType.expenseTypeID
			},
			maintainSkillsYN : expenseResponse.maintainSkillsYN,
			meetMinimumQualsYN : expenseResponse.meetMinimumQualsYN,
			newCareerFieldYN : expenseResponse.newCareerFieldYN
		};
		return expenseObject;
	}

	function getNewListofCourses(newCourseOrExpenseReponse) {
		var newCoursesAndExpensesList = [];
		_.each(vm.coursesAndCourseRelatedExpenses, function (courseOrExpense) {
			newCoursesAndExpensesList.push(courseOrExpense);
		});
		var courseExpenseObject = createCourseExpenseObject(newCourseOrExpenseReponse);
		newCoursesAndExpensesList.push(courseExpenseObject);
		vm.coursesAndCourseRelatedExpenses = newCoursesAndExpensesList;
		updateTotals();
		vm.hideCourseForm = true;
		vm.coursesTableStatus = 'success';
	}

	function getNewListofCoursesAndExpenses(newCourseObject) {
		var newCoursesAndExpensesList = [];
		_.each(vm.coursesAndCourseRelatedExpenses, function (courseOrExpense) {
			newCoursesAndExpensesList.push(courseOrExpense);
		});
		newCoursesAndExpensesList.push(newCourseObject);
		vm.coursesAndCourseRelatedExpenses = newCoursesAndExpensesList;
		updateTotals();
		vm.hideCourseForm = true;
		vm.coursesTableStatus = 'success';
	}

	function setErrorMessage(errorMessage) {
		vm.status = 'error';
		vm.message = errorMessage;
		$location.hash('applicationHeader');
		$anchorScroll();
	}

	$scope.resetCourseForm = function () {
		vm.hideCourseForm = false;
		vm.isEditCourse = false;
		vm.displayNonTaxableAlert = false;
		vm.displayTaxableAlert = false;
		$scope.addCourseExpenseForm = {
			courseRelatedExpense : 'No'
		};
		_.forEach(vm.courseTaxQuestions, function (courseQuestion) {
			courseQuestion.modelValue = '';
		});
		vm.courseExpenses = [];
		vm.courseExpense = {'status' : 'new'};
		$scope.initCourseExpence();
		vm.courseExpenseFormSubmitted = false;
	};

	$scope.resetExpenseForm = function () {
		vm.isEditExpense = false;
		vm.displayAcceptedExpenseAlert = false;
		vm.displayDeclinedExpenseAlert = false;

		$scope.addExpenseForm = {};
		if (vm.otherExpenseTypes && vm.otherExpenseTypes.length === 1) {
			$scope.addExpenseForm.expenseType = {};
			$scope.addExpenseForm.expenseType.expenseTypeID = vm.otherExpenseTypes[0].expenseTypeID;
		}
		_.forEach(vm.expenseTaxQuestions, function (expenseQuestion) {
			expenseQuestion.modelValue = '';
		});
		vm.otherExpenseFormSubmitted = false;
	};
	$scope.showCourseExpenceForm = function () {
		vm.showCourseExpenseForm = true;
		$scope.initCourseExpence();
	};
	$scope.checkShowCourseExpenseForm = function () {
		if (vm.courseExpenses.length === 0 || vm.showCourseExpenseForm) {
			$scope.initCourseExpence();
			return true;
		}
		return false;
	};
	$scope.initCourseExpence = function () {
		if (vm.courseRelatedExpenseTypes && vm.courseRelatedExpenseTypes.length === 1) {
			vm.courseExpense.expenseType = {};
			vm.courseExpense.expenseType.expenseTypeID = vm.courseRelatedExpenseTypes[0].expenseTypeID;
		}
	};
	$scope.addCourseExpense = function () {
		if (!vm.courseExpense.expenseType || !vm.courseExpense.expenseType.expenseTypeID) {
			return;
		} else if (vm.courseExpense.expenseType.expenseTypeID === 3 && (!vm.courseExpense.numberOfBooks || vm.courseExpense.numberOfBooks < 1 || vm.courseExpense.numberOfBooks.$invalid)) {
			return;
		} else if (!vm.courseExpense.feesAmount || vm.courseExpense.feesAmount.$invalid) {
			return;
		} else {
			vm.courseExpense.expenseType.description = _.find(vm.courseRelatedExpenseTypes, {'expenseTypeID' : vm.courseExpense.expenseType.expenseTypeID}).description;
			vm.courseExpense.feesAmount = parseFloat(vm.courseExpense.feesAmount);
			vm.courseExpenses.push(vm.courseExpense);
			vm.showCourseExpenseForm = false;
			vm.courseExpense = {'status' : 'new'};
		}
	};
	$scope.deleteCourseExpense = function (expense) {
		expense.status = 'deleted';
	};
	$scope.submitAddCourseForm = function () {
		vm.courseExpenseFormSubmitted = true;

		vm.status = 'submitting';
		//Validates for required fields before calling the service
		if (!$scope.addCourseExpenseForm) {
			setErrorMessage(constants.errors.missingRequiredFields);
			return;
		}
		else if (!$scope.addCourseExpenseForm.courseNumber || !$scope.addCourseExpenseForm.courseName || !$scope.addCourseExpenseForm.courseMethod ||
			!$scope.addCourseExpenseForm.tuitionAmount) {
			setErrorMessage(constants.errors.missingRequiredFields);
			return;
		} else if ($scope.addCourseExpenseForm.courseMethod && !$scope.addCourseExpenseForm.courseMethod.courseMethodId) {
			setErrorMessage(constants.errors.missingRequiredFields);
			return;
		} else if (vm.taxQuestionsCount > 0) {
			var taxError = false;
			_.forEach(vm.courseTaxQuestions, function (courseTaxQuestion) {
				if (!courseTaxQuestion.modelValue || courseTaxQuestion.modelValue === '') {
					setErrorMessage(constants.errors.missingTaxInformation);
					taxError = true;
				}
			});
			if (taxError) {
				return;
			}
		} 

		$scope.addCourseExpenseForm.courseMethod = {
			courseMethodId: $scope.addCourseExpenseForm.courseMethod.courseMethodId,
			courseMethod: $scope.addCourseExpenseForm.courseMethod.courseMethod
		};
		var newExpenses = $filter('filter')(vm.courseExpenses, {status: '!deleted'});
		if (newExpenses.length === 0) {
			$scope.addCourseExpenseForm.courseRelatedExpense = 'No';
		}
		$scope.addCourseExpenseForm.maintainSkillsYN = _.result(_.find(vm.courseTaxQuestions, {'name': 'courseTaxQ1'}), 'modelValue');
		$scope.addCourseExpenseForm.meetMinimumQualsYN = _.result(_.find(vm.courseTaxQuestions, {'name': 'courseTaxQ2'}), 'modelValue');
		$scope.addCourseExpenseForm.newCareerFieldYN = _.result(_.find(vm.courseTaxQuestions, {'name': 'courseTaxQ3'}), 'modelValue');
		var courseFormData = $scope.addCourseExpenseForm;
		if (!courseFormData.applicationCoursesID) {
			applicationService.saveApplicationCourse(applicationId, courseFormData).then(function (courseResponse) {
				var courseFirstElement = _.first(courseResponse.plain());
				var courseObject = createCourseExpenseObject(courseFirstElement);
				if (courseFormData.courseRelatedExpense === 'Yes') {
					courseObject.relatedExpenses = [];
					var relatedCourseID = {applicationCoursesID: courseFirstElement.applicationCoursesID};
					_.each(newExpenses, function (expense) {
						expense.relatedCourseID = relatedCourseID;
						expense.maintainSkillsYN = $scope.addCourseExpenseForm.maintainSkillsYN;
						expense.meetMinimumQualsYN = $scope.addCourseExpenseForm.meetMinimumQualsYN;
						expense.newCareerFieldYN = $scope.addCourseExpenseForm.newCareerFieldYN;
						expense.status = 'saved';
						courseObject.feesAmount += expense.feesAmount;
					});
					applicationService.saveApplicationExpense(applicationId, newExpenses).then(function (expenseResponse) {
						createCourseRelatedExpensesArray(expenseResponse, courseObject);
						getNewListofCoursesAndExpenses(courseObject);
						vm.status = 'success';
					}, function (errorResponse) {
						setErrorMessage(errorResponse.data.message);
						vm.hideCourseForm = true;
					});
				} else {
					//Creates a course object
					getNewListofCourses(courseFirstElement);
					vm.status = 'success';
				}
			}, function (errorResponse) {
				setErrorMessage(errorResponse.data.message);
				vm.hideCourseForm = true;
			});
		} else {
			applicationService.updateApplicationCourse(applicationId, courseFormData).then(function (courseResponse) {
				var relatedCourseID = courseResponse;
				var index = _.findIndex(vm.coursesAndCourseRelatedExpenses, { 'applicationCoursesID': courseResponse.applicationCoursesID});
				var courseObject = createCourseExpenseObject(courseResponse.plain());
				courseObject.relatedExpenses = _.filter(vm.courseExpenses, {'status' : 'saved'});
				courseObject.feesAmount = vm.coursesAndCourseRelatedExpenses[index].feesAmount;
				var deletedExpenses = _.filter(vm.courseExpenses, {'status' : 'deleted'});
				var expencesToSave = _.filter(vm.courseExpenses, {'status' : 'new'});
				if (courseFormData.courseRelatedExpense === 'Yes') {
					if (deletedExpenses.length > 0) {
						_.each(deletedExpenses, function (expense) {
							if (expense.applicationExpensesID) {
								courseObject.feesAmount -= expense.feesAmount;
							}
						});
						_.each(deletedExpenses, function (expense) {
							if (expense.applicationExpensesID) {
								applicationService.deleteApplicationExpense(applicationId, expense.applicationExpensesID).then(function (deleteResponse) {
								}, function (errorResponse) {
									setErrorMessage(errorResponse.data.message);
									vm.hideCourseForm = true;
									return;
								});
							}
						});
					}
					if (expencesToSave.length > 0) {
						_.each(expencesToSave, function (expense) {
							expense.relatedCourseID = relatedCourseID;
							expense.maintainSkillsYN = $scope.addCourseExpenseForm.maintainSkillsYN;
							expense.meetMinimumQualsYN = $scope.addCourseExpenseForm.meetMinimumQualsYN;
							expense.newCareerFieldYN = $scope.addCourseExpenseForm.newCareerFieldYN;
							expense.status = 'saved';
							courseObject.feesAmount += expense.feesAmount;
						});
						applicationService.saveApplicationExpense(applicationId, expencesToSave).then(function (expenseResponse) {
							createCourseRelatedExpensesArray(expenseResponse, courseObject);
							vm.status = 'success';
						}, function (errorResponse) {
							setErrorMessage(errorResponse.data.message);
							vm.hideCourseForm = true;
							return;
						});
					}
					vm.coursesAndCourseRelatedExpenses[index] = courseObject;
					updateTotals();
				} else {
					if (vm.courseExpenses && vm.courseExpenses.length > 0) {
						courseObject.relatedExpenses = [];
						courseObject.feesAmount = 0;
						_.each(vm.coursesAndCourseRelatedExpenses[index].relatedExpenses, function (expense) {
							if (expense.applicationExpensesID) {
								applicationService.deleteApplicationExpense(applicationId, expense.applicationExpensesID).then(function (deleteResponse) {
								}, function (errorResponse) {
									setErrorMessage(errorResponse.data.message);
									vm.hideCourseForm = true;
									return;
								});
							}
						});
					}
					vm.coursesAndCourseRelatedExpenses[index] = courseObject;
					updateTotals();
				}
				vm.hideCourseForm = true;
				vm.status = 'success';
			}, function (errorResponse) {
				setErrorMessage(errorResponse.data.message);
				vm.hideCourseForm = true;
			});
		}
	};

//Creates or edits non-course expenses.
	$scope.submitOtherExpenseForm = function () {
		vm.otherExpenseFormSubmitted = true;
		vm.status = 'submitting';
		if (vm.coursesAndCourseRelatedExpenses.length === 0) {
			setErrorMessage(constants.errors.noCoursesForExpense);
			$scope.expenseRadio.otherExpense = 'No';
			return;
		} else if ($scope.expenseRadio.otherExpense === 'Yes' && !$scope.addExpenseForm.feesAmount || !$scope.addExpenseForm.expenseType) {
			setErrorMessage(constants.errors.missingRequiredFields);
			return;
		} else if ($scope.addExpenseForm.expenseType && !$scope.addExpenseForm.expenseType.expenseTypeID) {
			setErrorMessage(constants.errors.missingRequiredFields);
			return;
		} else if (!$scope.addExpenseForm.feesAmount) {
			setErrorMessage(constants.errors.missingRequiredFields);
			return;
		} else if (vm.taxQuestionsCount) {
			var taxError = false;
			_.forEach(vm.expenseTaxQuestions, function (expenseTaxQuestion) {
				if (!expenseTaxQuestion.modelValue || expenseTaxQuestion.modelValue === '') {
					setErrorMessage(constants.errors.missingTaxInformation);
					taxError = true;
				}
			});
			if (taxError) {
				return;
			}
		}

		$scope.addExpenseForm.maintainSkillsYN = _.result(_.find(vm.expenseTaxQuestions, {'name': 'expenseTaxQ1'}), 'modelValue');
		$scope.addExpenseForm.meetMinimumQualsYN = _.result(_.find(vm.expenseTaxQuestions, {'name': 'expenseTaxQ2'}), 'modelValue');
		$scope.addExpenseForm.newCareerFieldYN = _.result(_.find(vm.expenseTaxQuestions, {'name': 'expenseTaxQ3'}), 'modelValue');
		var expenseFormData = this.addExpenseForm;
		if (!expenseFormData.applicationExpensesID) {
			applicationService.saveApplicationExpense(applicationId, [expenseFormData]).then(function (expenseResponse) {
				var newExpensesList = [];
				var expenseFirstElement = _.first(expenseResponse.plain());
				_.each(vm.otherExpenses, function (otherExpense) {

					newExpensesList.push(otherExpense);
				});
				newExpensesList.push(createExpenseObject(expenseFirstElement));
				vm.otherExpenses = newExpensesList;
				updateTotals();
				$scope.expenseRadio.otherExpense = 'No';
				vm.status = 'success';
			}, function (errorResponse) {
				setErrorMessage(errorResponse.data.message);
			});
		} else {
			var index = _.findIndex(vm.otherExpenses, { 'applicationExpensesID': expenseFormData.applicationExpensesID });
			applicationService.updateApplicationExpense(applicationId, expenseFormData).then(function (expenseResponse) {
				vm.otherExpenses[index] = createExpenseObject(expenseResponse.plain());
				updateTotals();
				vm.status = 'success';
				$scope.expenseRadio.otherExpense = 'No';
			}, function (errorResponse) {
				setErrorMessage(errorResponse.data.message);
			});
		}
	};

	$scope.deleteCourse = function (course) {
		vm.status = 'submitting';
		if (vm.coursesAndCourseRelatedExpenses.length === 1 && vm.otherExpenses.length > 0) {
			vm.status = 'error';
			vm.message = constants.errors.oneCourseForExpense;
		} else {
			applicationService.deleteApplicationCourse(applicationId, course.applicationCoursesID).then(function (response) {
				vm.coursesAndCourseRelatedExpenses.splice(vm.coursesAndCourseRelatedExpenses.indexOf(course), 1);
				updateTotals();
				if (vm.coursesAndCourseRelatedExpenses.length === 0 && vm.otherExpenses.length === 0) {
					$scope.resetCourseForm();
					vm.coursesTableStatus = 'noCourses';
				}
				vm.status = 'success';
			}, function (errorResponse) {
				vm.status = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});
		}
	};

	$scope.deleteExpense = function (expense) {
		vm.status = '';
		applicationService.deleteApplicationExpense(applicationId, expense.applicationExpensesID).then(function (response) {
			vm.otherExpenses.splice(vm.otherExpenses.indexOf(expense), 1);
			updateTotals();
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	$scope.editCourse = function (course) {
		vm.status = '';
		vm.isEditCourse = true;
		if (course.relatedExpenses && course.relatedExpenses.length > 0) {
			vm.courseExpenses = angular.copy(course.relatedExpenses);
		} else {
			vm.courseExpenses = [];
		}
		vm.courseExpense = {'status' : 'new'};
		$scope.initCourseExpence();
		var tempCourse = angular.copy(course);
		$scope.addCourseExpenseForm = tempCourse;
		_.forEach(vm.courseTaxQuestions, function (courseQuestion) {
			if (courseQuestion.name === 'courseTaxQ1') {
				courseQuestion.modelValue = tempCourse.maintainSkillsYN;
			} else if (courseQuestion.name === 'courseTaxQ2') {
				courseQuestion.modelValue = tempCourse.meetMinimumQualsYN;
			} else if (courseQuestion.name === 'courseTaxQ3') {
				courseQuestion.modelValue = tempCourse.newCareerFieldYN;
			}
		});
		$scope.addCourseExpenseForm.courseMethod.courseMethodId = tempCourse.courseMethod.courseMethodId;
		if (course.relatedExpenses && course.relatedExpenses.length > 0) {
			$scope.addCourseExpenseForm.courseRelatedExpense = 'Yes';
		} else {
			$scope.addCourseExpenseForm.courseRelatedExpense = 'No';
		}
		vm.hideCourseForm = false;
		vm.courseExpenseFormSubmitted = false;
	};

	$scope.editExpense = function (expense) {
		vm.status = '';
		vm.isEditExpense = true;
		var tempExpense = angular.copy(expense);
		$scope.addExpenseForm = tempExpense;
		_.forEach(vm.expenseTaxQuestions, function (expenseQuestion) {
			if (expenseQuestion.name === 'expenseTaxQ1') {
				expenseQuestion.modelValue = tempExpense.maintainSkillsYN;
			} else if (expenseQuestion.name === 'expenseTaxQ2') {
				expenseQuestion.modelValue = tempExpense.meetMinimumQualsYN;
			} else if (expenseQuestion.name === 'expenseTaxQ3') {
				expenseQuestion.modelValue = tempExpense.newCareerFieldYN;
			}
		});

		$scope.expenseRadio.otherExpense = 'Yes';
		vm.otherExpenseFormSubmitted = false;
	};

	$scope.$watch('addCourseSessionForm.courseStartDate', function (newval, oldval) {
		if (_.get($scope, 'addCourseSessionForm.courseEndDate')) {
			if ($scope.addCourseSessionForm.courseEndDate < $scope.addCourseSessionForm.courseStartDate) {
				$scope.addCourseSessionForm.courseEndDate = '';
			}
		}
	});

	$scope.$watch('addCourseSessionForm.courseEndDate', function (newval, oldval) {
		if (_.get($scope, 'addCourseSessionForm.courseEndDate')) {
			if ($scope.addCourseSessionForm.courseEndDate < $scope.addCourseSessionForm.courseStartDate) {
				$scope.addCourseSessionForm.courseEndDate = '';
			}
		}
	});

	$scope.$watch('addCourseSessionForm.degreeCompleteYN', function (newval) {
		if (newval) {
			$scope.sessionInformationForm.actualGradDate.$setPristine();
		} else if (vm.enableCompletionDate) {
			$scope.sessionInformationForm.expectedGradDate.$setPristine();
		} else {
			$scope.addCourseSessionForm.expGraduationDt = '';
		}
	});

	var sessionInformationForm = function (sessionformData) {
		if (!vm.coursesAndCourseRelatedExpenses.length) {
			setErrorMessage(constants.errors.addAtleastOneCourse);
		} else if (!sessionformData.$invalid) {
			$scope.updateApplicationScope('status', 'submitting');
			applicationService.saveCourseSessionInfo(applicationId, $scope.addCourseSessionForm).then(function (response) {
				$state.go(constants.routes.agreement, {applicationId: applicationId});
			}, function (errorResponse) {
				vm.status = 'error';
				vm.message = _.get(errorResponse, 'data.message');
			});
		} else {
			setErrorMessage(constants.errors.missingRequiredFields);
		}
	};
	vm.gradDateAfterSession = function () {
		if (!$scope.addCourseSessionForm.expGraduationDt) {
			return true;
		}
		if (!$scope.addCourseSessionForm.courseEndDate || ($scope.addCourseSessionForm.courseEndDate > $scope.addCourseSessionForm.expGraduationDt)) {
			return false;
		}
		return true;
	};

	$scope.coursesTableExpanded = function () {
		return vm.coursesTableStatus === 'noCourses' || !vm.hideCourseForm;
	};

	vm.getContentHtml = function (contentName) {
		return $sce.trustAsHtml(_.result(_.find(vm.content, {'name' : contentName}), 'data'));
	};
	$scope.focusOnFirstFormElement();
	$scope.updateApplicationScope('submitChildForm', sessionInformationForm);

	$scope.dateOptions = {
		showWeeks: false
	};
	
	/**
	 * @ngdoc method
	 * @name courseTaxQuestionChange
	 * @methodOf edAssistApp.controller:coursesController
	 * @description
	 * As the user selects or changes each tax related question information is gathered
	 * to help decide which alert to display once all questions have been answered.
	 * 
	 * If 1 question is asked and the response is “Yes” then the expense is non-taxable, 
	 * otherwise the expense is taxable if tax limit is exceeded in the Tax Year.
	 * 
	 * If 3 questions are asked and the order of the responses is YNN, then the 
	 * expense is non-taxable, otherwise the expense is taxable if Tax Limit is exceeded 
	 * in the Tax Year.
	 */
	vm.courseTaxQuestionChange = function() {
		if (vm.courseTaxQuestions.length === 3) {
			vm.displayNonTaxableAlert = vm.courseTaxQuestions[0].modelValue === 'Y' && vm.courseTaxQuestions[1].modelValue === 'N' && vm.courseTaxQuestions[2].modelValue === 'N';
			vm.displayTaxableAlert = !vm.displayNonTaxableAlert && _.every(vm.courseTaxQuestions, 'modelValue');
		} 
		
		if (vm.courseTaxQuestions.length === 1) {
			vm.displayNonTaxableAlert = vm.courseTaxQuestions[0].modelValue === 'Y';
		 	vm.displayTaxableAlert = vm.courseTaxQuestions[0].modelValue === 'N';
		}
	};

	/**
	 * @ngdoc method
	 * @name courseExpenseQuestionChange
	 * @methodOf edAssistApp.controller:coursesController
	 * @description
	 * As the user selects or changes each expense related question information is gathered
	 * to help decide which alert to display once all questions have been answered.
	 */
	vm.courseExpenseQuestionChange = function() {
		if (vm.expenseTaxQuestions.length === 3) {
			vm.displayAcceptedExpenseAlert = vm.expenseTaxQuestions[0].modelValue === 'Y' && vm.expenseTaxQuestions[1].modelValue === 'N' && vm.expenseTaxQuestions[2].modelValue === 'N';
			vm.displayDeclinedExpenseAlert = !vm.displayAcceptedExpenseAlert && _.every(vm.expenseTaxQuestions, 'modelValue');
		}

		if (vm.expenseTaxQuestions.length === 1) {
			vm.displayAcceptedExpenseAlert = vm.expenseTaxQuestions[0].modelValue === 'Y';
			vm.displayDeclinedExpenseAlert = vm.expenseTaxQuestions[0].modelValue === 'N';
		}
	};

	vm.cancelCourseExpense = function() {
		vm.showCourseExpenseForm = false;
		vm.courseExpense = {'status' : 'new'};
		if (!_.get(vm, 'courseExpenses.length')) {
			$scope.addCourseExpenseForm.courseRelatedExpense = null;
		}
	};
}]);