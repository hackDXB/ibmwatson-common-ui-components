'use strict';

angular.module('ibmwatson-common-ui-loading',[])
    .directive('watsonLoading', function() {
        return {
            templateUrl: 'bower_components/ibmwatson-common-ui-loading/src/watsonLoading.html',
            restrict: 'EA',
            replace: true,
            scope : {
                loadingMessage : '=',
            }
        };
    });
