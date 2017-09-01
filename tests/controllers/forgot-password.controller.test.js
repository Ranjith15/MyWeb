describe('home',function(){

	beforeEach(module('edAssistApp'));

	var $controller;
	var $httpBackend;
	var constants;
	var userService;
	var $scope = { formData: {} };
	var vm;
	var mockForgotPassResp = {message: 'forgot password content'};
	var mockErrorResp = {message : 'Error'};

	beforeEach(inject(function(_$controller_, _$httpBackend_, _constants_, _userService_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		constants = _constants_;
		userService = _userService_;
		vm = $controller('forgotPasswordController', {$scope : $scope});
	}));

	// makes sure all expected requests are made by the time the test ends
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('submit button success', function(){
		beforeEach(function(){
			$httpBackend.whenPOST(constants.urls.restBase + '/users/reset-password').respond(200, mockForgotPassResp);
		});

		it('changes controller status to submitting', function(){
			$scope.submitForgotPwd();
			expect(vm.status).toBe('submitting');
			$httpBackend.flush();
		});

		it('successful service call saves response message', function(){
			$scope.submitForgotPwd();
			$httpBackend.flush();
			expect(vm.message).toEqual(mockForgotPassResp.message);
		});

	});

	describe('submit button error', function(){
		beforeEach(function(){
			$httpBackend.whenPOST(constants.urls.restBase + '/users/reset-password').respond(500, mockErrorResp);
		});

		it('changes the controller status to error', function(){
			$scope.submitForgotPwd();
			expect(vm.status).toBe('submitting');
			$httpBackend.flush();
			expect(vm.status).toBe('error');
		});

		it('retrieves the status code and message from error response', function(){
			$scope.submitForgotPwd();
			$httpBackend.flush();
			expect(vm.statusCode).toBe(500);
			expect(vm.message).toEqual(mockErrorResp.message);
		});
	});



});
