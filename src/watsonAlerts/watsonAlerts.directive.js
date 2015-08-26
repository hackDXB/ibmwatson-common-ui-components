'use strict';

angular.module('ibmwatson-common-ui-components.watsonAlerts',[])
  .directive('watsonAlerts', function() {
    return {
      templateUrl: 'watsonAlerts/watsonAlerts.html',
      scope:{
        alerts: '=alerts'
      },
      restrict: 'E',
      replace: true
    };
  });