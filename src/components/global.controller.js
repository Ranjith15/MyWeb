/* globals grunticon */

'use strict';
angular.module('edAssistApp').controller('globalController', ['$q', '$rootScope', '$scope', '$state', '$window', '$location', 'sessionService', 'storageService', 'clientService', 'utilService', 'constants', function ($q, $rootScope, $scope, $state, $window, $location, sessionService, storageService, clientService, utilService, constants) {

	var vm = this;
	vm.constants = constants;
	vm.isLoggedIn = sessionService.isLoggedIn();
	vm.clientName = clientService.getClientName();
	vm.faxView = false;
	vm.showContent = true;
	vm.timezoneOffset = moment(new Date()).tz(constants.timezone).format('Z');

	var intializeLogoPromise = function () {
		$scope.logoPromise = $q.defer();
		if (storageService.get('client.clientLogoPath') || storageService.get('client.clientLoginDetails.selfScheduledAdvising')) {
			$scope.logoPromise.resolve();
		}
		$scope.logoPromise.promise.then(function () {
			vm.logoPath = storageService.get('client.clientLogoPath');
			vm.isAdvisingEnabled = storageService.get('client.clientLoginDetails.selfScheduledAdvising');
		});
	};

	var attachRootScopeEvents = function () {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
			//cleans session state based on the route you are going to. This will make sure not session values are floating around the application.
			storageService.clean(toState.name);

			vm.isLoggedIn = sessionService.isLoggedIn();

			if (toState.data) {
				if (toState.data.hideForResolve) {
					vm.showContent = false;
				}
			}

			if (!vm.isLoggedIn && !toState.unauthState) {
				event.preventDefault();
				$state.go(constants.routes.login);
			} else if (storageService.get('user.userDetails.resetPassword') === 1 && toState.name !== constants.routes.changePassword && (!storageService.get('client.clientLoginDetails').ssoEnabled || storageService.get('session').nonSsoOverride)) {
				event.preventDefault();
				$state.go(constants.routes.changePassword, {userId : storageService.get('user.userDetails.userId')});
			} else if (vm.isLoggedIn && !toState.unauthState && toState.data) {
				if (toState.data.authorization) {
					var userType = utilService.getUserType();

					if (toState.data.authorization.permissions.indexOf(userType) === -1) {
						var redirectState = toState.data.authorization.redirectState || constants.routes.home;

						event.preventDefault();
						$state.go(redirectState);
					}
				}
			}
		});

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$window.ga('send', 'pageview', $location.path());
			// Make sure grunt icons are properly loaded on route changes.
			grunticon(['dist/assets/icons/icons.data.svg.css', 'dist/assets/icons/icons.data.png.css', 'dist/assets/icons/icons.fallback.css'], grunticon.svgLoadedCallback);
			vm.setActiveNav(_.get(toState, 'name'));
			//Dynamically pull in page page titles for each page state - ADA Compliance.
			vm.pageTitle = toState.data.pageTitle + ' - EdAssist';

			if (toState.data) {
				if (toState.data.hideForResolve) {
					vm.showContent = true;
				}
			}
		});

		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			event.preventDefault();
			switch (_.get(error, 'reason')) {
				case 'participantEligibilityDenied':
					vm.deniedRulesMessages = error.rules;
					vm.deniedRulesModalState = 'show';
					break;
				default:
					$state.go(constants.routes.generalError);
			}

			if (toState.data) {
				if (toState.data.hideForResolve) {
					vm.showContent = true;
				}
			}
		});

		$rootScope.$on('$viewContentLoaded', function(){
			//sets focus on page reload needed for ADA skip links
			document.getElementById('skip-main-container').focus();
		});

		// User has been idle for the configured idle time threshold
		$scope.$on('IdleStart', function () {
			if (sessionService.isLoggedIn()) {
				vm.idleModalState = 'show';
				$scope.$apply();
			}
		});

		// Fired after IdleStart, gives countdown of timeout value remaining
		$scope.$on('IdleWarn', function (e, countdown) {
			vm.idleModalData = {countdown: countdown};
			$scope.$apply();
		});

		// User has taken an action ie. a mouse move and cancelled the idle event.
		$scope.$on('IdleEnd', function () {
			vm.idleModalState = 'hide';
			$scope.$apply();
		});

		// User has not responded and idle timeout has elapsed.
		$scope.$on('IdleTimeout', function () {
			vm.idleModalState = 'hide';
			$scope.$apply();

			if (sessionService.isLoggedIn()) {
				sessionService.logOut();
			}
		});

		$scope.$on('Keepalive', function () {
			sessionService.keepSessionAlive();
		});

		$scope.$on('setFaxView', function(x, data) {
			vm.faxView = data.faxView;
		});
	};

	var setViewVariables = function () {
		vm.setElementFocus = function (elementId) {
			document.getElementById(elementId).focus();
		};

		vm.logOut = function () {
			if (sessionService.isLoggedIn()) {
				sessionService.logOut();
			}
			vm.closeMobileNav();
		};

		vm.setActiveNav = function (navName) {
			if ($state.includes(constants.routes.advising)) {
				vm.currentNav = constants.routes.advising;
			} else {
				vm.currentNav = navName;
			}
			vm.closeMobileNav();
		};

		vm.closeMobileNav = function () {
			var mobileNav = angular.element(document.querySelector('#edassist-navbar'));
			if (mobileNav.attr('aria-expanded') === 'true') {
				mobileNav.collapse('toggle');
			}
		};

		vm.getParticipantId = function () {
			return storageService.get('user.userDetails.participantId');
		};

		vm.isParticipant = function () {
			return utilService.isParticipant();
		};

		vm.isSupervisor = function () {
			return utilService.isSupervisor();
		};

		vm.isClientAdmin = function () {
			return utilService.isClientAdmin();
		};

		vm.isSuperAdmin = function () {
			return utilService.isSuperAdmin();
		};

		vm.isAdmin = function () {
			return utilService.isAdmin();
		};

		$scope.closeMenu = function (event) {
			if (event.keyCode === 27) {
				event.target.click();
			}
		};
	};

	var init = function () {
		intializeLogoPromise();

		// refresh the session every time the full page is loaded/reloaded
		sessionService.keepSessionAlive();

		if (storageService.get('client.clientLoginDetails.selfScheduledAdvising')) {
			vm.isAdvisingEnabled = storageService.get('client.clientLoginDetails.selfScheduledAdvising');
		}

		// initialize google analytics
		$window.ga('create', constants.vars.googleAnalytics, 'auto');

		attachRootScopeEvents();

		setViewVariables();
	};

	init();


}]);