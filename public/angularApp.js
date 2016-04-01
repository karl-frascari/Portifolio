var app = angular.module('portifolio', ['ngRoute', 'ui.bootstrap']);

console.log(app);

app.config(['$routeProvider' ,

    function($routeProvider) {

        $routeProvider.when('/home', {
            templateUrl: '../views/home.html',
            controller: 'homeController'
        }) ;

        $routeProvider.when('/maps', {
            templateUrl: '../views/maps.html',
            controller: 'mapController'
        });

        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
]);

