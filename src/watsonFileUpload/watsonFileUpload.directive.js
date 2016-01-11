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

angular.module('ibmwatson-common-ui-components.watsonFileUpload', [])
  .directive('watsonFileUpload', function fileUpload () {
    var uniqueId = 0;
    return {
      templateUrl : 'watsonFileUpload/watsonFileUpload.html',
      restrict : 'E',
      replace : true,
      scope : {
        large : '=?',
        file : '=',
        format : '=?'
      },
      controller : function ($scope) {
        this.getFormat = function () {
          return $scope.format;
        };

        this.setFile = function (file) {
          $scope.file = file;
        };
      },
      link : function (scope, element) {
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
  .directive('fileread', function fileRead () {
    return {
      restrict : 'A',
      require : '^watsonFileUpload',
      link : function (scope, element, attr, watsonFileUploadController) {

        var FORMAT = {
          TEXT : 'text',
          BINARY : 'binary',
          URL : 'url'
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
  .directive('dragDrop', function () {
    return {
      restrict : 'A',
      require : '^watsonFileUpload',
      link : function (scope, element, attr, watsonFileUploadController) {
        element.bind('dragover', function (dragOverEvent) {
          scope.$apply(function () {
            dragOverEvent.stopPropagation();
            dragOverEvent.preventDefault();
            dragOverEvent.dataTransfer.dropEffect = 'copy';
          });
        });

        element.bind('drop', function (dropEvent) {
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
