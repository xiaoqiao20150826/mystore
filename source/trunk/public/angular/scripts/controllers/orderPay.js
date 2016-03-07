angular.module('productController')
  .controller('orderPayCtrl', function($scope, $routeParams, $http, Users) {
    //구매한 아이템을 가져오는 로직. 로그인된 아이디 값으로 분류하는 로직 추가 필요.
    //유저정보를 불러옴. 핸드폰 번호나 주소를 보여주기 위해 사용됨.
    //Users service에 있는 getuser function을 실행. 그 데이터를 userinform에 저장.
    Users.getUserSession()
     .success(function(data){
       $scope.user=data;
       
     }).error(function(){
        alert('error');
    })
});