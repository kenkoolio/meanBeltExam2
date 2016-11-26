app.controller('usersController', ['$scope', 'userFactory', '$location', '$cookies', function($scope, userFactory, $location, $cookies){
  $scope.newUser = {};

  $scope.create = function(){
    $scope.baderrors = [];
    var User = {
      email: $scope.newUser.email,
      first_name: $scope.newUser.first_name,
      last_name: $scope.newUser.last_name,
      password: $scope.newUser.password,
      birthday: $scope.newUser.birthday
    };

    if($scope.newUser.password === $scope.newUser.password_confirmation){
      userFactory.create(User, function(returnedData){
        if(typeof(returnedData.Error) !== 'undefined'){
          var errors = returnedData.Error.errors;
          $scope.baderrors = [];
          for (var key in errors){
            if (errors.hasOwnProperty(key)){
              $scope.baderrors.push(errors[key].message);
            };
          };

        } else if (typeof(returnedData.Success) !== 'undefined'){
          $cookies.putObject('user', returnedData.Success);
          $location.url('/results');
        };
      });
    } else {
      $scope.baderrors.push("Your passwords do not match!");
    };
  };
}]);
