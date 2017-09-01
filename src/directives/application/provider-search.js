'use strict';

angular.module('edAssistApp').directive('providerSearch', ['$location', '$anchorScroll', '$sce', '$q', 'educationProvidersService', 'storageService', 'generalContentService', 'contentConstants', function ($location, $anchorScroll, $sce, $q, educationProvidersService, storageService, generalContentService, contentConstants) {
	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'src/directives/application/templates/provider-search.html',
		controllerAs: 'providerSearchCtrl',
		controller: function ($scope, $element, $attrs) {
			var vm = this;
			var clientId = storageService.get('client.clientLoginDetails.clientId');
			vm.searchParams = {};
			vm.educationProviders = [];
			vm.programAccreditations = [];
			vm.hasSearched = false;
			vm.startingResultLimit = 5;
			vm.resultLimit = vm.startingResultLimit;
			vm.accredModalState = 'hide';
			vm.ApplEducationProvSearch = '';			
			vm.inEligibleProvider = '';

			generalContentService.findByName(contentConstants.component.applicationStep2, contentConstants.name.applEducationProvSearch, clientId, contentConstants.program.clientDefault, true).then(function (response) {
				if (response.length > 0) {
					vm.ApplEducationProvSearch = $sce.trustAsHtml(response[0].data);
				}
			});

			$scope.$watch('model.educationProfile.programID.programAccreditingBodyCollection', function (newValue) {
				if (newValue) {
					vm.programAccreditations = newValue;
				}
			});

			vm.hasNoResults = function () {
				return (vm.educationProviders.length === 0 && vm.hasSearched && vm.status !== 'submitting' && vm.status !== 'error');
			};

			$scope.handleGetContent = function (promiseArray) {
				$q.all(promiseArray).then(function (response) {		
				});
			};
	
			var getContentPromise =	generalContentService.findByName(contentConstants.component.applicationStep2, contentConstants.name.ineligibleProvider, clientId, contentConstants.program.clientDefault).then(function (response) {
				if (_.size(response) > 0) {
					vm.inEligibleProvider = _.first(response.plain()).data;						
				}
			});

			vm.setSelectedProvider = function (provider) {
				$scope.handleGetContent([getContentPromise]);				
				var currentProgram = _.get($scope, 'model.educationProfile.programID');												
				if (currentProgram) {
					var matchingAccreds = _.intersectionBy(currentProgram.programAccreditingBodyCollection, provider.providerAccreditationCollection, 'accreditingBody.accreditingBodyID');
					vm.isIneligibleProvider = !matchingAccreds.length;
					_.set($scope.model.educationProfile, 'isIneligibleProvider', vm.isIneligibleProvider);
					if (vm.isIneligibleProvider && currentProgram.warnIneligibleAccredition) {
						vm.accredModalState = 'show';
					} else {
						_.set($scope, 'model.educationProfile.providerID', provider);
						if (provider) {
							educationProvidersService.setEditing(false);
						}
						$location.hash('educationHeader');
						$anchorScroll();
					}
				}
				vm.selectedProvider = {
					model : provider,
					modalBody : vm.inEligibleProvider,
					populateProvider: function(model) {
						_.set($scope, 'model.educationProfile.providerID', model);
						if (model) {
							educationProvidersService.setEditing(false);
						}
						$location.hash('educationHeader');
						$anchorScroll();
						vm.accredModalState = 'hide';
					}
				};
			};
			
			vm.shouldShowMoreResultsLink = function () {
				return vm.resultLimit < vm.educationProviders.length;
			};

			vm.showMoreResults = function () {
				vm.resultLimit += vm.startingResultLimit;
			};

			var resetResultCounter = function () {
				vm.resultLimit = vm.startingResultLimit;
			};

			vm.isEditing = function () {
				if (educationProvidersService.isEditing()) {
					$location.hash('searchProvider');
					$anchorScroll();
				}
				return educationProvidersService.isEditing();
			};

			vm.cancelSearch = function () {
				educationProvidersService.setEditing(false);
				vm.hasSearched = false;
				vm.searchParams = {};
				$scope.$emit('cancelSearch', true);
				$location.hash('educationHeader');
				$anchorScroll();
			};

			$scope.escKey = function (keyCode) {
				if (keyCode === 27) {
					educationProvidersService.setEditing(false);
					vm.hasSearched = false;
					vm.searchParams = {};
					$location.hash('educationHeader');
					$anchorScroll();
				}
			};

			$scope.searchProviders = function () {
				vm.status = 'submitting';
				vm.searchParams = _.omitBy(vm.searchParams, _.isNull);
				if (!vm.searchParams.providerName) {
					vm.searchParams.providerName = '';
				}
				educationProvidersService.getEducationProviders(clientId, vm.searchParams).then(function (response) {
					resetResultCounter();
					vm.educationProviders = response;
					vm.hasSearched = true;
					vm.status = 'success';
				}, function (errorResponse) {
					vm.status = 'error';
					vm.message = _.get(errorResponse, 'data.message');
					vm.hasSearched = true;
				});	
			};
			
		}
	};
}]);