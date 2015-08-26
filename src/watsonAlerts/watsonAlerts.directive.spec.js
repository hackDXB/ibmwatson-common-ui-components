'use strict';

describe('Directive: alertsBar', function() {
  var $compile,
    $rootScope,
    testAlerts;

  // Load the myApp module, which contains the directive
  beforeEach(module('ibmwatson-common-ui-components'));

  beforeEach(module('watsonAlerts/watsonAlerts.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    testAlerts = [{
      id: '123',
      level: 'danger',
      title: 'Danger',
      text: 'Will Robinson!',
      dismissable: false
    }, {
      id: '456',
      level: 'warning',
      title: 'Warning',
      text: 'I\'ll be back',
      dismissable: true
    }, {
      id: '789',
      level: 'info',
      title: 'Just so you know',
      text: 'Something interesting has occured',
      dismissable: true
    }];
  }));

  it('should replace the element with the appropriate content', function() {

    var scope = $rootScope.$new();

    scope.alerts = [];

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-alerts alerts="alerts"></watson-alerts>')(scope);

    scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.hasClass('ibm-alert-bar')).toBe(true);
    
  });

  it('should reflects changes to the scope', function() {

    var scope = $rootScope.$new();

    scope.alerts = testAlerts.slice(0);

    // Compile a piece of HTML containing the directive
    var element = $compile('<watson-alerts alerts="alerts"></watson-alerts>')(scope);

    scope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.html()).toContain(testAlerts[0].text);
    expect(element.html()).toContain(testAlerts[1].text);
    expect(element.html()).toContain(testAlerts[2].text);

    scope.alerts.pop();

    scope.$digest();

    expect(element.html()).toContain(testAlerts[0].text);
    expect(element.html()).toContain(testAlerts[1].text);
    expect(element.html()).not.toContain(testAlerts[2].text);
  });


});