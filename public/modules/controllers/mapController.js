app.controller('mapController', ['$scope', 'baseRest', '$mdDialog', 'classService',

    ($scope, baseRest, $mdDialog, classService) => {

        const map = new classService.ol3MapInstace();
        const baseUrl = window.location.host;
        const mapApi = baseRest.dataService('http://' + baseUrl + '/map');

        map.generateDefaulMap();

        mapApi.get({ url: '/points' }).then(data => {

            _(data.data).each(point => {
                if (point.position) {
                    map.addPoint(point.position);
                }
            });
        });

        map.setMapListener('click', evt => {

            var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
            popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');

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
