app.controller('mapController', ['$scope', 'baseRest', '$uibModal',

    ($scope, baseRest, $uibModal) => {

        const center = [8.516634, 47.400547];

        const baseUrl = window.location.host;

        const mapApi = baseRest.dataService('http://' + baseUrl + '/map');

        mapApi.get({ url: '/points' }).then(data => {
            console.log(data);
        });

        let map = new ol.Map({
            target: 'map-container',
            layers: [

                new ol.layer.Tile({
                    visible: true,
                    opacity: 1.0,
                    source: new ol.source.BingMaps({
                        key: 'ArYNk6ctSK_yhatijpSWHS6bNQnA1zCQc6ETg1gT49T4qP30C7EhFRl09JejztFl',
                        imagerySet: 'Aerial',
                        maxZoom: 19
                    })
                })
            ],

            view: new ol.View({
                center: ol.proj.fromLonLat(center),
                zoom: 5,
                enableRotation: false,
            })
        });

        map.on('click', evt => {

            let openPointConfiguration = (() => {

                let modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '../partials/add-point-modal.html',
                    controller: 'addPointModalController'
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, () => {

                });

                return modalInstance.result;
            })();

        });
    }
]);
