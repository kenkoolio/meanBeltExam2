app.controller('loginController', ['$scope', 'userFactory', '$location', '$cookies',  function($scope, userFactory, $location, $cookies){

  $scope.userInSession = $cookies.getObject('user');
  console.log($scope.userInSession);

  if ($location.url() == '/results' && typeof($scope.userInSession)=='undefined'){
    $location.url('/');
  }

  $scope.logout = function(){
    $cookies.remove('user');
    $location.url('/');
  };

  $scope.login = function(){
    $scope.baderrors = [];
    if(typeof($scope.user) == 'undefined'){
      $scope.user = {};
    };
    if(typeof($scope.user.email) == 'undefined'){
      $scope.baderrors.push("Email is required");
    };
    if(typeof($scope.user.password) == 'undefined'){
      $scope.baderrors.push("Password is required");
    };

    if((typeof($scope.user.email)!== 'undefined') && (typeof($scope.user.password)!== 'undefined')){
      var User = {
        email: $scope.user.email,
        password: $scope.user.password
      };

      userFactory.login(User, function(returnedData){
        if(typeof(returnedData.Error) !== 'undefined'){
          var errors = returnedData.Error.errors;
          $scope.baderrors = [];
          for (var key in errors){
            if(errors.hasOwnProperty(key)){
              $scope.baderrors.push(errors[key].message);
            };
          };
        } else if(typeof(returnedData.Success) !== 'undefined'){
          $cookies.putObject('user', returnedData.Success);
          $location.url('/results');
        };
      });
    };
  };
}]);
