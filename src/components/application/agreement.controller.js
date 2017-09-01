'use strict';

angular.module('edAssistApp').controller('agreementController',
	['$scope', '$state', '$stateParams', '$q', 'applicationService', 'generalContentService', 'storageService', 'constants', 'contentConstants',
	function ($scope, $state, $stateParams, $q, applicationService, generalContentService, storageService, constants, contentConstants) {
	
	var stepViewData = {
		stepNumber: 4,
		formName: 'agreementForm',
		stepHeader: 'APPLICATION.AGREEMENT.HEADER',
		submitButtonName: 'GENERAL.CONTINUE',
		applicationId: $stateParams.applicationId
	};
	$scope.updateApplicationScope('stepViewData', stepViewData);
	$scope.updateApplicationScope('status', 'loading');
	var vm = this;
	vm.agreementStatus = 'loading';
	vm.grantsStatus = 'submitting';
	vm.userDetails = storageService.get('user.userDetails');
	vm.userSignature = vm.userDetails.firstName + ' ' + vm.userDetails.lastName;
	vm.agreementForm = {};
	var applicationId = $stateParams.applicationId;
	var programId = $scope.application.benefitPeriodID.programID.programID;
	var clientId = storageService.get('client.clientLoginDetails.clientId');

	applicationService.api.one('grants-scholarship').getList('types').then(function (response) {
		vm.grantsStatus = 'success';
		vm.grantTypes = response;
	}, function (errorResponse) {
		vm.status = 'error';
		$scope.updateApplicationScope('status', 'error');
		vm.message = _.get(errorResponse, 'data.message');
	});

	var loadApplication = function () {
		if (applicationId) {
			if ($scope.application) {
				if ($scope.application.financialAidSourceId && $scope.application.financialAidSourceId.financialAidSourceId !== 0) {
					vm.agreementForm.grantsEligible = 'Y';
				} else {
					vm.agreementForm.grantsEligible = 'N';
				}
				vm.agreementForm.financialAidSourceId = $scope.application.financialAidSourceId;
				vm.agreementForm.otherFinancialAid = $scope.application.otherFinancialAid;
				vm.agreementForm.financialAidAmount = $scope.application.financialAidAmount;
				programId = programId;
				return applicationId;
			} else {
				return applicationService.getGrantsScholarship(applicationId).then(function (response) {
					vm.agreementForm = response;
					if (vm.agreementForm.financialAidSourceId && vm.agreementForm.financialAidSourceId.financialAidSourceId !== 0) {
						vm.agreementForm.grantsEligible = 'Y';
					} else {
						vm.agreementForm.grantsEligible = 'N';
					}
				}, function (errorResponse) {
					$scope.updateApplicationScope('status', 'error');
					$scope.updateApplicationScope('errorMessage', _.get(errorResponse, 'data.message'));
				});
			}
		}
	};

	var getPageContent = function () {
		generalContentService.getAgreements(contentConstants.component.applicationStep4, clientId, programId, false).then(function (response) {
			$scope.updateApplicationScope('status', 'success');
			vm.agreementContent = response.agreementsList;
			vm.agreementSignInstruction = response.agreementSignIntstruction;
			vm.step4Intro = response.step4Intro;
			vm.applGrantsScholars = response.applGrantsScholars;
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};

	$q.when(loadApplication()).then(getPageContent);

	vm.clearGrants = function () {
		if (vm.agreementForm.grantsEligible === 'N') {
			vm.agreementForm = {
				grantsEligible : 'N',
				signature : vm.agreementForm.signature
			};
		}
	};
// TODO It will be nice to have a promise for grants, agreements post calls before we route to application summay page.
	var submitAgreementForm = function (form) {
		if (form.$invalid) {
			vm.status = 'error';
			vm.message = constants.errors.agreementValidationerror;
			form.submitted = true;
			var count = 0, errors = form.$error;
			_.forEach(errors, function (val) {
				if (_.isArray(val)) {
					count += val.length;
				}
			});
			if (count > 1) {
				vm.unsavedState = 'show';
			}
			return;
		}
		if (vm.agreementForm.signature !== vm.userSignature) {
			form.signature.$invalid = true;
			return;
		}
		vm.status = 'submitting';
		$scope.updateApplicationScope('status', 'submitting');
		applicationService.api.one(applicationId).post('agreements', {}, {'agreementVerify': true}).then(function (response) {
			if (vm.agreementForm.grantsEligible !== 'Y') {
				//Setting Financial Aid Source to NONE if it is a 'No'
				vm.agreementForm.financialAidSourceId = {
					financialAidSourceId : 0
				};
				vm.agreementForm.otherFinancialAid = '';
				vm.agreementForm.financialAidAmount = 0;
			}
			applicationService.api.one(applicationId).post('grants-scholarship', vm.agreementForm).then(function (response) {
				vm.status = 'success';
				form.$setPristine();
				$state.go(constants.routes.summary, {applicationId: applicationId});
			}, function (errorResponse) {
				vm.status = 'error';
				vm.message = _.get(errorResponse, 'data.message');
				return;
			});
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};
	$scope.focusOnFirstFormElement();
	// the form tag is in the parent scope (application). We need to attach the sunmit function to the parent scope to be called.
	$scope.updateApplicationScope('submitChildForm', submitAgreementForm);
}]);