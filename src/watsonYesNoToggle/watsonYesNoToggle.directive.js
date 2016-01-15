'use strict';
angular.module('ibmwatson-common-ui-components.watsonYesNoToggle', [])
  .directive('watsonYesNoToggle', function () {
    return {
      restrict : 'E',
      scope : {
        value : '='
      },
      templateUrl : 'watsonYesNoToggle/watsonYesNoToggle.html',
      link : function (scope) {
        // Default value
        scope.value = true;
        scope.toggle = function () {
          scope.value = !scope.value;
        };
      }
    };
  });