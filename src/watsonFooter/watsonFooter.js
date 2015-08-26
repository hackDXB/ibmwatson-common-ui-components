'use strict';

angular.module('ibmwatson-common-ui-components.watsonFooter', [])
  .directive('watsonFooter', function() {
    return {
      templateUrl: 'watsonFooter/watsonFooter.html',
      restrict: 'EA',
      replace: true
    };
  });