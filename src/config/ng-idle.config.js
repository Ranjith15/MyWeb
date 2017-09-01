'use strict';

angular.module('edAssistApp').config(['IdleProvider', 'KeepaliveProvider', function (IdleProvider, KeepaliveProvider) {
	// configure Idle settings
	// intervals are in seconds
	IdleProvider.idle(60 * 25);//1200
	IdleProvider.timeout(60 * 5);//300
	KeepaliveProvider.interval(60 * 15);//900
}])
.run(function (Idle) {
	// start watching when the app runs. also starts the Keepalive service by default.
	Idle.watch();
});