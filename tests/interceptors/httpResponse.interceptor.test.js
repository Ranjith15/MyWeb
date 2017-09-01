describe('when', function () {
	
	var httpResponseInterceptor;
	var $q;
	var $location;
	var $sessionStorage;
	var $window;
	var constants;
	

	beforeEach(module('edAssistApp'));

	beforeEach(inject(function (_httpResponseInterceptor_, _$q_, _$location_, _$sessionStorage_, _$window_, _constants_) {
			httpResponseInterceptor = _httpResponseInterceptor_;
			$q = _$q_;
			$location = _$location_;
			$sessionStorage = _$sessionStorage_;
			$window = _$window_;
			constants = _constants_;

			spyOn($q, 'reject');
		}));

	describe('responseError.status === 401', function () {
		beforeEach(function () {
				var response = { status: 401 };
				$sessionStorage.SomeStorageData = 'storagedata';
				httpResponseInterceptor.responseError(response);
			});

		it('should take user to login page', function () {
			expect($location.$$path).toBe('/' + constants.routes.login);
		});

		it('should clear session', function () {
			expect($sessionStorage.session).toBe(undefined);
		});
	});
	describe('responseError.status !== 401', function () {
		beforeEach(function () {
				var response = { status: null };
				httpResponseInterceptor.responseError(response);
			});

		it('should not take user to login page', function () {
			expect($location.$$path).not.toBe('/' + constants.routes.login);
		});
	});
});
