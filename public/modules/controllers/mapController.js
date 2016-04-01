app.controller('mapController', ['$scope', 'baseRest', '$uibModal',

    ($scope, baseRest, $uibModal) => {

        const actual_center = [8.516634, 47.400547];

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
                center: ol.proj.fromLonLat(actual_center),
                zoom: 5,
                enableRotation: false,
            })
        });

        map.on('click', evt => {

            let openPointConfiguration = (() => {

                let modalInstance = $uibModal.open({
                    animation: true,
                    template: '<div class="modal-header"> <h3 class="modal-title">Im a modal!</h3> </div> <div class="modal-body"> <ul> <li ng-repeat="item in items"> <a href="#" ng-click="$event.preventDefault(); selected.item = item">{{ item }}</a> </li> </ul> Selected: <b>{{ selected.item }}</b> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="ok()">OK</button> <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button> </div> ',
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
