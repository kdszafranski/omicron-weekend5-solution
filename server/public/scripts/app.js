var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/public/views/templates/home.html',
      controller: 'findController'
    })
    .when('/favorites', {
      templateUrl: '/public/views/templates/favorites.html',
      controller: 'favoriteController'
    })
    .otherwise({
      redirectTo: '/home'
    })
}]);
