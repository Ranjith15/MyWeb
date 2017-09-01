describe('home',function(){

	beforeEach(module('edAssistApp'));

	var $controller;
	var $httpBackend;
	var constants;
	var urlDocSearchRegex;
	var $scope = {};
	var vm;
	var mockParticipantResp = { test : 'test'};
	var mockErrorResp = { message : 'Error'};

	beforeEach(inject(function(_$controller_, _$httpBackend_, _constants_){
		$controller = _$controller_;
		constants = _constants_;
		$httpBackend = _$httpBackend_;
		//userService = _userService_;
		//participantService = _participantService_;
		urlDocSearchRegex = /[\s\S]*\/content\/search\/Documents\/MyProgResources\?/g;
	}));

	// makes sure all expected requests are made by the time the test ends
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('successful participant service calls',function(){
		
		beforeEach(function(){
			$httpBackend.whenGET(constants.urls.restBase + '/participants').respond(200, mockParticipantResp);
			$scope = {
				submitProfileForm : function(){}
			};
			vm = $controller('profileController', {$scope : $scope});
		});

		it('should change controller status to detailsSuccess', function(){
			expect(vm.status).toBe('submitting');
			$httpBackend.flush();
			expect(vm.status).toBe('detailSuccess');
		});

		it('should updated controller profile data to response', function(){
			$httpBackend.flush();
			expect(vm.profileData.plain()).toEqual(mockParticipantResp);
		});

	});

	describe('unsuccessful participant service calls', function(){
		
		beforeEach(function(){
			$httpBackend.whenGET(constants.urls.restBase + '/participants').respond(500, mockErrorResp);
			$scope = {
				submitProfileForm : function(){}
			};
			vm = $controller('profileController', {$scope : $scope});
		});

		it('should update controller status to error', function(){
			$httpBackend.flush();
			expect(vm.status).toBe('error');
		});

		it('should retrieve error message from response', function(){
			$httpBackend.flush();
			expect(vm.message).toBe(mockErrorResp.message);
		});

	});

});
