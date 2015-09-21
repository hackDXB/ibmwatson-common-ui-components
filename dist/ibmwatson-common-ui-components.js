'use strict';
angular.module("ibmwatson-common-ui-components", ["ibmwatson-common-ui-components.templates", "ibmwatson-common-ui-components.watsonAlerts","ibmwatson-common-ui-components.watsonFooter","ibmwatson-common-ui-components.watsonLoading"]);
angular.module("ibmwatson-common-ui-components.templates", ["watsonAlerts/watsonAlertsBar.html","watsonFooter/watsonFooter.html","watsonLoading/watsonLoading.html"]);
// Source: src/watsonAlerts/watsonAlerts.js
/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

angular.module('ibmwatson-common-ui-components.watsonAlerts', []);

// Source: src/watsonAlerts/watsonAlerts.service.js
/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/**
 * Service to manage a list of alerts to display to the user.
 * Alerts are represented by an object with the following structure:
 * {
 *  id:'1234', // Optional: alert id or code
 *  level: 'info', // Optional: One of success, info, warning, error. Default 'info'
 *  title: 'Hello Stranger!', // Optional: A title for the alert message
 *  text : 'Please log in'  // Required: Text for the alert message
 *  link : 'hththt' // Optional: A link to put at the end of the message
 *  linkText: '' // Optional: Text to put on the link. If link is supplied, defaults to 'Learn more'
 * }
 */
angular.module('ibmwatson-common-ui-components.watsonAlerts')
  .factory('watsonAlerts', ['$log', function init ($log) {

    var LEVELS = [ 'success', 'info', 'warning', 'error' ];

    var alerts = [];

    /**
    * Add an alert to the list of alerts
    */
    function add( /*Object*/ alert) {
      $log.debug('add', alert, alerts);

      alert.level = alert.level || LEVELS[1];
      if (LEVELS.indexOf(alert.level) < 0) {
        alert.level = LEVELS[1];
      }

      // check the optional 'dismissable' attribute and set to default 'true'
      if (alert.dismissable === undefined) {
        alert.dismissable = true;
      }

      // Create a dismiss function to allow the alert to be removed
      alert.dismiss = function() {
        remove.apply(this, [alert]);
      };

      alerts.push(alert);

      return alert;
    }

    /**
    * Remove an alert from the list of alerts
    */
    function remove( /*Object*/ alert) {
      $log.debug(remove, alert);
      var index = alerts.indexOf(alert);
      if (index >= 0) {
        alerts.splice(index, 1);
      }
    }

    /**
    * Remove all current alerts
    */
    function clear() {
      alerts.splice(0, alerts.length);
    }

    // Public API here
    return {
      'alerts': alerts,
      'add': add,
      'remove': remove,
      'clear': clear
    };

  }]);

// Source: src/watsonAlerts/watsonAlertsBar.directive.js
/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

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
        alerts: '=?alerts'
      },
      restrict: 'E',
      replace: true
    };
  });

// Source: src/watsonFooter/watsonFooter.js
/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

angular.module('ibmwatson-common-ui-components.watsonFooter', [])
  .directive('watsonFooter', function() {
    return {
      templateUrl: 'watsonFooter/watsonFooter.html',
      restrict: 'EA',
      replace: true
    };
  });

// Source: src/watsonLoading/watsonLoading.js
/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

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

// Source: src/watsonAlerts/watsonAlertsBar.html.js
angular.module('watsonAlerts/watsonAlertsBar.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonAlerts/watsonAlertsBar.html',
    '<div class="ibm-alert-bar">\n' +
    '	<div ng-repeat="alert in alerts" class="alert alert-{{alert.level}} alert-dismissible ibm-alert ibm-alert--{{alert.level}}" role="alert">\n' +
    '		<button ng-show="alert.dismissable" ng-click="alert.dismiss()" type="button" class="close ibm-alert__close" data-dismiss="alert" aria-label="Close">\n' +
    '			<span class="ibm-icon--close-cancel-error" aria-hidden="true"></span>\n' +
    '		</button>\n' +
    '		<span ng-show="alert.title"><strong>{{alert.title}}</strong> </span>{{alert.text || \'Unknown Error Occurred\' }}<span ng-show="alert.link"> <a href="{{alert.link}}">{{alert.linkText || \'Learn more\'}}</a></span>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);

// Source: src/watsonFooter/watsonFooter.html.js
angular.module('watsonFooter/watsonFooter.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonFooter/watsonFooter.html',
    '<footer class="footer ibm-footer">\n' +
    '  <ul class="list-inline ibm-list-inline">\n' +
    '    <li>&#169; 2015 International Business Machines</li>\n' +
    '  </ul>\n' +
    '</footer>\n' +
    '');
}]);

// Source: src/watsonLoading/watsonLoading.html.js
angular.module('watsonLoading/watsonLoading.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonLoading/watsonLoading.html',
    '<div class="ibm-loading">\n' +
    '  <div class="ibm-loading-img"></div>\n' +
    '  <p class="ibm-loading-message" ng-if="loadingMessage">{{ loadingMessage }}</p>\n' +
    '</div>\n' +
    '');
}]);
