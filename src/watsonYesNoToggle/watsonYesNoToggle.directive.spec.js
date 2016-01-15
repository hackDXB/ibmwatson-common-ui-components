'use strict';
describe('Directive: watsonYesNoToggle', function () {
  var $compile,
    $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('ibmwatson-common-ui-components'));

  beforeEach(module('watsonYesNoToggle/watsonYesNoToggle.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

  }));

  it('should replace the element with the appropriate content', function () {
    var scope = $rootScope.$new();
    scope.value = true;
    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-yes-no-toggle value="value"></watson-yes-no-toggle>')(scope);
    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.children('yes').length > 0).toBe(true);

  });

  it('should reflects changes to the scope', function () {
    var scope = $rootScope.$new();

    scope.value = true;

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-yes-no-toggle value="value"></watson-yes-no-toggle>')(scope);
    scope.$digest();

    scope.value = false;

    // Check that the compiled element contains the templated content
    expect(element.children('no').length > 0).toBe(true);

  });

});
