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
