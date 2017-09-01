'use strict';

angular.module('edAssistApp').config(function ($httpProvider) {
	$httpProvider.interceptors.push('httpResponseInterceptor');
});