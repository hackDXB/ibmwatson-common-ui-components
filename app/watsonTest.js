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

            $scope.dropDownData = {
                items: [
                    {name: 'cake',
                        icon: 'ibm-icon--relationship'},
                    {name: 'biscuits',
                        icon: 'ibm-icon--satellitedish'},
                    {name: 'cheese'}
                ],
                title:'food',
                myClass:'ibm-btn--error'
            };

            $scope.myDropDownAction = function(menuItem) {
                console.log('dropDownFunction');
                $scope.dropDownClicked = 'menu item clicked ' + menuItem.name;
            };

            $scope.searchData = {
                placeHolderText: 'Enter search phrase here',
                buttonText: 'Search!!!!',
                buttonIcon: 'ibm-icon--search',
                buttonClass: 'ibm-btn ibm-btn--primary',
                //textClass: 'form-control'
            };

            $scope.mySearchAction = function() {
                console.log('searchFunction') ;
                $scope.searchClicked = 'search text was ' + $scope.searchData.searchText;
            };


        }]);

}());
