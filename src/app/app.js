'use strict';

angular.module('ibmwatson.common.ibmwatson-common-ui-components-test', [
    'ui.router',
    'ibmwatson-common-ui-components'
])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/test');
        //$locationProvider.html5Mode(true);
    });
