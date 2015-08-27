'use strict';

angular.module('ibmwatson-common-ui-components.watsonAlerts')
  .directive('watsonAlertsBar', function() {
    return {
      templateUrl: 'watsonAlerts/watsonAlertsBar.html',
      scope: {
        alerts: '=alerts'
      },
      restrict: 'E',
      replace: true
    };
  });