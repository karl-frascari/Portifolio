app.controller('mapController', ['$scope',
    function($scope) {
        
        var actual_center = [8.516634, 47.400547];

        var map = new ol.Map({
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

    }
]);
