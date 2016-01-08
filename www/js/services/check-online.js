angular.module(appName)
.factory('CheckOnline', function($rootScope){
          var Interceptor ={
              responseError: function(response){
                  $rootScope.status = response.status;
                  $rootScope.online = false;
                  return response;
              },
              response: function(response){
                  $rootScope.status = response.status;
                  $rootScope.online = true;
                  return response;
              }
          };
          return Interceptor;
  })