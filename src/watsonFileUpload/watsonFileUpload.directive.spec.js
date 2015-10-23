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

describe('Directive: watsonFileUpload', function() {
    var $compile,
        $rootScope,
        options,
        event,
        file1,
        file2;


    // Load the myApp module, which contains the directive
    beforeEach(module('ibmwatson-common-ui-components'));

    beforeEach(module('watsonFileUpload/watsonFileUpload.html'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        options = {
            large: 'true',
            format: 'url'
        };

        file1 = {
            name: 'myFile.txt',
            size: 32,
            type: 'txt'
        };

        file2 = {
            name: 'myFile.txt',
            size: 32,
            type: 'txt'
        };

        event = {
            target: {
                files: [
                   file1, file2
                ]
            }
        };



    }));

    it('should replace the element with the appropriate content', function() {

        var scope = $rootScope.$new();

        // Compile a piece of HTML containing the directive
        var element = $compile('<watson-file-upload file="file"></watson-file-upload>')(scope);

        scope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.hasClass('ibm-form__group')).toBe(true);

    });

    it('should reflects changes to the scope', function() {

        var scope = $rootScope.$new();

        scope.file = '';

        scope.options = options;

        // Compile a piece of HTML containing the directive
        var element = $compile('<div><watson-file-upload large="true" file="scope.file" format="options.format" ></watson-file-upload></div>')(scope);

        scope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('ibm-file-upload__overlay--large');

        element = $compile('<div><watson-file-upload file="scope.file" format="options.format" ></watson-file-upload></div>')(scope);
        scope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).not.toContain('ibm-file-upload__overlay--large');
    });
});


