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

angular.module('ibmwatson-common-ui-components.watsonModal', [])
  .directive('watsonModal', function modal () {
    var uniqueId = 0;
    return {
      templateUrl : 'watsonModal/watsonModal.html',
      restrict : 'E',
      replace : true,
      transclude : true,
      scope : {
        type : '=?',
        title : '=',
        modalId : '=',
        okTitle : '=',
        cancelTitle : '=?',
        action : '&',
        disableOkExpression : '=?',
        hideOkExpression: '=?'
      },
      link : function (scope, element) {
        scope.uniqueId = 'watsonModal' + uniqueId++;

        var TYPE = {
          SUCCESS : 'success',
          ERROR : 'error',
          DEFAULT : 'default',
          WARNING : 'warning'
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

        okButton.on('click', function () {
          $(element).modal('hide');
          scope.action();
        });
      }
    };
  });
