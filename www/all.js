'use strict';

var app = angular.module('portifolio', ['ngRoute', 'ui.bootstrap', 'ngMaterial']);

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

app.controller('addPointModalController', ['$scope', 'baseRest', '$mdDialog', 'pointLocation', function ($scope, baseRest, $mdDialog, pointLocation) {

    $scope.data = 'none';

    var baseUrl = window.location.host;

    var mapApi = baseRest.dataService('http://' + baseUrl + '/map');

    console.log(pointLocation);

    $scope.save = function () {

        var f = document.getElementById('file').files[0],
            r = new FileReader();

        r.onloadend = function (e) {

            var dataToSend = {
                base64: btoa(e.target.result),
                position: pointLocation
            };

            mapApi.post({
                url: '/point',
                data: dataToSend,
                cache: false,
                dataType: 'json'
            }).then(function (data) {
                $mdDialog.hide();
            }, function (data) {
                console.log(data);
            });
        };

        r.readAsBinaryString(f);
    };
}]);
'use strict';

app.controller('homeController', ['$scope', function ($scope) {}]);
'use strict';

app.controller('mapController', ['$scope', 'baseRest', '$mdDialog', 'classService', function ($scope, baseRest, $mdDialog, classService) {

    var map = new classService.ol3MapInstace();
    var baseUrl = window.location.host;
    var mapApi = baseRest.dataService('http://' + baseUrl + '/map');

    map.generateDefaulMap();

    mapApi.get({ url: '/points' }).then(function (data) {

        _(data.data).each(function (point) {
            if (point.position) {
                map.addPoint(point.position);
            }
        });
    });

    map.setMapListener('click', function (evt) {

        var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
        popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');

        var openPointConfiguration = function () {

            $mdDialog.show({
                templateUrl: '../partials/add-point-modal.html',
                controller: 'addPointModalController',
                locals: {
                    pointLocation: evt.coordinate
                }
            });
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
'use strict';

app.factory('baseRest', ['$http', function ($http) {

    return {
        dataService: function dataService(baseUrl) {
            return {
                get: function get(params) {
                    return $http.get(baseUrl + params.url, { cache: false });
                },
                post: function post(params) {
                    return $http.post(baseUrl + params.url, params.data, { cache: false });
                },
                put: function put(params) {
                    return $http.put(baseUrl + params.url, { cache: false });
                },
                delete: function _delete(params) {
                    return $http.delete(baseUrl + params.url, { cache: false });
                }
            };
        }
    };
}]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

app.service('classService', [function () {

    var self = this;

    this.ol3MapInstace = function () {
        function Ol3Map() {
            _classCallCheck(this, Ol3Map);

            this.center = [8.516634, 47.400547];
            this.vectorSource = new ol.source.Vector();
        }

        _createClass(Ol3Map, [{
            key: 'generateDefaulMap',
            value: function generateDefaulMap() {
                this.ol3Map = new ol.Map({
                    target: 'map-container',
                    layers: [new ol.layer.Tile({
                        source: new ol.source.BingMaps({
                            key: 'ArYNk6ctSK_yhatijpSWHS6bNQnA1zCQc6ETg1gT49T4qP30C7EhFRl09JejztFl',
                            imagerySet: 'Aerial'
                        })
                    }), new ol.layer.Vector({
                        source: this.vectorSource
                    })],

                    view: new ol.View({
                        center: ol.proj.fromLonLat([8.516634, 47.400547]),
                        zoom: 5,
                        enableRotation: false
                    })
                });
            }
        }, {
            key: 'getMap',
            value: function getMap() {
                return this.ol3Map;
            }
        }, {
            key: 'setMapListener',
            value: function setMapListener(action, fn) {
                this.getMap().on(action, fn);
            }
        }, {
            key: 'getVectorSource',
            value: function getVectorSource() {
                return this.vectorSource;
            }
        }, {
            key: 'addPoint',
            value: function addPoint(coordinates) {

                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(JSON.parse("[" + coordinates + "]") || [-14675.90943075344, 5814106.119483646])
                });

                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        opacity: 1,
                        scale: 0.5,
                        src: 'http://mubs.edu.lb/Images/mapindicator.png'
                    })
                });

                iconFeature.setStyle(iconStyle);

                this.vectorSource.addFeature(iconFeature);
            }
        }]);

        return Ol3Map;
    }();
}]);