var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: "/partials/loginRegistration.html"
  })
  .when('/results', {
    templateUrl: "/partials/results.html",
    controller: "loginController"
  })
  .otherwise({
    redirectTo: '/'
  });
});
