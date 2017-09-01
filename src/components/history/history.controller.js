'use strict';

angular.module('edAssistApp').controller('historyController',

	['$scope', '$q', '$state', '$stateParams', 'constants', 'participantService', 'applicationService', 'fileContentService', 'storageService',
	function ($scope, $q, $state, $stateParams, constants, participantService, applicationService, fileContentService, storageService) {

	var vm = this;
	var loadingPromiseArray = [];
	var participantId = $stateParams.participantId;

	var handleErrorCallback = function (errorResponse) {
		vm.errorMessage = _.get(errorResponse, 'data.message');
		vm.status = 'error';
	};
	var handleSuccessCallback = function () {
		vm.status = 'success';
	};

	var retrieveApplications = function (queryParams) {
		return participantService.getParticipantApplications(queryParams, participantId).then(function (response) {
			vm.applicationResultSet = _.concat(vm.applicationResultSet, response.applications);
			vm.total = _.get(response, 'pagination.total');
		}, handleErrorCallback);
	};

	var filterContent = function () {
		vm.queryParams.index = 1;
		vm.applicationResultSet = [];
		vm.status = 'loading';
		retrieveApplications(vm.queryParams).then(handleSuccessCallback);
	};

	var loadMoreApps = function () {
		vm.queryParams.index += 1;
		vm.loadMoreAppsStatus = 'loading';
		retrieveApplications(vm.queryParams).then(function () {
			vm.loadMoreAppsStatus = 'success';
		}, function () {
			vm.loadMoreAppsStatus = 'error';
		});
	};

	var exportAppsToCsv = function () {
		vm.status = 'loading';
		applicationService.exportAppsToCsv(vm.queryParams).then(function (response) {
			fileContentService.downloadDocument(response, 'applications');
			handleSuccessCallback();
		}, handleErrorCallback);
	};

	var backToSearchResults = function () {
		$state.go(constants.routes.clientAdmin);
	};


	var getBenefitPeriodFilterOptions = function () {
		return participantService.getBenefitPeriodFilterOptions(_.pick(vm.queryParams, 'teamMemberType'), participantId).then(function (response) {
			var benefitPeriods = _.orderBy(response.plain(), function (option) {
				if (option.value !== '-1') {
					return option.value;
				}
			}, ['desc']);
			_.set(vm, 'filters.options.benefitPeriod', benefitPeriods);
		});
	};

	var attachBenefitPeriodFilterWatcher = function () {
		$scope.$watch(angular.bind(vm, function () {
			return _.get(vm, 'queryParams.teamMemberType');
		}), function (oldValue, newValue) {
			if (oldValue !== newValue) {
				getBenefitPeriodFilterOptions();
			}
		}, true);
	};

	var parseBenefitPeriodSelection = function () {
		var values = _.map(vm.selectedBenefitPeriods, 'value');
		vm.queryParams.benefitPeriod = _.join(values, ',');
		filterContent();
	};

	var benefitPeriodSmartButtonConverter = function (itemText) {
		if (vm.selectedBenefitPeriods && vm.selectedBenefitPeriods.length > 1) {
			return vm.selectedBenefitPeriods.length +  ' selected';
		}
		return itemText;
	};

	var init = function () {
		vm.status = 'loading';

		// retrieve apps with the default filters/sort options
		var applicationListPromise = retrieveApplications(vm.queryParams);

		// retrieve filter options
		var teamFilterPromise = participantService.getTeamFilterOptions(participantId).then(function (response) {
			_.set(vm, 'filters.options.teamMemberType', response);
		});

		var benefitPeriodFilterPromise = getBenefitPeriodFilterOptions();
		attachBenefitPeriodFilterWatcher();

		var sortOptionsPromise = participantService.getApplicationSortOptions(participantId).then(function (response) {
			_.set(vm, 'filters.options.sortBy', response);
		});

		loadingPromiseArray.push(applicationListPromise, teamFilterPromise, benefitPeriodFilterPromise, sortOptionsPromise);

		$q.all(loadingPromiseArray).then(function () {
			handleSuccessCallback();
		}, handleErrorCallback);
	};

	vm.applicationResultSet = [];
	vm.queryParams = {
		index: 1,
		recordsPerPage: 10,
		benefitPeriod: '-1',
		teamMemberType: 'me',
		sortBy: 'applicationNumber DESC'
	};
	vm.fromClientAdmin = $stateParams.fromClientAdmin;
	vm.selectedBenefitPeriods = [{ display: 'All', value: '-1' }];
	vm.multiselectSettings = { showCheckAll: false, showUncheckAll: false, buttonClasses: 'btn-dropdown multiselect-btn', displayProp: 'display', idProp: 'value', externalIdProp: 'value', smartButtonMaxItems: 1, smartButtonTextConverter: benefitPeriodSmartButtonConverter };
	vm.benefitPeriodEvents = { onClose: parseBenefitPeriodSelection };
	vm.filterContent = filterContent;
	vm.loadMoreApps = loadMoreApps;
	vm.exportAppsToCsv = exportAppsToCsv;
	vm.backToSearchResults = backToSearchResults;

	init();
}]);