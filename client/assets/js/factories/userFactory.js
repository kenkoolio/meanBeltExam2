app.factory('userFactory', ['$http', function($http){


  function UserFactory(){
    this.index = function(callback){
      $http.get('/users').then(function(returnedData){
        if(typeof(callback)=='function'){
          callback(returnedData.data);
        };
      });
    };

    this.login = function(User, callback){
      $http.post('/login', User).then(function(returnedData){
        if(typeof(returnedData.data.error) !== 'undefined'){
          if(typeof(callback) === 'function'){
            callback({'Error': returnedData.data.error});
          };
        } else if (typeof(returnedData.data.user) !== 'undefined'){
          if(typeof(callback) === 'function'){
            callback({'Success': returnedData.data.user});
          };
        };
      });
    };

    this.create = function(User, callback){
      $http.post('/users', User).then(function(returnedData){
        if(typeof(returnedData.data.error) !== 'undefined'){
          if (typeof(callback) == 'function'){
            callback({'Error': returnedData.data.error});
          };
        } else if (typeof(returnedData.data.user) !== 'undefined'){
          if (typeof(callback) == 'function'){
            callback({'Success': returnedData.data.user});
          };
        };
      });
    };
  };
  return new UserFactory();
}]);
