app.factory('bucketFactory', ['$http', function($http){

  function BucketFactory(){
    var userInSessionsBucketList = [];

    this.update = function(bucketId, callback){
      $http.put('/buckets/'+bucketId).then(function(returnedData){
        if(typeof(returnedData.data.Error)!=='undefined'){
          console.log(returnedData.data.Error);
        } else if (typeof(returnedData.data.Success)!=='undefined'){
          if(typeof(callback)=='function'){
              callback({"Success": returnedData.data.Success});
          };
        };
    });
  };

    this.show = function(userId, callback){
      $http.get('/buckets/'+userId).then(function(returnedData){
        if(typeof(callback)=='function'){
          userInSessionsBucketList = returnedData.data;
          callback(userInSessionsBucketList);
        };
      });
    };


    this.create = function(newBucketData, callback){
      // $http.post('/buckets', newBucketData)
      $http({
        method: "post",
        url: "/buckets",
        data: newBucketData,
        headers: {'Content-Type': 'application/json'}
      }).then(function(returnedData){
        if(typeof(returnedData.data.Error)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Error': returnedData.data.Error});
          };
        } else if (typeof(returnedData.data.Success)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Success': returnedData.data.Success});
          };
        };
      },
        //on reject
        function(e) {
          console.log("Rejected with: ", e);
        }
      );
    };
  };

  return new BucketFactory();
}]);
