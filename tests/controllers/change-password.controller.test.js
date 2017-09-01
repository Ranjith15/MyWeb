describe('change-password controller',function(){

	beforeEach(module('edAssistApp'));

	var $controller;
	var userService;
	var constants;
	var $scope = {};
	var $httpBackend;
	var vm;
	var urlContentSearchRegex;
	var urlPasswordChangeRegex;
	var mockContentResp = [ {content: 'change password content'} ];
	var mockErrorResp = {message : 'Error'};
	var mockUserDetails = {	userId: 14845844 };

	beforeEach(inject(function(_$controller_, _constants_, _userService_){
		$controller = _$controller_;
		constants = _constants_;
		userService = _userService_;

		urlPasswordChangeRegex = /[\s\S]*\/users\/\d+\/[\s\S]*/g;
		urlContentSearchRegex = /[\s\S]*\/content\/search\/PageContent\/ChangePassword\?/g;

		userService.setUserDetails(mockUserDetails);		
		var spy = spyOn(userService,'getUserDetails').and.returnValue(mockUserDetails);
		vm = $controller('changePasswordController', {$scope : $scope, userService : userService});
	}));

	// makes sure all expected requests are made by the time the test ends
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('successful content service call', function(){
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(urlContentSearchRegex).respond(200, mockContentResp);			
		}));

		it('should change controller status to success', function(){
			expect(vm.status).not.toBeDefined();
			$httpBackend.flush();
			expect(vm.status).toBe('success');
		});

		it('should update changePasswordContent', function(){
			expect(vm.changePasswordContent).not.toBeDefined();
			$httpBackend.flush();
			expect(vm.changePasswordContent).toBeDefined();
		});
	});

	describe('unsuccessful content service call', function(){
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(urlContentSearchRegex).respond(500, mockErrorResp);			
		}));

		it('should change controller status to error', function(){
			expect(vm.status).not.toBeDefined();
			$httpBackend.flush();
			expect(vm.status).toBe('error');
		});

		it('should retrieve error response message', function(){
			$httpBackend.flush();
			expect(vm.message).toBe(mockErrorResp.message);
		});
	});

	describe('successful password change service call', function(){
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(urlContentSearchRegex).respond(200);
			$httpBackend.whenPOST(urlPasswordChangeRegex).respond(200);
			vm = $controller('changePasswordController', {$scope : $scope});
		}));

		it('should change controller status to success', function(){
			$scope.submitChangePasswordForm();
			expect(vm.status).toBe('submitting');
			$httpBackend.flush();
			expect(vm.status).toBe('success');
		});

	});

	describe('unsuccessful password change service call', function(){
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(urlContentSearchRegex).respond(200);
			$httpBackend.whenPOST(urlPasswordChangeRegex).respond(500, mockErrorResp);			
		}));

		it('should change controller status to error', function(){
			$scope.submitChangePasswordForm();
			expect(vm.status).toBe('submitting');
			$httpBackend.flush();
			expect(vm.status).toBe('error');
		});

		it('should retrieve error response message', function(){
			$scope.submitChangePasswordForm();
			$httpBackend.flush();
			expect(vm.message).toBe(mockErrorResp.message);
		});
	});

});
