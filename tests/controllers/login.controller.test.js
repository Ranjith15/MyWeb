describe('login', function () {

	beforeEach(module('edAssistApp'));

	var $controller;
	var $httpBackend;
	var $location;
	var $scope = { formData : {} };
	var storageService;
	var constants;
	var userService;
	var participantService;	
	var mockLoginResponse = {
		tokens: ['fakeToken'],
		userDetails : {'name' : 'tester'}
	};
	var mockErrorResp = { message : 'Error' };
	var vm;
	var urlLoginRegex = /[\s\S]*\/content\/login\/[\s\S]*/g;

	beforeEach(inject(function(_$controller_, _$httpBackend_, _$location_, _storageService_, _constants_, _userService_, _participantService_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		$location = _$location_;
		storageService = _storageService_;
		constants = _constants_;
		userService = _userService_;
		participantService = _participantService_;
		var spy = spyOn(participantService,'getParticipantEligibility').and.returnValue(200);
	}));

	beforeEach(function(){
		vm = $controller('loginController', { $scope: $scope });
		$httpBackend.whenPOST(constants.urls.restBase + '/sessions/login').respond(200, mockLoginResponse);
			$httpBackend.whenGET(urlLoginRegex).respond(500, mockErrorResp);
			$httpBackend.whenGET(constants.urls.restBase + '/participants/participantEligibilityCheck').respond(200);
			$httpBackend.whenGET(urlLoginRegex).respond(500, mockErrorResp);
	});

	// makes sure all expected requests are made by the time the test ends
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('successful login service calls', function(){

		it('should disable the submit button when invalid', function () {
			$scope.submitLogin();
			expect(vm.status).toEqual('submitting');
			$httpBackend.flush();
		});

		it('should save response tokens after response', function(){			
			var spy = spyOn(storageService,'set');
			$scope.submitLogin();
			$httpBackend.flush();
			expect(spy).toHaveBeenCalledWith('session.tokens', mockLoginResponse.tokens);
		});

		it('should save user details after response', function(){

			var spy = spyOn(userService,'setUserDetails');
			$scope.submitLogin();
			$httpBackend.flush();
			expect(spy).toHaveBeenCalledWith(mockLoginResponse.userDetails);
		});

		it('should redirect to home page after response', function(){
			var spy = spyOn($location,'path');
			$scope.submitLogin();
			$httpBackend.flush();
			expect(spy).toHaveBeenCalledWith(constants.routes.home);
		});
	});

	describe('unsuccessful login service calls', function(){

		it('should change controller status to error', function(){
			$scope.submitLogin();
			expect(vm.status).toBe('submitting');
			$httpBackend.flush();
			expect(vm.status).toBe('error');
		});

		it('should retrieve error response message', function(){
			$scope.submitLogin();
			$httpBackend.flush();
			expect(vm.message).toBe(mockErrorResp.message);
		});
	});

});
