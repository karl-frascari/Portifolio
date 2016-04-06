app.controller('addPointModalController', ['$scope', 'baseRest', '$mdDialog', 'pointLocation',

    ($scope, baseRest, $mdDialog, pointLocation) => {

        $scope.data = 'none';

        const baseUrl = window.location.host;

        const mapApi = baseRest.dataService('http://' + baseUrl + '/map');

        console.log(pointLocation);

        $scope.save = () => {

            let f = document.getElementById('file').files[0],
                r = new FileReader();

            r.onloadend = (e) => {

                let dataToSend = {
                    base64: btoa(e.target.result),
                    position: pointLocation
                };

                mapApi.post({
                    url: '/point',
                    data: dataToSend,
                    cache: false,
                    dataType: 'json',
                }).then(data => {
                     $mdDialog.hide();
                }, (data) => {
                    console.log(data);
                });
            }

            r.readAsBinaryString(f);
        }
    }
]);
