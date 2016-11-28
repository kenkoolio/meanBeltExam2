app.controller('bucketsController', ['$scope', 'bucketFactory', 'userFactory', '$location', '$cookies', function($scope, bucketFactory, userFactory, $location, $cookies){

  $scope.userInSession = $cookies.getObject('user');
  if (typeof($scope.userInSession)=='undefined'){
    $location.url('/');
  };

  function getAllUsers(){
    userFactory.index(function(returnedData){
      $scope.allUsers = returnedData;
    });
  };

  getAllUsers();

  function getAllBuckets(userId){
    bucketFactory.show(userId, function(returnedData){
      $scope.bucketListUser = returnedData;
      $scope.bucketList = $scope.bucketListUser.buckets;
    });
  };

  if(typeof($scope.userInSession)!=='undefined'){
    getAllBuckets($scope.userInSession._id);
  }


  $scope.logout = function(){
    $cookies.remove('user');
    $location.url('/');
  };

  $scope.home = function(){
    $location.url('/dashboard');
  };

  $scope.newBucket = {};
  $scope.create = function(){
    $scope.badErrors = [];
    if((typeof($scope.newBucket.title)=='undefined') ||
        (typeof($scope.newBucket.description)=='undefined')){
          $scope.badErrors.push('Title and description must not be blank!');
    } else {
      var newBucketData = {
        user1: $scope.userInSession._id,
        title: $scope.newBucket.title,
        description: $scope.newBucket.description
      };
      if (typeof($scope.newBucket.taggedUser)!=='undefined'){
        newBucketData.user2 = $scope.newBucket.taggedUser;
      };

      bucketFactory.create(newBucketData, function(returnedData){
        if(typeof(returnedData.Error)!=='undefined'){
          $scope.badErrors = [];
          var errors = returnedData.Error.errors;
          for (var key in errors){
            if(errors.hasOwnProperty(key)){
              $scope.badErrors.push(errors[key].message);
            };
          };
        } else if (typeof(returnedData.Success)!=='undefined'){
          location.reload();
        };
      });
    };
  };


  $scope.markDone = function(bucketItemId){
    bucketFactory.update(bucketItemId, function(returnedData){
      if(typeof(returnedData.Success)!=='undefined'){
        console.log(returnedData.Success);
        location.reload();
      };
    });
  };


}]);
