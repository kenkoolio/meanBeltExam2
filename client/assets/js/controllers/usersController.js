app.controller('usersController', ['$scope', 'userFactory', 'bucketFactory', '$location', '$cookies', '$routeParams', function($scope, userFactory, bucketFactory, $location, $cookies, $routeParams){

  // //for show a user

  //user in session
  $scope.userInSession = $cookies.getObject('user');
  if (typeof($scope.userInSession)=='undefined'){
    $location.url('/');
  };

  $scope.logout = function(){
    $cookies.remove('user');
    $location.url('/');
  };

  $scope.home = function(){
    $location.url('/dashboard');
  };

  $scope.markDone = function(bucketItemId){
    bucketFactory.update(bucketItemId, function(returnedData){
      if(typeof(returnedData.Success)!=='undefined'){
        console.log(returnedData.Success);
        location.reload();
      };
    });
  };

  //show this one user
  function getUser(userId){
    bucketFactory.show(userId, function(returnedData){
      $scope.user = returnedData;
      $scope.bucketList = $scope.user.buckets;
    });
  };

  var showUserId = $routeParams.id;

  if(typeof(showUserId)!=='undefined'){
    getUser(showUserId);
  }




  // for registration
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
          $location.url('/dashboard');
        };
      });
    } else {
      $scope.baderrors.push("Your passwords do not match!");
    };
  };
}]);
