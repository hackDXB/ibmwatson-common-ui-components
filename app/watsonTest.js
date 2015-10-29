/*jslint global:true*/
(function (){
    'use strict';

    angular.module('ibmwatson.common.ibmwatson-common-ui-components-test')
        .config(function init ($stateProvider) {
            $stateProvider
                .state('test', {
                    url: '/',
                    templateUrl: 'app/watsonTest.html',
                    controller: 'WatsonTestController'
                });
        })

        .controller('WatsonTestController', ['$scope', function init($scope ) {
            /**
             *
             * DROP DOWN
             */
            $scope.dropDownData = {
                items: [
                    {name: 'cake',
                        icon: 'ibm-icon--relationship'},
                    {name: 'biscuits',
                        icon: 'ibm-icon--satellitedish'},
                    {name: 'cheese'}
                ],
                title:'food',
                myClass:'ibm-btn ibm-btn--primary'
            };

            $scope.myDropDownAction = function(menuItem) {
                console.log('dropDownFunction');
                $scope.dropDownClicked = 'menu item clicked ' + menuItem.name;
            };

            /**
             *
             * SEARCH
             */
            $scope.searchData = {
                placeHolderText: 'Enter search phrase here',
                buttonText: 'Search!!!!',
                buttonIcon: 'ibm-icon--search',
                buttonClass: 'ibm-btn ibm-btn--primary',
            };

            $scope.mySearchAction = function() {
                console.log('searchFunction');
                $scope.searchClicked = 'search text was ' + $scope.searchData.searchText;
            };

            /**
             *
             * FILE UPLOAD
             */
            $scope.upload =  {
                format: 'text'
            };

            /**
             * MODAL
             */
            $scope.modal =  {
                type: 'success',
                myModalId: 'myModalId',
                title: 'Are you sure?',
                okTitle: 'OK',
                cancelTitle: 'Cancel'
            };

            $scope.myModalAction = function () {
                console.log('modalFunction');
                $scope.modalClicked = 'modal ok clicked';
            }
        }])
}());
