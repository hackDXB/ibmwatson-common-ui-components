'use strict';

angular.module('ibmwatson.common.ibmwatson-common-ui-components-test', [
    'ui.router',
    'ibmwatson-common-ui-components'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/test');
        $locationProvider.html5Mode(true);
    });
