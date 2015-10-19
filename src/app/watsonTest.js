/*jslint global:true*/
(function (){
    'use strict';

    angular.module('ibmwatson.common.ibmwatson-common-ui-components-test')
        .config(function init ($stateProvider) {
            $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'app/watsonTest.html',
                    controller: 'WatsonTestController'
                });
        })

        .controller('WatsonTestController', ['$scope', function init($scope ) {

            $scope.dropDownData = [
                {name: 'cake',
                    icon: 'ibm-icon--relationship'},
                {name: 'biscuits',
                    icon: 'ibm-icon--satellitedish'},
                {name: 'cheese'}
            ];

            $scope.title = 'food';

            $scope.myClass = 'myClass';

            $scope.myAction = function(menuItem) {
                console.log('dropDownFunction');
                $scope.dropDownClicked = 'menu item clicked ' + menuItem.name;
            };
        }]);

}());
