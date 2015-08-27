'use strict';

angular.module('ibmwatson-common-ui-components.watsonAlerts')
  .controller('WatsonAlertsCtrl', ['$scope', 'watsonAlerts',
        function($scope, watsonAlerts) {
            // if the user has not overwritten the array using the alerts attribute, default to using the service
            if (!$scope.alerts) {
              $scope.alerts = watsonAlerts.alerts;
            }
        }
    ])
  .directive('watsonAlertsBar', function() {
    return {
      templateUrl: 'watsonAlerts/watsonAlertsBar.html',
      controller: 'WatsonAlertsCtrl',
      scope: {
        alerts: '=alerts'
      },
      restrict: 'E',
      replace: true
    };
  });
