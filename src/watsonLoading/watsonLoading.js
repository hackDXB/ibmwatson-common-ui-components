'use strict';

angular.module('ibmwatson-common-ui-components.watsonLoading', [])
  .directive('watsonLoading', function() {
    return {
      templateUrl: 'watsonLoading/watsonLoading.html',
      restrict: 'EA',
      replace: true,
      scope: {
        loadingMessage: '=',
      }
    };
  });