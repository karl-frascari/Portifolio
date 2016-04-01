'use strict';

var app = angular.module('portifolio', ['ngRoute', 'ui.bootstrap']);

console.log(app);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/home', {
        templateUrl: '../views/home.html',
        controller: 'homeController'
    });

    $routeProvider.when('/maps', {
        templateUrl: '../views/maps.html',
        controller: 'mapController'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
'use strict';

app.controller('homeController', ['$scope', function ($scope) {}]);
'use strict';

app.controller('mapController', ['$scope', 'baseRest', '$uibModal', function ($scope, baseRest, $uibModal) {

    var actual_center = [8.516634, 47.400547];

    var baseUrl = window.location.host;

    var mapApi = baseRest.dataService('http://' + baseUrl + '/map');

    mapApi.get({ url: '/points' }).then(function (data) {
        console.log(data);
    });

    var map = new ol.Map({
        target: 'map-container',
        layers: [new ol.layer.Tile({
            visible: true,
            opacity: 1.0,
            source: new ol.source.BingMaps({
                key: 'ArYNk6ctSK_yhatijpSWHS6bNQnA1zCQc6ETg1gT49T4qP30C7EhFRl09JejztFl',
                imagerySet: 'Aerial',
                maxZoom: 19
            })
        })],

        view: new ol.View({
            center: ol.proj.fromLonLat(actual_center),
            zoom: 5,
            enableRotation: false
        })
    });

    map.on('click', function (evt) {

        var openPointConfiguration = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                template: '<div class="modal-header"> <h3 class="modal-title">Im a modal!</h3> </div> <div class="modal-body"> <ul> <li ng-repeat="item in items"> <a href="#" ng-click="$event.preventDefault(); selected.item = item">{{ item }}</a> </li> </ul> Selected: <b>{{ selected.item }}</b> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="ok()">OK</button> <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button> </div> '
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {});

            return modalInstance.result;
        }();
    });
}]);
'use strict';

app.directive('home', ['$location', function ($location) {

    function linkFunction($scope, element, attrs) {

        var arrayColors = ['#ffe74c', '#ff5964', '#6bf178', '#35a7ff'];

        $scope.go = function (path) {
            $location.path(path);
        };

        _(element.children().find('div')).each(function (div) {

            $(div).css("background-color", function () {

                function getUniqueColor() {

                    var color = angular.copy(arrayColors[Math.floor(Math.random() * arrayColors.length)]);

                    arrayColors.splice(_.indexOf(arrayColors, color), 1);

                    return color;
                };

                return getUniqueColor();
            });
        });
    };

    return {
        restrict: 'AE',
        templateUrl: '../partials/home.html',
        link: linkFunction
    };
}]);
"use strict";
'use strict';

app.factory('baseRest', ['$http', function ($http) {

    return {
        dataService: function dataService(baseUrl) {
            return {
                get: function get(params) {
                    return $http.get(baseUrl + params.url, { cache: false });
                },
                post: function post(params) {
                    return $http.post(baseUrl + params.url, { cache: false });
                },
                put: function put(params) {
                    return $http.put(baseUrl + params.url, { cache: false });
                },
                'delete': function _delete(params) {
                    return $http.delete(baseUrl + params.url, { cache: false });
                }
            };
        }
    };
}]);