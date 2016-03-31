app.directive('home', ['$location', function($location) {

    function linkFunction($scope, element, attrs) {

        var arrayColors = ['#ffe74c', '#ff5964', '#6bf178', '#35a7ff'];

        $scope.go = function(path) {
            $location.path(path);
        };

        _(element.children().find('div')).each(function(div) {

            $(div).css("background-color", function() {

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
