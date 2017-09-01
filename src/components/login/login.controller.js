'use strict';

angular.module('edAssistApp').controller('loginController', 
	['$rootScope', '$scope', '$location', '$state', '$http', '$window', '$stateParams', '$localStorage', 'constants', 'contentConstants', 'sessionService', 'generalContentService', 'participantService', 'storageService', 'clientService', 
	function ($rootScope, $scope, $location, $state, $http, $window, $stateParams, $localStorage, constants, contentConstants, sessionService, generalContentService, participantService, storageService, clientService) {

	var vm = this;
	var clientName = clientService.getClientName();
	var redirect_uri = clientService.getSsoRedirectUrl();

	vm.nonSsoOverride = $stateParams.nonSsoOverride;

	generalContentService.getLoginContent(clientName).then(function (response) {
		clientService.saveClientDetails(response);
		vm.data = response;
		vm.loginInstructions = _.result(_.find(vm.data.generalContentList, {'name' : 'loginInstruction'}), 'data');
		vm.logoFile_Path = storageService.get('client.clientLogo');
		vm.ssoEnabled = response.clientLoginDetails.ssoEnabled;
		vm.logoPath = storageService.get('client.clientLogoPath');
		$scope.logoPromise.resolve('resolved');
		$rootScope.bodyClass = 'login-container';

		$scope.$on('$destroy', function(){
			delete $rootScope.bodyClass;
		});

		// Client-configurable check to Remember-me
		vm.clientRememberMe = response.clientLoginDetails.rememberMe;
		if (vm.clientRememberMe) {
			var rememberMe = _.get($localStorage, 'userPrefs.rememberMe');
			if (rememberMe) {
				$scope.rememberMe = rememberMe;
				$scope.formData = {name: _.get($localStorage, 'userPrefs.userName')};
			}
		}
		if (vm.ssoEnabled && !vm.nonSsoOverride) {
			var url = response.clientLoginDetails.mobileSSORedirectURL;
			url += encodeURIComponent(redirect_uri);
			$window.location.href = url;
		} else {
			_.each(response.generalContentList, function (content) {
				if (content.name === contentConstants.name.username) {
					vm.contentLoginName = content.data;
				}
				if (content.name === contentConstants.name.password) {
					vm.contentLoginPwd = content.data;
				}
			});
		}
		$scope.location = $location;
	}, function (errorResponse) {
		vm.status = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	});

	$scope.submitLogin = function () {
		this.formData.clientId = storageService.get('client.clientLoginDetails.clientId');
		vm.status = 'submitting';
		
		var userName = this.formData.name;
		var rememberMe = this.rememberMe;
		
		sessionService.api.one().post('login', this.formData).then(function (response) {
			storageService.set('session.tokens', response.tokens);
			storageService.set('user.userDetails', response.userDetails);
			if (vm.clientRememberMe) {
				if (rememberMe) {
					_.set($localStorage, 'userPrefs.userName', userName);
					_.set($localStorage, 'userPrefs.rememberMe', rememberMe);
				} else {
					_.unset($localStorage, 'userPrefs.userName');
					_.unset($localStorage, 'userPrefs.rememberMe');
				}
			}
			storageService.set('session.nonSsoOverride', vm.nonSsoOverride);
			if (clientName === 'admin') {
				$state.go(constants.routes.admin);
			} else {
				$state.go(constants.routes.home);				
				// start making the participant eligibility check asyc, as soon as the user logs in.
				participantService.getParticipantEligibility(response.userDetails.participantId);
			}
		}, function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
		});
	};
}]);