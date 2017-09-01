'use strict';

angular.module('edAssistApp').controller('footerDetailsController', ['$scope', '$sce', '$stateParams', 'generalContentService', 'storageService', 'contentConstants', function ($scope, $sce, $stateParams, generalContentService, storageService, contentConstants) {
	var vm = this;
	vm.detailsHeader = $stateParams.detailsHeader;
	vm.footerDetailsStatus = 'submitting';
	var clientId = storageService.get('client.clientLoginDetails.clientId');
	//TODO: add Program code 
	generalContentService.findByName(contentConstants.component.site, $stateParams.detailsName, clientId, contentConstants.program.clientDefault, false).then(function (response) {
		vm.footerDetailsStatus = 'success';
		if (!_.isEmpty(response)) {
			vm.detailsContent = $sce.trustAsHtml(_.result(_.find(response, {'name': $stateParams.detailsName}), 'data'));
		}
	}, function (errorResponse) {
		vm.footerDetailsStatus = 'error';
		vm.message = _.get(errorResponse, 'data.message');
	});		
}]);