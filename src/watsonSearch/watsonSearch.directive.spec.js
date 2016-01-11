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

describe('Directive: watsonSearch', function () {
  var $compile,
    $rootScope,
    searchData;

  // Load the myApp module, which contains the directive
  beforeEach(module('ibmwatson-common-ui-components'));

  beforeEach(module('watsonSearch/watsonSearch.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    searchData = {
      placeHolderText : 'Enter search phrase here'
    };
  }));

  it('should replace the element with the appropriate content', function () {

    var scope = $rootScope.$new();

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-search place-holder-text="searchData.placeHolderText" button-text="searchData.buttonText" action="mySearchAction()" button-icon="searchData.buttonIcon" search-text="searchData.searchText" button-class="searchData.buttonClass" text-class="searchData.textClass"></watson-search>')(scope);
    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.hasClass('form-group')).toBe(true);

  });

  it('should reflects changes to the scope', function () {

    var scope = $rootScope.$new();

    scope.searchData = searchData;

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-search place-holder-text="searchData.placeHolderText" button-text="searchData.buttonText" action="mySearchAction()" button-icon="searchData.buttonIcon" search-text="searchData.searchText" button-class="searchData.buttonClass" text-class="searchData.textClass"></watson-search>')(scope);

    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.html()).toContain(searchData.placeHolderText);
  });

});
