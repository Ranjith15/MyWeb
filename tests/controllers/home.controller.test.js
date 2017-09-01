describe('home',function(){

	beforeEach(module('edAssistApp'));

	var $controller;
	var $httpBackend;
	var $scope;
	var constants;
	var contentService;
	var urlDocSearchRegex;
	var vm;
	var mockDocResp = [{'title' : 'test_doc'}];
	var mockErrorResp = {message : 'Error'};

	beforeEach(inject(function(_$controller_, _constants_, _contentService_){
		$controller = _$controller_;
		constants = _constants_;
		contentService = _contentService_;
		urlDocSearchRegex = /[\s\S]*\/content\/search\/Documents\/MyProgResources\?/g;
	}));

	// makes sure all expected requests are made by the time the test ends
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('successful call to retreive documents', function(){
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(urlDocSearchRegex).respond(200, mockDocResp);
			vm = $controller('homeController', {$scope : $scope});
		}));

		it('should change controller status to success', function(){
			$httpBackend.flush();
			expect(vm.status).toBe('success');
		});

		it('should populate controller documents with response docs', function(){
			$httpBackend.flush();
			expect(vm.policyDocuments.plain()[0].title).toEqual(mockDocResp[0].title);
		});

	});

	describe('unsuccessful call to retrieve documents', function(){
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(urlDocSearchRegex).respond(500, mockErrorResp);
			$scope = {};
			vm = $controller('homeController', {$scope : $scope});
		}));

		it('should change controller status to error', function(){
			$httpBackend.flush();
			expect(vm.status).toBe('error');
		});

		it('should retrieve error response message', function(){
			$httpBackend.flush();
			expect(vm.message).toBe(mockErrorResp.message);
		});
	});
});
