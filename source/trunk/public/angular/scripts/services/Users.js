angular.module('productService')
  .factory('Users', function($http) {
    return {
      // 세션에 있는 유저 정보를 가져오는 function
      // 컨트롤러에서 getUserSession 불러오는 명령을 실행하면
      //이 곳에서 $http의 /getUserSession을 통한 get method를 리턴해준다.
      getUserSession : function() {
        return $http.get('/user');
      },

      modifyadr: function(address){
        return $http.put('/user', address);
      },

      modifyphone: function(phone){
        return $http.put('/user', phone);
      },

   
    }
});