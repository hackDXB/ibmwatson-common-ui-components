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

describe('Directive: watsonModal', function () {
    var $compile,
      $rootScope,
      options;

    var myModalAction = function () {};


    // Load the myApp module, which contains the directive
    beforeEach(module('ibmwatson-common-ui-components'));

    beforeEach(module('watsonModal/watsonModal.html'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;

      options =  {
        type : 'confirm',
        myModalId : 'myModalId',
        modalTitle : 'Are you sure?',
        okTitle : 'OK',
        cancelTitle : 'Cancel'
      };
    }));

    it('should replace the element with the appropriate content', function () {

      var scope = $rootScope.$new();

      // Compile a piece of HTML containing the directive
      var element = $compile('<watson-modal modal-title="options.modalTitle" action="myModalAction()" modal-Id="options.myModalId" ok-title="options.okTitle" cancel-title="options.cancelTitle"><div><p>Are you sure you want to take this action?</p></div></watson-modal>')(scope);

      scope.$digest();

      // Check that the compiled element contains the templated content
      expect(element.hasClass('modal')).toBe(true);

    });

    it('should reflects changes to the scope', function () {

      var scope = $rootScope.$new();

      scope.options = options;

      // Compile a piece of HTML containing the directive
      var element = $compile('<watson-modal modal-title="options.modalTitle" action="myModalAction()" modal-Id="options.myModalId" ok-title="options.okTitle" cancel-title="options.cancelTitle"><div><p>Are you sure you want to take this action?</p></div></watson-modal>')(scope);

      scope.$digest();

      // Check that the compiled element contains the templated content
      expect(element.html()).toContain(options.modalTitle);
      expect(element.html()).toContain(options.okTitle);
      expect(element.html()).toContain(options.cancelTitle);

    });

    it('should have two buttons', function () {

      var scope = $rootScope.$new();

      scope.options = options;

      scope.myModalAction = myModalAction;

      // Compile a piece of HTML containing the directive
      var element = $compile('<watson-modal modal-title="options.modalTitle" value="{{options.okTitle}}" action="myModalAction" modal-Id="options.myModalId" ok-title="options.okTitle"><div><p>Are you sure you want to take this action?</p></div></watson-modal>')(scope);

      scope.$digest();

      // Check that the compiled element contains the templated content
      var buttons = element.find('button');

      expect(buttons.length).toBe(2);
      expect(buttons[0].getAttribute('aria-label')).toBe('Close');
      expect(buttons[1].value).toBe(options.okTitle);
    });

    it('should have a cancel button', function () {

      var scope = $rootScope.$new();

      scope.options = options;

      scope.myModalAction = myModalAction;

      // Compile a piece of HTML containing the directive
      var element = $compile('<watson-modal modal-title="options.modalTitle" action="myModalAction" modal-Id="options.myModalId" ok-title="options.okTitle" cancel-title="options.cancelTitle"><div><p>Are you sure you want to take this action?</p></div></watson-modal>')(scope);

      scope.$digest();

      // Check that the compiled element contains the templated content
      var buttons = element.find('button');
      expect(buttons[1].value).toBe(options.cancelTitle);
    });

    it('should have transcluded', function () {

      var scope = $rootScope.$new();

      scope.options = options;

      scope.myModalAction = myModalAction;

      // Compile a piece of HTML containing the directive
      var element = $compile('<watson-modal modal-title="options.title" action="myModalAction" modal-Id="options.myModalId" ok-title="options.okTitle" cancel-title="options.cancelTitle"><div><p>Are you sure you want to take this action?</p></div></watson-modal>')(scope);

      scope.$digest();

      var transcludedBit = element.find('p');

      // Check that the compiled element contains the templated content
      expect(transcludedBit.html()).toContain('Are you sure you want to take this action?');
    });

  });
