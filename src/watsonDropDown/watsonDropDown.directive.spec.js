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

describe('Directive: watsonDropDown', function () {
  var $compile,
  $rootScope,
  dropDownData;


  // Load the myApp module, which contains the directive
  beforeEach(module('ibmwatson-common-ui-components'));

  beforeEach(module('watsonDropDown/watsonDropDown.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    dropDownData = {
      items : [
        {
          name : 'cake',
          icon : 'ibm-icon--relationship'
        },
        {
          name : 'biscuits',
          icon : 'ibm-icon--satellitedish'
        },
        {
          name : 'cheese'
        }
      ],
      title : 'food',
      myClass : 'ibm-btn--primary'
    };
  }));

  it('should replace the element with the appropriate content', function () {
    var scope = $rootScope.$new();

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-drop-down menu-items="dropDownData.items" title="title" my-class="myClass" action="myAction"></watson-drop-down>')(scope);

    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.hasClass('dropdown ibm-dropdown')).toBe(true);

  });

  it('should reflects changes to the scope', function () {
    var scope = $rootScope.$new();

    scope.dropDownData = dropDownData;

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-drop-down menu-items="dropDownData.items" title="dropDownData.title" my-class="dropDownData.myClass" action="myAction"></watson-drop-down>')(scope);

    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.html()).toContain(dropDownData.items[0].name);
    expect(element.html()).toContain(dropDownData.title);
  });

});
