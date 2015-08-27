'use strict';

/**
 * Service to manage a list of alerts to display to the user.
 * Alerts are represented by an object with the following structure:
 * {
 *  id:'1234', // Optional: alert id or code
 *  level: 'info', // Optional: One of success, info, warning, error. Default 'info'
 *  title: 'Hello Stranger!', // Optional: A title for the alert message
 *  text : 'Please log in'  // Required: Text for the alert message
 *  link : 'hththt' // Optional: A link to put at the end of the message
 *  linkText: '' // Optional: Text to put on the link. If link is supplied, defaults to 'Learn more'
 * }
 */
angular.module('ibmwatson-common-ui-components.watsonAlerts')
  .factory('watsonAlerts', ['$log', function init($log) {

    var alerts = [];

    /**
     * Add an alert to the list of alerts
     */
    function add( /*Object*/ alert) {
      $log.debug('add', alert, alerts);

      alert.level = alert.level || 'info';

      // Create a dismiss function to allow the alert to be removed
      alert.dismiss = function() {
        remove.apply(this, [alert]);
      };

      alerts.push(alert);

      return alert;
    }

    /**
     * Remove an alert from the list of alerts
     */
    function remove( /*Object*/ alert) {
      $log.debug(remove, alert);
      var index = alerts.indexOf(alert);
      if (index >= 0) {
        alerts.splice(index, 1);
      }
    }

    /**
     * Remove all current alerts
     */
    function clear() {
      alerts.splice(0, alerts.length);
    }

    // Public API here
    return {
      'alerts': alerts,
      'add': add,
      'remove': remove,
      'clear': clear
    };

  }]);