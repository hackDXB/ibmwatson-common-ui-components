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
                action: '&'
            },
            controller: function(){
                this.SUCCESS = 'success';
                this.ERROR = 'error';
                this.DEFAULT = 'default';
                this.WARNING = 'warning';
            },
            link: function(scope, element, attr, controller) {
                var item = 'watsonModal' + uniqueId++;
                element.find('h3').attr('id' , item);
                element.attr('aria-labelledby', item);

                switch (scope.type) {
                    case controller.SUCCESS:
                        scope.modalType = 'ibm-modal--success';
                        break;
                    case controller.ERROR:
                        scope.modalType = 'ibm-modal--error';
                        break;
                    case controller.DEFAULT:
                        scope.modalType = 'ibm-modal--default';
                        break;
                    case controller.WARNING:
                        scope.modalType = 'ibm-modal--warning';
                        break;
                    default:
                        scope.modalType = 'ibm-modal--default';
                        break;
                }

                scope.okAction = function() {
                    $(element).modal('hide');
                    scope.action();
                };


            }
        };
    });

