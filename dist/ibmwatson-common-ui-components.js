'use strict';
angular.module("ibmwatson-common-ui-components", ["ibmwatson-common-ui-components.templates", "ibmwatson-common-ui-components.watsonAlerts","ibmwatson-common-ui-components.watsonFooter","ibmwatson-common-ui-components.watsonLoading"]);
angular.module("ibmwatson-common-ui-components.templates", ["watsonAlerts/watsonAlerts.html","watsonFooter/watsonFooter.html","watsonLoading/watsonLoading.html"]);
// Source: src/watsonAlerts/watsonAlerts.directive.js
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
// Source: src/watsonFooter/watsonFooter.js
angular.module('ibmwatson-common-ui-components.watsonFooter', [])
  .directive('watsonFooter', function() {
    return {
      templateUrl: 'watsonFooter/watsonFooter.html',
      restrict: 'EA',
      replace: true
    };
  });
// Source: src/watsonLoading/watsonLoading.js
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
// Source: src/watsonAlerts/watsonAlerts.html.js
angular.module('watsonAlerts/watsonAlerts.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonAlerts/watsonAlerts.html',
    '<div class="ibm-alert-bar"\n' +
    '	><div ng-repeat="alert in alerts" class="alert alert-{{alert.level}} alert-dismissible ibm-alert ibm-alert--{{alert.level}}" role="alert"\n' +
    '		><button ng-show="alert.dismissable" ng-click="alert.dismiss()" type="button" class="close ibm-alert__close" data-dismiss="alert" aria-label="Close"\n' +
    '			><span class="ibm-icon--close-cancel-error" aria-hidden="true"></span\n' +
    '			></button\n' +
    '		><span ng-show="alert.title"><strong>{{alert.title}}</strong> </span>{{alert.text}}<span ng-show="alert.link"> <a href="{{alert.link}}">{{alert.linkText || \'Learn more\'}}</a></span\n' +
    '	></div>\n' +
    '</div>');
}]);

// Source: src/watsonFooter/watsonFooter.html.js
angular.module('watsonFooter/watsonFooter.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonFooter/watsonFooter.html',
    '<footer class="footer ibm-footer">\n' +
    '    <ul class="list-inline ibm-list-inline">\n' +
    '        <li>&#169; 2015 International Business Machines</li>\n' +
    '    </ul>\n' +
    '</footer>\n' +
    '');
}]);

// Source: src/watsonLoading/watsonLoading.html.js
angular.module('watsonLoading/watsonLoading.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonLoading/watsonLoading.html',
    '<div class="ibm-loading">\n' +
    '    <div class="ibm-loading-img"></div>\n' +
    '    <p class="ibm-loading-message" ng-if="loadingMessage">{{ loadingMessage }}</p>\n' +
    '</div>\n' +
    '');
}]);
