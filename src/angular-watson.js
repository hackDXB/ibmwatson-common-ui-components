'use strict';

angular.module('ibmwatson-common-ui-components',[])

    .directive('watsonFooter', function() {
        return {
            templateUrl: 'bower_components/ibmwatson-common-ui-components/src/watsonFooter/watsonFooter.html',
            restrict: 'EA',
            replace: true
        };
    })

    .directive('watsonLoading', function() {
        return {
            templateUrl: 'bower_components/ibmwatson-common-ui-components/src/watsonLoading/watsonLoading.html',
            restrict: 'EA',
            replace: true,
            scope : {
                loadingMessage : '=',
            }
        };
    });
