var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: "/partials/loginRegistration.html"
  })
  .when('/dashboard', {
    templateUrl: "/partials/dashboard.html",
    controller: 'bucketsController'
  })
  .when('/show/:id', {
    templateUrl: "/partials/show.html",
    controller: "usersController"
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
