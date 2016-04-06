app.controller('mapController', ['$scope', 'baseRest', '$mdDialog',

    ($scope, baseRest, $mdDialog) => {

        class Ol3Map {

            constructor() {
                this.center = [8.516634, 47.400547];
                this.vectorSource = new ol.source.Vector();
            };

            generateDefaulMap() {
                this.ol3Map = new ol.Map({
                    target: 'map-container',
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.BingMaps({
                                key: 'ArYNk6ctSK_yhatijpSWHS6bNQnA1zCQc6ETg1gT49T4qP30C7EhFRl09JejztFl',
                                imagerySet: 'Aerial'
                            })
                        }),
                        new ol.layer.Vector({
                            source: this.vectorSource
                        })
                    ],

                    view: new ol.View({
                        center: ol.proj.fromLonLat(map.center),
                        zoom: 5,
                        enableRotation: false,
                    })
                });
            };

            getMap() {
                return this.ol3Map;
            };

            setMapListener(action, fn) {
                this.getMap().on(action, fn);
            };

            getVectorSource() {
                return this.vectorSource;
            };

            addPoint(coordinates) {

                let iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point( 
                                                JSON.parse("[" + coordinates + "]") || [-14675.90943075344, 5814106.119483646]),
                });

                let iconStyle = new ol.style.Style({
                    image: new ol.style.Icon(({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        opacity: 1,
                        scale: 0.5,
                        src: 'http://mubs.edu.lb/Images/mapindicator.png'
                    }))
                });

                iconFeature.setStyle(iconStyle);

                this.vectorSource.addFeature(iconFeature);
            };

        };

        const map = new Ol3Map();
        map.generateDefaulMap();

        const baseUrl = window.location.host;
        const mapApi = baseRest.dataService('http://' + baseUrl + '/map');

        mapApi.get({ url: '/points' }).then(data => {

            _(data.data).each(point => {
                map.addPoint(point.position);
            });
        });

        map.setMapListener('click', evt => {

            let openPointConfiguration = (() => {

                $mdDialog.show({
                    templateUrl: '../partials/add-point-modal.html',
                    controller: 'addPointModalController',
                    locals: {
                        pointLocation: evt.coordinate
                    }
                });

            })();

        });
    }
]);
