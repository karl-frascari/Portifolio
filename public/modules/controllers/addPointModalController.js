app.controller('addPointModalController', ['$scope', 'baseRest', '$mdDialog',

    ($scope, baseRest, $mdDialog) => {

        $scope.data = 'none';

        const baseUrl = window.location.host;

        const mapApi = baseRest.dataService('http://' + baseUrl + '/map');

        $scope.findFile = () => {

            let input = angular.element('#fileInput');

            if (input.length) {
                input.click();
            }
        };

        $scope.save = () => {

            let f = document.getElementById('file').files[0],
                r = new FileReader();

            r.onloadend = (e) => {

                let dataToSend = {
                    base64: btoa(e.target.result),
                    position: '[0,0]'
                };

                mapApi.post({
                    url: '/point',
                    data: dataToSend
                }).then(data => {
                    console.log(data);
                }, (data) => {
                    console.log(data);
                });
            }

            r.readAsBinaryString(f);
        }
    }
]);
