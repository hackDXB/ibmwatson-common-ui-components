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

describe('Directive: watsonFooter', function () {
  var $compile,
    $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('ibmwatson-common-ui-components'));

  beforeEach(module('watsonFooter/watsonFooter.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should replace the element with the appropriate content', function () {

    var scope = $rootScope.$new();

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-footer></watson-footer>')(scope);
    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.hasClass('ibm-footer')).toBe(true);

  });

  it('should replace the element with the appropriate content using the default link texts set in template', function () {

    var scope = $rootScope.$new();

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-footer></watson-footer>')(scope);
    scope.$digest();

    // Check that the compiled element contains the default link text strings
    expect(element.html()).toContain('Contact');
    expect(element.html()).toContain('Privacy');
    expect(element.html()).toContain('Terms of use');

  });

  it('should replace the element with the appropriate content including translations overriding the default the link-texts', function () {

    var scope = $rootScope.$new();

    scope.footerTranslations = {contact : 'Kontakt', privacy : 'Privatsphäre', terms : 'Nutzungsbedingungen'};

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-footer translations="footerTranslations"></watson-footer>')(scope);
    scope.$digest();

    // Check that the compiled element contains the translated strings
    expect(element.html()).toContain(scope.footerTranslations.contact);
    expect(element.html()).toContain(scope.footerTranslations.privacy);
    expect(element.html()).toContain(scope.footerTranslations.terms);

  });

  it('should replace the element with the appropriate content including translations overriding some of the default the link-texts', function () {

    var scope = $rootScope.$new();

    scope.footerTranslations = {contact : 'Kontakt', terms : ''};

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-footer translations="footerTranslations"></watson-footer>')(scope);
    scope.$digest();

    // Check that the compiled element contains a mix of translated and default strings
    expect(element.html()).toContain(scope.footerTranslations.contact);
    expect(element.html()).toContain('Privacy');
    expect(element.html()).toContain('Terms of use');

  });

});