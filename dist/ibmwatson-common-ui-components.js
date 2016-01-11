'use strict';
angular.module("ibmwatson-common-ui-components", ["ibmwatson-common-ui-components.templates", "ibmwatson-common-ui-components.watsonAlerts","ibmwatson-common-ui-components.watsonAutoFitScreen","ibmwatson-common-ui-components.watsonClearableTextBox","ibmwatson-common-ui-components.watsonDropDown","ibmwatson-common-ui-components.watsonFileUpload","ibmwatson-common-ui-components.watsonFooter","ibmwatson-common-ui-components.watsonLoading","ibmwatson-common-ui-components.watsonModal","ibmwatson-common-ui-components.watsonSearch"]);
angular.module("ibmwatson-common-ui-components.templates", ["watsonAlerts/watsonAlertsBar.html","watsonClearableTextBox/watsonClearableTextBox.html","watsonDropDown/watsonDropDown.html","watsonFileUpload/watsonFileUpload.html","watsonFooter/watsonFooter.html","watsonLoading/watsonLoading.html","watsonModal/watsonModal.html","watsonSearch/watsonSearch.html"]);
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
  .factory('watsonAlerts', function init () {

    var LEVELS = [ 'success', 'info', 'warning', 'error' ];

    var alerts = [];

    /**
    * Add an alert to the list of alerts
    */
    function add( /*Object*/ alert) {
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

  });

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

// Source: src/watsonAutoFitScreen/watsonAutoFitScreen.js
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

/*
This directive will automatically configure the screen sizes such that the entire
body fits to the height of the screen. The 'content' height will be calculated as
the height of the screen minus the height of the header and footer.

There is also an optional 'min-height' attribute for the watson-afs-content
directive that overrides the minHeight of 480px

Example Use:
    <body watson-afs-body>
        <div watson-afs-header></div>
        <div watson-afs-content></div>
        <div watson-afs-footer></div>
    <body>
*/

angular.module('ibmwatson-common-ui-components.watsonAutoFitScreen', [])
  .directive('watsonAfsBody', function() {
    return {
      restrict: 'A',
      controller: function() {
        var heights = {
          header: 0,
          footer: 0
        };
        // components = ( 'header' || 'footer' )
        this.setHeight = function(component, height) {
          heights[component] = height;
        };
        this.getHeight = function(component) {
          return heights[component];
        };
      }
    };
  })
  .directive('watsonAfsHeader', function() {
    function link(scope, element, attrs, watsonAfsBody) {
      watsonAfsBody.setHeight('header', element.outerHeight());
    }
    return {
      restrict: 'A',
      require: '^watsonAfsBody',
      link: link
    };
  })
  .directive('watsonAfsContent', ['$window',
    function($window) {
      function link(scope, element, attrs, watsonAfsBody) {
        element[0].style.overflowY = 'scroll';

        var headerHeight = watsonAfsBody.getHeight('header');
        var footerHeight = watsonAfsBody.getHeight('footer');
        var windowHeight = $window.innerHeight;

        // setting a minimum screen height. do we really need this?
        var minHeight = (Number(attrs.minHeight) || 200) - (headerHeight + footerHeight);

        function sizeBody() {
          var h = windowHeight - (headerHeight + footerHeight);
          h = (h < minHeight ? minHeight : h);
          var hStr = h + 'px';
          element[0].style.height = hStr;
          element[0].style.maxHeight = hStr;
          // let interested parties know that resize has occurred
          scope.$broadcast('contentResized', h);
        }
        sizeBody();
        angular.element($window).bind('resize', function() {
          windowHeight = $window.innerHeight;
          sizeBody();
        });
      }
      return {
        restrict: 'A',
        require: '^watsonAfsBody',
        link: link
      };
    }
  ])
  .directive('watsonAfsFooter', function() {
    function link(scope, element, attrs, watsonAfsBody) {
      watsonAfsBody.setHeight('footer', element.outerHeight());
    }
    return {
      restrict: 'A',
      require: '^watsonAfsBody',
      link: link
    };
  });

// Source: src/watsonClearableTextBox/watsonClearableTextBox.js
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


angular.module('ibmwatson-common-ui-components.watsonClearableTextBox', [])
  .directive('watsonClearableTextBox', function() {
    return {
      restrict: 'E',
      template: 'watsonClearableTextBox/watsonClearableTextBox.html',
      require: 'ngModel',
      link: function(scope,element,attrs,ngModel){

        var formControlElement = element.find('input[type="text"]');

        var clearElement = element.find('button');

        // When the model changes, update the value of the textbox
        ngModel.$render = function(){
          formControlElement.val(ngModel.$viewValue);
        };

        // When the user updates the value in the box, update the model
        formControlElement.on('blue keyup change',function update(){
          var newValue = formControlElement.val();
          ngModel.$setViewValue(newValue);
        });

        // When the dom node for this directive gets focus
        // programmatically, send it to the input field
        element.focus(function onFocus(){
          formControlElement.focus();
        });

        // When the clear button is pressed, clear the text and value
        clearElement.on('click',function clear(){
          var newValue = '';

          formControlElement.val(newValue);

          ngModel.$setViewValue(newValue);

          // If a clear function has been specified
          // execute it
          if(attrs.watsonClear){
            scope.$eval(attrs.watsonClear);
          }

          // Finally, since our handler was initated outside of angular
          // update the scope
          scope.$apply();
        });

        // put list attribute onto input element
        if(attrs.list){
          formControlElement.attr('list',attrs.list);
        }
      },

      replace: true
    };
  });

// Source: src/watsonDropDown/watsonDropDown.directive.js
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

angular.module('ibmwatson-common-ui-components.watsonDropDown', [])
    .directive('watsonDropDown', function() {
        var uniqueId = 0;
        return {
            templateUrl: 'watsonDropDown/watsonDropDown.html',
            restrict: 'E',
            replace: true,
            scope: {
                menuItems: '=',
                title: '=?',
                myClass: '=?',
                dropDownIcon: '=?',
                action: '&?'
            },
            link: function(scope) {
                scope.uniqueId = 'watsonModal' + uniqueId++;
            }
        };
    });

// Source: src/watsonFileUpload/watsonFileUpload.directive.js
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

angular.module('ibmwatson-common-ui-components.watsonFileUpload', [])
    .directive('watsonFileUpload', function() {
        var uniqueId = 0;
        return {
            templateUrl: 'watsonFileUpload/watsonFileUpload.html',
            restrict: 'E',
            replace: true,
            scope: {
                large: '=?',
                file: '=',
                format: '=?'
            },
            controller: function($scope) {
                this.getFormat = function() {
                    return $scope.format;
                };

                this.setFile = function(file) {
                    $scope.file = file;
                };
            },
            link: function (scope, element) {
                scope.uniqueId = 'watsonModal' + uniqueId++;

                if (scope.large === true) {
                    scope.largeClass = 'ibm-file-upload__overlay--large';
                }

                scope.uploadFile = function () {
                    element.find('.ibm-file-upload__input').click();
                };
            }
        };
    })

    .directive('fileread', function () {
        return {
            restrict: 'A',
            require:'^watsonFileUpload',
            link: function (scope, element, attr, watsonFileUploadController) {

                var FORMAT = {
                    TEXT: 'text',
                    BINARY: 'binary',
                    URL: 'url'
                };

                element.bind('change', function (changeEvent) {
                    scope.$apply(function () {
                        var file = {};
                        file.details = changeEvent.target.files[0];

                        var reader = new FileReader();

                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                file.data = loadEvent.target.result;
                                watsonFileUploadController.setFile(file);
                            });
                        };

                        switch (watsonFileUploadController.getFormat()) {
                            case FORMAT.TEXT:
                                reader.readAsText(changeEvent.target.files[0]);
                                break;
                            case FORMAT.BINARY:
                                reader.readAsBinaryString(changeEvent.target.files[0]);
                                break;
                            case FORMAT.URL:
                                reader.readAsDataURL(changeEvent.target.files[0]);
                                break;
                            default:
                                reader.readAsText(changeEvent.target.files[0]);
                                break;
                        }
                    });
                });
            }
        };
    })

    .directive('dragDrop', function() {
        return {
            restrict: 'A',
            require:'^watsonFileUpload',
            link: function (scope, element, attr, watsonFileUploadController) {
                element.bind('dragover', function(dragOverEvent) {
                    scope.$apply(function () {
                        dragOverEvent.stopPropagation();
                        dragOverEvent.preventDefault();
                        dragOverEvent.dataTransfer.dropEffect = 'copy';
                    });
                });

                element.bind('drop', function(dropEvent) {
                    scope.$apply(function () {
                        dropEvent.stopPropagation();
                        dropEvent.preventDefault();

                        var file = {};
                        file.details = dropEvent.dataTransfer.files[0];

                        var reader = new FileReader();

                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                file.data = loadEvent.target.result;
                                watsonFileUploadController.setFile(file);
                            });
                        };

                        switch (watsonFileUploadController.getFormat()) {
                            case watsonFileUploadController.TEXT:
                                reader.readAsText(dropEvent.dataTransfer.files[0]);
                                break;
                            case watsonFileUploadController.BINARY:
                                reader.readAsBinaryString(dropEvent.dataTransfer.files[0]);
                                break;
                            case watsonFileUploadController.URL:
                                reader.readAsDataURL(dropEvent.dataTransfer.files[0]);
                                break;
                            default:
                                reader.readAsText(dropEvent.dataTransfer.files[0]);
                                break;
                        }
                    });
                });
            }
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
        loadingMessage: '='
      }
    };
  });

// Source: src/watsonModal/watsonModal.directive.js
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

angular.module('ibmwatson-common-ui-components.watsonModal', [])
    .directive('watsonModal', function() {
        var uniqueId = 0;
        return {
            templateUrl: 'watsonModal/watsonModal.html',
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                type: '=?',
                title: '=',
                modalId: '=',
                okTitle: '=',
                cancelTitle: '=?',
                action: '&',
                disableOkExpression: '=?'
            },
            link: function(scope, element) {
                scope.uniqueId = 'watsonModal' + uniqueId++;

                var TYPE = {
                    SUCCESS: 'success',
                    ERROR: 'error',
                    DEFAULT: 'default',
                    WARNING: 'warning'
                };

                switch (scope.type) {
                    case TYPE.SUCCESS:
                        scope.modalType = 'ibm-modal--success';
                        break;
                    case TYPE.ERROR:
                        scope.modalType = 'ibm-modal--error';
                        break;
                    case TYPE.DEFAULT:
                        scope.modalType = 'ibm-modal--default';
                        break;
                    case TYPE.WARNING:
                        scope.modalType = 'ibm-modal--warning';
                        break;
                    default:
                        scope.modalType = 'ibm-modal--default';
                        break;
                }

                var okButton = element.find('.okButton');

                okButton.on('click', function() {
                    $(element).modal('hide');
                    scope.action();
                });
            }
        };
    });


// Source: src/watsonSearch/watsonSearch.directive.js
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

angular.module('ibmwatson-common-ui-components.watsonSearch', [])
    .directive('watsonSearch', function() {
        return {
            templateUrl: 'watsonSearch/watsonSearch.html',
            restrict: 'E',
            replace: true,
            scope: {
                placeHolderText: '=?',
                action: '&',
                searchText: '='
            },
            link: function(scope, element) {
                element.bind('keydown keypress', function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.action();
                        });

                        event.preventDefault();
                    }
                });
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

// Source: src/watsonClearableTextBox/watsonClearableTextBox.html.js
angular.module('watsonClearableTextBox/watsonClearableTextBox.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonClearableTextBox/watsonClearableTextBox.html',
    '<div class="ibm-clearable-textbox" tabindex="-1">\n' +
    '  <input type="text">\n' +
    '  <button type="button" class="close ibm-alert__close" aria-label="Close" title="Close">\n' +
    '    <span class="ibm-icon--close-cancel-error" aria-hidden="true"></span>\n' +
    '  </button>\n' +
    '</div>\n' +
    '');
}]);

// Source: src/watsonDropDown/watsonDropDown.html.js
angular.module('watsonDropDown/watsonDropDown.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonDropDown/watsonDropDown.html',
    '<div class="dropdown ibm-dropdown">\n' +
    '    <button class="btn ibm-dropdown__button" ng-class="myClass" type="button" id="{{::uniqueId}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n' +
    '        <span ng-if="title">{{title}}</span>\n' +
    '        <span ng-if!="dropDownIcon" class="ibm-glyph--caret-down_24"></span>\n' +
    '        <span ng-if="dropDownIcon" ng-class="dropDownIcon"></span>\n' +
    '    </button>\n' +
    '    <ul class="dropdown-menu ibm-dropdown__menu ibm-dropdown__button--icon" ng-class="{\'ibm-dropdown__menu--icons\' : menuItems[0].icon}" aria-labelledby="{{::uniqueId}}">\n' +
    '        <li ng-repeat="menuItem in menuItems">\n' +
    '            <a ng-click="action()(menuItem)">\n' +
    '                <span ng-class="menuItem.icon"></span>\n' +
    '                {{menuItem.name}}\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</div>\n' +
    '');
}]);

// Source: src/watsonFileUpload/watsonFileUpload.html.js
angular.module('watsonFileUpload/watsonFileUpload.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonFileUpload/watsonFileUpload.html',
    '<div class="form-group ibm-form__group">\n' +
    '    <input class="form-control ibm-file-upload__input" type="file" fileread>\n' +
    '    <div class="ibm-file-upload__overlay--wrapper" ng-class="largeClass" ng-click="uploadFile()" drag-drop>\n' +
    '        <div class="ibm-file-upload__overlay">\n' +
    '            <span class="ibm-icon--upload-export" aria-hidden="true"></span>\n' +
    '            <span>Drag a file, or click to browse from your computer.</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
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

// Source: src/watsonModal/watsonModal.html.js
angular.module('watsonModal/watsonModal.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonModal/watsonModal.html',
    '<div class="modal fade" ng-class="modalType" tabindex="-1" role="dialog" aria-labelledby="{{::uniqueId}}">\n' +
    '    <div class="modal-dialog" role="document">\n' +
    '        <div class="modal-content ibm-modal-content">\n' +
    '            <div class="modal-header ibm-modal__header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="ibm-icon--close-cancel-error" aria-hidden="true"></span></button>\n' +
    '                <h3 class="modal-title" id="{{::uniqueId}}">{{title}}</h3>\n' +
    '            </div>\n' +
    '            <div class="modal-body ibm-modal__body">\n' +
    '               <div ng-transclude></div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer ibm-modal__footer">\n' +
    '                <button ng-if="cancelTitle" type="button" value="{{cancelTitle}}" class="btn ibm-btn ibm-btn--link" data-dismiss="modal">{{cancelTitle}}</button>\n' +
    '                <button type="button" value="{{okTitle}}" class="btn ibm-btn ibm-btn--primary okButton" ng-disabled="disableOkExpression">{{okTitle}}</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

// Source: src/watsonSearch/watsonSearch.html.js
angular.module('watsonSearch/watsonSearch.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('watsonSearch/watsonSearch.html',
    '<div class="form-group ibm-form__group">\n' +
    '    <input type="text" class="form-control ibm-form__search" ng-model="searchText" placeholder="{{placeHolderText}}" ng-focus="this.placeholder=\'\'" ng-blur="this.placeholder=\'{{placeHolderText}}\'">\n' +
    '</div>\n' +
    '');
}]);
