'use strict';

/*jslint global :true*/
(function () {

  angular.module('ibmwatson.common.ibmwatson-common-ui-components-test')
    .config(function init ($stateProvider) {
      $stateProvider
        .state('test', {
          url : '/',
          templateUrl : 'app/watsonTest.html',
          controller : 'WatsonTestController'
        });
    })

    .controller('WatsonTestController', ['$scope', 'watsonAlerts', function init ($scope, watsonAlerts) {
      /**
       *
       * DROP DOWN
       */
      $scope.dropDownData = {
        items : [
          {
            name : 'cake',
            icon : 'ibm-icon--relationship'
          },
          {
            name : 'biscuits',
            icon : 'ibm-icon--satellitedish'
          },
          {name : 'cheese'}
        ],
        title : 'food',
        myClass : 'ibm-btn ibm-btn--primary'
      };

      $scope.myDropDownAction = function (menuItem) {
        $scope.dropDownClicked = 'menu item clicked ' + menuItem.name;
      };

      /**
       *
       * SEARCH
       */
      $scope.searchData = {
        placeHolderText : 'Enter search phrase here',
        buttonText : 'Search!!!!',
        buttonIcon : 'ibm-icon--search',
        buttonClass : 'ibm-btn ibm-btn--primary'
      };

      $scope.mySearchAction = function () {
        $scope.searchClicked = 'search text was ' + $scope.searchData.searchText;
      };

      /**
       *
       * FILE UPLOAD
       */
      $scope.upload = {
        format : 'text'
      };

      /**
       * MODAL
       */
      $scope.modalRegular = {
        type : 'success',
        myModalId : 'modalRegular',
        title : 'Are you sure?',
        okTitle : 'OK',
        cancelTitle : 'Cancel',
        disable : false,
        hide: false
      };

      $scope.modalDisable = {
        type : 'success',
        myModalId : 'modalDisable',
        title : 'Are you sure?',
        okTitle : 'OK',
        cancelTitle : 'Cancel',
        disable : true,
        hide: false
      };

      $scope.modalHide = {
        type : 'success',
        myModalId : 'modalHide',
        title : 'Are you sure?',
        okTitle : 'OK',
        cancelTitle : 'Cancel',
        disable : true,
        hide: true
      };

      $scope.myModalAction = function () {
        $scope.modalClicked = 'modal ok clicked';
      };

      /**
       * LOADING
       */
      $scope.loadingMessage = 'I\'m loading, have some cake while you wait';

      /**
       * ALERTS
       */
      watsonAlerts.add({
        level : 'info',
        dismissable : 'true',
        title : 'There are plenty of cakes available',
        text : 'There is currently lots of cake, no action is required at this time'
      });

      watsonAlerts.add({
        level : 'warning',
        dismissable : 'true',
        title : 'Cake is running low',
        text : 'There are only 2 cakes left'
      });

      $scope.alerts = [{
        level : 'error',
        dismissable : 'true',
        title : 'No Cake Available',
        text : 'All cake has been eaten, please restock'
      }];

      /**
       * YES NO TOGGLE
       */
        // Yes is true, No is false
      $scope.toggleValue = true;

    }])
}());
