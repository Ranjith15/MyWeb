'use strict';

angular.module('edAssistApp').controller('ssoLoginController', 
	['$scope', '$location', '$state', '$http', '$stateParams', '$localStorage', 'constants', 'sessionService', 'participantService', 'storageService', 'clientService', 'generalContentService',
	function ($scope, $location, $state, $http, $stateParams, $localStorage, constants, sessionService, participantService, storageService, clientService, generalContentService) {

	var vm = this;
	var clientName = clientService.getClientName();
	var code = $stateParams.code;

	if (!_.isEmpty(code)) {
		var postData = 'grant_type=authorization_code&code=' + code + '&client_id=edassistMobileApp&redirect_uri=' + clientService.getSsoRedirectUrl();
		var requestPath = constants.urls.ssoEndpoint;
		//TODO: This will be moved to Restangular in future
		$http({
			url: requestPath,
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: postData
		}).success(function (data, status, headers, config) {
			var tokenData = {'accessToken' : data.access_token, 'refreshToken' : data.refresh_token, 'idToken': data.id_token, 'tokenType': data.token_type, 'expiresIn' : data.expires_in, 'mobileClientCode': clientName};
			var clientDetailsPromise = generalContentService.getLoginContent(clientName);
			sessionService.api.one().post('swapSSOToken', tokenData).then(function (response) {
				storageService.set('session.tokens', response.tokens);
				storageService.set('user.userDetails', response.userDetails);
				clientDetailsPromise.then(function (clientDetails) {
					clientService.saveClientDetails(clientDetails);
					$scope.logoPromise.resolve('resolved');
					$state.go(constants.routes.home);
				});
				participantService.getParticipantEligibility(response.userDetails.participantId);
			}, function (errorResponse) {
				vm.status = 'error';
				vm.message = _.get(errorResponse, 'data.message');
				$state.go(constants.routes.generalSsoError);
			});
		}).error(function (errorResponse) {
			vm.status = 'error';
			vm.message = _.get(errorResponse, 'data.message');
			$state.go(constants.routes.generalSsoError);
		});
	} else {
		$state.go(constants.routes.generalSsoError);
	}
}]);